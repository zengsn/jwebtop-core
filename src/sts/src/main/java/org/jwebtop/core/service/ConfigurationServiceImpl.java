/**
 * 
 */
package org.jwebtop.core.service;

import java.io.IOException;
import java.util.Properties;

import org.zengsource.mvc.MvcContext;
import org.zengsource.util.ClassLoaderUtil;
import org.zengsource.util.PropertiesUtil;
import org.zengsource.util.StringUtil;

import org.jwebtop.core.model.Configuration;

/**
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class ConfigurationServiceImpl implements ConfigurationService {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private Properties defaultProperties;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public ConfigurationServiceImpl() {
		loadDefault();
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private void loadDefault() {
		if (this.defaultProperties == null) {
			this.defaultProperties = new Properties();
		}
		try {
			this.defaultProperties
					.load(ClassLoaderUtil.getResourceAsStream("defaults.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Configuration getConfiguration(String key) {
		// TODO Check cache
		Configuration configuration = null;
		
		// load defaults
		if (configuration == null) {
			//String value = getDefaultProperties().getProperty(key);
			String value = PropertiesUtil.getValue(getDefaultProperties(), key);
			if (StringUtil.notBlank(value)) {
				configuration = new Configuration(key, value);
				// TODO save to db
				// TODO add to cache
			}
		}
		return configuration;
	}
	
	public String getString(String key) {
		Configuration cfg = getConfiguration(key);
		return cfg == null? null : cfg.getValue();
	}
	
	public String getRootPath() {
		//return getString(JW_ROOT);
		return MvcContext.getInstance().getRootPath();
	}
	
	public String getWebwaresPath() {
		//return getString(JW_WEBWARES);
		return getRootPath() + "/webwares";
	}

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public Properties getDefaultProperties() {
		return defaultProperties;
	}

	public void setDefaultProperties(Properties defaultProperties) {
		this.defaultProperties = defaultProperties;
	}

}
