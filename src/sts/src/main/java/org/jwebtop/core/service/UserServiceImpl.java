/**
 * 
 */
package org.jwebtop.core.service;

import org.zengsource.util.StringUtil;

import org.apache.log4j.Logger;
import org.jwebtop.core.dao.UserDao;
import org.jwebtop.core.model.Profile;
import org.jwebtop.core.model.User;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class UserServiceImpl implements UserService {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private UserDao userDao;

	//private CacheService cacheService;
	private ProfileService profileService;

	private Logger logger = Logger.getLogger(this.getClass());

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public UserServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public User findById(String id) {
		if (StringUtil.isBlank(id)) {
			return null;
		}
		// 从缓存查找
		User user = null;//(User) this.cacheService.get(id);
		// 从数据库
		if (user == null) {
			user = this.userDao.queryById(id);
		}
		//if (user != null) {
		//	this.cacheService.cache(id, user); // 缓存
		//}

		return user;
	}

	public User getGuest() {
		User guest = this.findById(User.GUEST);
		// 还没有创建 GUEST
		if (guest == null) {
			guest = createGuest(); // 新建Guest
			this.userDao.save(guest); // 保存到数据库
			this.profileService.save(guest.getProfile());
			//this.cacheService.cache(User.GUEST, guest); // 缓存
			logger.info("创建 Guest 用户");
		}
		return guest;
	}

	private User createGuest() {
		User guest = new User(User.GUEST);
		guest.setId(User.GUEST);
		guest.setPassword("jwebtop");
		guest.setEmail("guest@jwebtop.org");
		Profile profile = new Profile(guest);
		guest.setProfile(profile);
		return guest;
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	// public CacheService getCacheService() {
	// return cacheService;
	// }
	//
	// public void setCacheService(CacheService cacheService) {
	// this.cacheService = cacheService;
	// }

	public ProfileService getProfileService() {
		return profileService;
	}

	public void setProfileService(ProfileService profileService) {
		this.profileService = profileService;
	}

}
