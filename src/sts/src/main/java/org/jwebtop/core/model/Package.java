/**
 * 
 */
package org.jwebtop.core.model;

import java.io.Serializable;
import java.util.Set;

/**
 * Webware Package.
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class Package implements Serializable {

	private static final long serialVersionUID = 1L;

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	private String id;
	private String name;
	private String version;
	private String author;
	
	private Set<Webware> webwares;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	
	public Package() {
		// TODO Auto-generated constructor stub
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
	
	public String getAuthor() {
		return author;
	}
	
	public void setAuthor(String author) {
		this.author = author;
	}

	public Set<Webware> getWebwares() {
		return webwares;
	}

	public void setWebwares(Set<Webware> webwares) {
		this.webwares = webwares;
	}

}
