/**
 * 
 */
package org.jwebtop.plugin;

import javax.servlet.http.HttpSession;

import org.jwebtop.core.Constants;
import org.jwebtop.core.model.User;
import org.jwebtop.core.service.UserService;

import org.zengsource.mvc.MvcContext;
import org.zengsource.mvc.plugin.Plugable;
import org.zengsource.mvc.plugin.PluginException;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class UserPlugin implements Plugable {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	private static final long serialVersionUID = 1L;

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	private UserService userService;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.zeng.mvc.plugin.Plugable#disable()
	 */
	public void disable() throws PluginException {
		// TODO Auto-generated method stub

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.zeng.mvc.plugin.Plugable#enable()
	 */
	public boolean enable() throws PluginException {
		//String url = MVCContext.getInstance().getActionHierachy();
		//String urlSuffix = MVCContext.getInstance().getURLSuffix(InletServlet.PARAM_URL_PAGE);
		// if (url.contains("admin/") && !url.equals("admin/index." +
		// urlSuffix)) {
		HttpSession session = MvcContext.getInstance().getRequest().getSession(true);
		User login = (User) session.getAttribute(Constants.SESSTION_LOGIN);
		if (login == null) {
			login = this.userService.getGuest();
			session.setAttribute(Constants.SESSTION_LOGIN, login);
		}
		//String username = login.getUsername(); 
		//String password = login.getPassword(); 
		// if (!"admin".equals(username) || !"weizeng".equals(password)) {
		// DispatchView view = new DispatchView("/admin/index." + urlSuffix);
		// MVCContext.getInstance().getRequest().setAttribute("_VIEW_", view);
		// RequestDispatcher dispatcher =
		// MVCContext.getInstance().getRequest()
		// .getRequestDispatcher("/admin/index.htm");
		// try {
		// dispatcher.forward(MVCContext.getInstance().getRequest(),
		// MVCContext.getInstance()
		// .getResponse());
		// } catch (ServletException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// } catch (IOException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		// }
		// }

		// Check identification, null for no login

		// find acl_page_identity

		// get acl_entry with acl_page_identity and acl_sid

		// if matches, pass

		// else

		// if page , redirect

		// if not anonymous but not login, redirect to login

		// if not anonymous but not allowed, redirect to error

		// else if not page, AJAX
		return true;
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
