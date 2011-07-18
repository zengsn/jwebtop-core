/**
 * 
 */
package org.jwebtop.core.web;

import java.util.List;

import org.jwebtop.core.Constants;
import org.jwebtop.core.model.User;
import org.jwebtop.core.model.Webware;
import org.jwebtop.core.service.ConfigurationService;
import org.jwebtop.core.service.UserService;
import org.jwebtop.core.service.WebwareService;

import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;
import org.zengsource.mvc.view.AbstractView;

/**
 * Index Page.
 * 
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class IndexAction extends MultipleAction {

	private static final long serialVersionUID = 1L;

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public static final String USER_SESSION = "login";

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private ConfigurationService configurationService;
	private WebwareService webwareService;
	private UserService userService;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public IndexAction() {
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	@Override
	protected AbstractView doService() throws MvcException {
		logger.info("Visited from " + getRequest().getRemoteAddr());
		User user = (User) getRequest().getSession(true).getAttribute(Constants.SESSTION_LOGIN);
		// TODO
		if (user == null) {
			user = this.userService.getGuest();
			logger.info("用户没有登录，作为 Guest 登录。");
		}
		//Profile profile = user.getProfile();
		//getRequest().setAttribute("webwares", profile.getWebwares()); // 设置用户网件
		List<Webware> webwares = this.webwareService.loadAll(null);
		getRequest().setAttribute("webwares", webwares);
		logger.info("Load webwares: " + webwares);
		// loadWebwares();
		return super.doService();
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public ConfigurationService getConfigurationService() {
		return configurationService;
	}

	public void setConfigurationService(ConfigurationService configurationService) {
		this.configurationService = configurationService;
	}

	public WebwareService getWebwareService() {
		return webwareService;
	}

	public void setWebwareService(WebwareService webwareService) {
		this.webwareService = webwareService;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
