package org.jwebtop.core.dao.orm;

import java.util.List;

import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

import org.jwebtop.core.dao.CalendarDao;
import org.jwebtop.core.model.Calendar;

public class HibernateCalendarDao extends HibernateDaoTemplate implements CalendarDao {

	@Override
	public Class<?> getPrototypeClass() {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Calendar> findCalendars() {
        @SuppressWarnings("unchecked")
		List<Calendar> calendars = this.hibernateTemplate.find("from Calendar");
		return calendars;
	}

}
