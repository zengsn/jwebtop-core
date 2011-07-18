package org.jwebtop.core.model;

public class EmailUserSetting {
	private Integer id;
	private String name;
	private String emailAddress;
	private String popService;
	private String stmpService;
	private User user;
	private boolean active;
	private String password;
	private String decription;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getPopService() {
		return popService;
	}

	public void setPopService(String popService) {
		this.popService = popService;
	}

	public String getStmpService() {
		return stmpService;
	}

	public void setStmpService(String stmpService) {
		this.stmpService = stmpService;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDecription() {
		return decription;
	}

	public void setDecription(String decription) {
		this.decription = decription;
	}

}
