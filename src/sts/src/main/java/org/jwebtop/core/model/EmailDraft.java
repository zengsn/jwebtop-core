package org.jwebtop.core.model;

import java.io.Serializable;
import java.util.Date;

public class EmailDraft implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String sentEmail;
	private String title;
	private String content;
	private Date time;
	private EmailUserSetting emailUserSetting;
	private User user;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getSentEmail() {
		return sentEmail;
	}
	public void setSentEmail(String sentEmail) {
		this.sentEmail = sentEmail;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public EmailUserSetting getEmailUserSetting() {
		return emailUserSetting;
	}
	public void setEmailUserSetting(EmailUserSetting emailUserSetting) {
		this.emailUserSetting = emailUserSetting;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
}
