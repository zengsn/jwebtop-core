package org.jwebtop.core.dao.orm;

import java.util.List;

import org.zengsource.util.spring.dao.orm.HibernateDaoTemplate;

import org.jwebtop.core.dao.CalendarEventDao;
import org.jwebtop.core.model.CalendarEvent;

public class HibernateCalendarEventDao extends HibernateDaoTemplate implements CalendarEventDao {

	@Override
	public Class<?> getPrototypeClass() {
		return CalendarEvent.class;
	}

	public List<CalendarEvent> findUserEvents(String hql) {
        @SuppressWarnings("unchecked")
		List<CalendarEvent> events = this.hibernateTemplate.find(hql);
		return events;
	}

	public void saveEvent(CalendarEvent event) {
          this.save(event);		
	}

	public CalendarEvent findEvent(int eventId) {
		//String hql = "select c from CalendarEvent c where c.id = "+eventId;
        CalendarEvent event = (CalendarEvent)super.queryById(eventId);
		 return event;
	}

	public void updateEvent(CalendarEvent event) {
          this.hibernateTemplate.update(event);	
	}

	public void deleteEvent(CalendarEvent event) {
         this.hibernateTemplate.delete(event);		
	}

}
