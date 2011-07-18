/**
 * 
 */
package org.jwebtop.core.service;

import org.jwebtop.core.model.Configuration;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public interface ConfigurationService {
	
	// Convenient Keys ///////////////////////////////////////////
	
	public static final String JW_ROOT = "jwebtop.root";
	public static final String JW_WEBWARES = "jwebtop.webwares";
	public static final String EXT_URL = "ext.url";
	public static final String EXT_PATH = "ext.path";

	// Conveniencies /////////////////////////////////////////////
	
	public String getRootPath();
	public String getWebwaresPath();
	
	// Configuration /////////////////////////////////////////////
	
	public Configuration getConfiguration(String key);
	
	public String getString(String key);
	

}
