/**
 * 
 */
package org.jwebtop.core.service;

import java.io.File;
import java.io.FileFilter;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.jwebtop.core.dao.WebwareDao;
import org.jwebtop.core.model.User;
import org.jwebtop.core.model.Webware;
import org.springframework.security.acls.domain.BasePermission;
import org.springframework.security.acls.domain.GrantedAuthoritySid;
import org.springframework.security.acls.domain.ObjectIdentityImpl;
import org.springframework.security.acls.model.MutableAcl;
import org.springframework.security.acls.model.MutableAclService;
import org.springframework.security.acls.model.NotFoundException;
import org.springframework.security.acls.model.ObjectIdentity;
import org.springframework.security.acls.model.Permission;
import org.zengsource.util.NumberUtil;
import org.zengsource.util.StringUtil;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class WebwareServiceImpl implements WebwareService {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private static final String CACHE_WEBWARES_PREFIX = "_WebwareCache_";
	private static final String CACHE_ALL_WEBWARES = CACHE_WEBWARES_PREFIX + "All";

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private WebwareDao webwareDao;
	private UserService userService;
	private CacheService cacheService;
	private ProfileService profileService;
	private ConfigurationService configurationService;

	/** ACL service by Spring Security */
	private MutableAclService mutableAclService;

	private Logger logger = Logger.getLogger(getClass());

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public WebwareServiceImpl() {
		// initialize();
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public Webware getById(String id) {
		if (StringUtil.isBlank(id)) {
			return null;
		}
		return this.webwareDao.queryById(id);
	};

	public Webware getByName(String name) {
		if (StringUtil.isBlank(name)) {
			return null;
		}
		return this.webwareDao.queryByName(name);
	}

	public boolean isInitialized() {
		Object webwaresCache = this.cacheService.get(CACHE_ALL_WEBWARES);
		return webwaresCache != null;
	}

	/**
	 * 扫描文件夹，看是否有新的网件出现。
	 */
	public void initialize() {
		initialize(null);
	}

	/**
	 * 只初始化其中一个网件。
	 * 
	 * @param id
	 *            如果为null则初始化所有网件
	 */
	private boolean initialize(String id) {
		String webwaresPath = this.configurationService.getWebwaresPath();
		File webwaresFolder = new File(webwaresPath);
		File[] webwareFolders = webwaresFolder.listFiles(new FileFilter() {
			public boolean accept(File fileOrDir) {
				return fileOrDir.isDirectory(); // only directory
			}
		});
		List<Webware> allWebwares = new ArrayList<Webware>();
		if (webwareFolders != null) {
			for (File webwareFolder : webwareFolders) {
				// 强制重新加载此网件
				if (id != null && id.equals(webwareFolder.getName())) {
					// 后面处理
				} else {// 检查是否已保存
					Webware webware = this.getByName(webwareFolder.getName());
					if (webware != null) { // 已存在，又非强制重新加载的，不处理
						// 加到列表中
						allWebwares.add(webware);
						continue; // 不从文件系统加载。
					}
				}
				// 新增的网件从配置文件加载。
				File[] xmlFiles = webwareFolder.listFiles(new FileFilter() {
					public boolean accept(File file) {
						return file.isFile() && file.getName().endsWith(".xml");
					}
				});
				for (File xmlFile : xmlFiles) {
					if ("webware.xml".equals(xmlFile.getName())) { // webware
						// configuration
						Webware webware = loadFromXml(xmlFile);
						if (webware != null) {
							this.webwareDao.save(webware);
							// 加到列表中
							allWebwares.add(webware);
							// 创建 ACL 规则
							createAcl(webware);
						}
						break;
					}
					logger.warn("网件【" + webwareFolder.getName() + "】的配置文件不存在！");
					return false;
				}
			}
		}
		// 缓存
		this.cacheService.cache(CACHE_ALL_WEBWARES, allWebwares);

		return true;
	}

	/** 创建 ACL：如果已存在，则修改。 */
	synchronized private void createAcl(Webware webware) {
		if (webware.getAclMap() == null || webware.getAclMap().isEmpty()) {
			return; // 没有设置 ACL 规则
		}
		ObjectIdentity oid = new ObjectIdentityImpl(Webware.class, webware.getId());
		// 先查询
		MutableAcl acl = null;
		try {
			acl = (MutableAcl) this.mutableAclService.readAclById(oid);
		} catch (NotFoundException e) { // 再创建
			acl = this.mutableAclService.createAcl(oid);
		}
		int aclIndex = 0;
		for (String key : webware.getAclMap().keySet()) {
			String value = webware.getAclMap().get(key);
			if (StringUtil.isBlank(value)) {
				continue; // 忽略空设置
			}
			if ("read".equals(key)) {
				if ("*".equals(value)) {
					value = "ROLE_USER,ROLE_GUEST,ROLE_ADMIN,guest";
				}
				aclIndex = insertAce(acl, BasePermission.READ, value, aclIndex);
			} else if ("write".equals(key)) {
				aclIndex = insertAce(acl, BasePermission.WRITE, value, aclIndex);
			} else if ("create".equals(key)) {
				aclIndex = insertAce(acl, BasePermission.CREATE, value, aclIndex);
			} else if ("delete".equals(key)) {
				aclIndex = insertAce(acl, BasePermission.DELETE, value, aclIndex);
			} else if ("admin".equals(key)) {
				aclIndex = insertAce(acl, BasePermission.ADMINISTRATION, value, aclIndex);
			} else {
				logger.warn("权限 " + key + " 不支持！");
			}
		}
		this.mutableAclService.updateAcl(acl);
	}

	private int insertAce(MutableAcl acl, Permission pm, String roleStr, int index) {
		String[] roles = roleStr.split(",");
		for (String role : roles) {
			if (StringUtil.notBlank(role)) {
				acl.insertAce(index, pm, new GrantedAuthoritySid(role), true);
				index++;
			}
		}
		return index;
	}

	public Webware loadFromXml(File xmlFile) {
		SAXReader saxReader = new SAXReader();
		try {
			Document doc = saxReader.read(xmlFile);
			Webware webware = new Webware();
			Element root = doc.getRootElement();
			List<?> elements1 = root.elements();
			String setId = null;
			for (Object obj1 : elements1) {
				Element element1 = (Element) obj1;
				String element1Name = element1.getName();
				if ("status".equals(element1Name)) {
					int status = NumberUtil.string2Integer(element1.getText(), 0);
					webware.setStatus(status);
				} else if ("styles".equals(element1Name)) {
					List<?> styles = element1.elements();
					for (Object obj2 : styles) {
						Element elementStyle = (Element) obj2;
						webware.addStyle(elementStyle.getText() + "");
					}
				} else if ("jsSources".equals(element1Name)) {
					List<?> jsSources = element1.elements();
					for (Object obj2 : jsSources) {
						Element elementJsSource = (Element) obj2;
						webware.addJsSource(elementJsSource.getText() + "");
					}
				} else if ("acl".equals(element1Name)) {
					List<?> acls = element1.elements();
					for (Object obj2 : acls) {
						Element elementAcl = (Element) obj2;
						webware.addAcl(elementAcl.getName() + "", elementAcl.getText() + "");
					}
				} else if ("id".equals(element1Name)) {
					// ID 自动生成，忽略，如果为，为旧的配置文件
					setId = element1.getText();
				} else if (element1.isTextOnly()) { // simple set
					try {
						BeanUtils.setProperty(webware, element1Name, element1.getText());
					} catch (IllegalAccessException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} else { // nesting

				}
				// backward compatible
				if (StringUtil.notBlank(setId) && webware.getTitle() == null) {
					webware.setTitle(webware.getName());
					webware.setName(setId);
				}

			}
			return webware;
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<Webware> loadAll(User user) {
		// TODO 未加入权限
		if (user == null) {
			return (List<Webware>) this.cacheService.get(CACHE_ALL_WEBWARES);
			// return (List<Webware>) loadInstalled(null);
		}
		return null;
	}

	public List<?> loadInstalled(User user) {
		if (user == null) {
			user = this.userService.findById(User.GUEST);
		}
		// String cacheId = user.getUsername() + CACHE_WEBWARES_SUFFIX;
		// 先查缓存
		List<?> installed = null;// (List<?>) this.cacheService.get(cacheId);

		if (installed == null) {
			// 从数据库查 - 不从数据库查
			installed = this.webwareDao.queryByProfile(user.getProfile());
			// 直接查缓存中的所的网件
			// List<?> allWebwares = (List<?>)
			// this.cacheService.get(CACHE_ALL_WEBWARES);
			// for(Object obj : allWebwares) {
			// TODO 检查权限
			// }
			if (installed != null) {
				// this.cacheService.cache(cacheId, installed);
			}
		}
		return installed;
	}

	public int searchCount(String q) {
		return this.webwareDao.queryCount(q);
	}

	public List<?> search(String q, int start, int limit) {
		return this.webwareDao.query(q, start, limit);
	}

	public boolean reload(String id) {
		return initialize(id);
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public WebwareDao getWebwareDao() {
		return webwareDao;
	}

	public void setWebwareDao(WebwareDao webwareDao) {
		this.webwareDao = webwareDao;
	}

	public CacheService getCacheService() {
		return cacheService;
	}

	public void setCacheService(CacheService cacheService) {
		this.cacheService = cacheService;
	}

	public ConfigurationService getConfigurationService() {
		return configurationService;
	}

	public void setConfigurationService(ConfigurationService configurationService) {
		this.configurationService = configurationService;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public ProfileService getProfileService() {
		return profileService;
	}

	public void setProfileService(ProfileService profileService) {
		this.profileService = profileService;
	}

	public MutableAclService getMutableAclService() {
		return mutableAclService;
	}

	public void setMutableAclService(MutableAclService mutableAclService) {
		this.mutableAclService = mutableAclService;
	}

}
