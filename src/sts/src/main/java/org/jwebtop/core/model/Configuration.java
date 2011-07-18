/**
 * 
 */
package org.jwebtop.core.model;

/**
 * 配置项。
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class Configuration {

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	private String key;
	private String name;
	private String value;
	private String description;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	public Configuration() {
		// TODO Auto-generated constructor stub
	}

	public Configuration(String key, String value) {
		this(key, value, "defaults.properties");
	}

	public Configuration(String key, String value, String description) {
		super();
		this.key = key;
		this.value = value;
		this.description = description;
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
