package org.jwebtop.core.model;

import java.io.Serializable;
import java.util.Date;

public class CalendarEvent implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private Calendar calendar;
	private String title;
	private Date startTime;
	private Date endTime;
	private String location;
	private String note;
	private String url;
	private boolean allDay;
	private String reminder;
	private boolean n;
	private User user;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Calendar getCalendar() {
		return calendar;
	}

	public void setCalendar(Calendar calendar) {
		this.calendar = calendar;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public boolean isAllDay() {
		return allDay;
	}

	public void setAllDay(boolean allDay) {
		this.allDay = allDay;
	}

	public String getReminder() {
		return reminder;
	}

	public void setReminder(String reminder) {
		this.reminder = reminder;
	}

	public boolean isN() {
		return n;
	}

	public void setN(boolean n) {
		this.n = n;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
/*
 * 
 * mapping: 'id', mapping: 'cid', mapping: 'title', mapping: 'start', mapping:
 * 'end', mapping: 'loc', mapping: 'notes', mapping: 'url', type: 'string'
 * mapping: 'ad', mapping: 'rem', mapping: 'n',
 * 
 * };
 */