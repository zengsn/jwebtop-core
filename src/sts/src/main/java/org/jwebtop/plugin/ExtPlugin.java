/**
 * 
 */
package org.jwebtop.plugin;

import org.jwebtop.core.service.ConfigurationService;

import org.zengsource.mvc.plugin.ext.AbstractExtPlugin;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class ExtPlugin extends AbstractExtPlugin {

	private static final long serialVersionUID = 1L;

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	private ConfigurationService configurationService;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	public ExtPlugin() {
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	@Override
	public String getExtPath() {
		//return this.configurationService.getString(ConfigurationService.EXT_PATH);
		return getContext().getRootPath() + "/3rdp/ext";
	}

	@Override
	public String getExtUrl() {
		return this.configurationService.getString(ConfigurationService.EXT_URL);
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public ConfigurationService getConfigurationService() {
		return configurationService;
	}

	public void setConfigurationService(ConfigurationService configurationService) {
		this.configurationService = configurationService;
	}

}
