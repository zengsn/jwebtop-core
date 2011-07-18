package org.jwebtop.core.dao;

import java.util.List;

import org.jwebtop.core.model.Calendar;

public interface CalendarDao {
	public List<Calendar> findCalendars();
}
