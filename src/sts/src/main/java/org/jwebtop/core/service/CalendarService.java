package org.jwebtop.core.service;

public interface CalendarService {

	public String getCalendars();

	public String getEvents(String userId);

	public String addEvent(String jsonArray, String userId) throws Exception;

	public String updateEvent(String jsonArray) throws Exception;

	public String deleteEvent(String jsonArray);

}
