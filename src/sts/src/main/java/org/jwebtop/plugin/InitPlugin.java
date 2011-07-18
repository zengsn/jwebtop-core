/**
 * 
 */
package org.jwebtop.plugin;

import org.jwebtop.core.service.WebwareService;

import org.zengsource.mvc.plugin.Plugable;
import org.zengsource.mvc.plugin.PluginException;
import org.zengsource.mvc.plugin.PluginTemplate;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class InitPlugin extends PluginTemplate implements Plugable {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private static final long serialVersionUID = 1L;

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private WebwareService webwareService;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public InitPlugin() {
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public void disable() throws PluginException {
		// TODO Auto-generated method stub

	}

	public boolean enable() throws PluginException {
		if (!this.webwareService.isInitialized()) {
			this.webwareService.initialize();
		}
		return true;
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public WebwareService getWebwareService() {
		return webwareService;
	}

	public void setWebwareService(WebwareService webwareService) {
		this.webwareService = webwareService;
	}

}
