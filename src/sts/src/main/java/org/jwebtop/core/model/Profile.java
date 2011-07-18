/**
 * 
 */
package org.jwebtop.core.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

/**
 * WebTop Profile of User.
 * 
 * @author Zeng Shao-Ning
 * @since 6.0
 */
public class Profile implements Serializable {

	private static final long serialVersionUID = 1L;

	// ~~~ STATIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ PROPERTIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	private String id;
	private User user;
	private Date updatedTime;
	
	private Set<Webware> webwares;

	// ~~~ CONSTRUCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public Profile() {
		// TODO Auto-generated constructor stub
	}

	public Profile(User user) {
		super();
		this.id = user.getId();
		this.user = user;
	}

	// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// ~~~ G^SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	public String getId() {
		return id;
	}

	public void setId(String uid) {
		this.id = uid;
	}

	public Set<Webware> getWebwares() {
		return webwares;
	}

	public void setWebwares(Set<Webware> webwares) {
		this.webwares = webwares;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}

}
