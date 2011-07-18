package org.jwebtop.core.dao;

import java.util.List;

import org.jwebtop.core.model.CalendarEvent;

public interface CalendarEventDao {

	List<CalendarEvent> findUserEvents(String hql);

	void saveEvent(CalendarEvent event);

	CalendarEvent findEvent(int int1);

	void updateEvent(CalendarEvent event);

	void deleteEvent(CalendarEvent event);

}
