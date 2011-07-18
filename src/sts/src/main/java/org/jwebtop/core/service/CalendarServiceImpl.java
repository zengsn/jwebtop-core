package org.jwebtop.core.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jwebtop.core.dao.CalendarDao;
import org.jwebtop.core.dao.CalendarEventDao;
import org.jwebtop.core.model.Calendar;
import org.jwebtop.core.model.CalendarEvent;
import org.jwebtop.core.model.User;

public class CalendarServiceImpl implements CalendarService {
	private CalendarDao calendarDao;
	private CalendarEventDao calendarEventDao;

	public CalendarDao getCalendarDao() {
		return calendarDao;
	}

	public void setCalendarDao(CalendarDao calendarDao) {
		this.calendarDao = calendarDao;
	}

	public CalendarEventDao getCalendarEventDao() {
		return calendarEventDao;
	}

	public void setCalendarEventDao(CalendarEventDao calendarEventDao) {
		this.calendarEventDao = calendarEventDao;
	}

	public String getCalendars() {
		List<Calendar> calendars = calendarDao.findCalendars();
		String jsonString = "{\"calendars\":[";
		for (int i = 0; i < calendars.size(); i++) {
			Calendar calendar = calendars.get(i);
			String calendarStr = "{";
			calendarStr += "\"id\":" + calendar.getId() + ",\"title\":\"" + calendar.getTitle()
					+ "\"},";
			jsonString += calendarStr;
		}
		if (calendars.size() > 0)
			jsonString = jsonString.substring(0, jsonString.length() - 1);
		jsonString += "]}";
		System.out.println(jsonString);
		return jsonString;
	}

	public String getEvents(String userId) {
		String hql = "select ce from CalendarEvent ce left join ce.calendar where ce.user = '"
				+ userId + "'";
		List<CalendarEvent> events = calendarEventDao.findUserEvents(hql);
		String jsonString = "{\"evts\":[";
		for (int i = 0; i < events.size(); i++) {
			CalendarEvent event = events.get(i);
			String eventStr = "{";
			eventStr += "\"id\":" + event.getId() + ",\"cid\":" + event.getCalendar().getId()
					+ ",";
			eventStr += "\"title\": \"" + event.getTitle() + "\",";
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			eventStr += "\"start\":\"" + format.format(event.getStartTime()) + "\",";
			eventStr += "\"end\":\"" + format.format(event.getEndTime()) + "\",";
			eventStr += "\"ad\":" + event.isAllDay() + ",\"notes\": \"" + event.getNote() + "\",";
			eventStr += "\"loc\":\"" + event.getLocation() + "\",\"url\":\"" + event.getUrl()
					+ "\",";
			eventStr += "\"rem\":\"" + event.getReminder() + "\"";
			eventStr += "},";
			jsonString += eventStr;
		}
		if (events.size() > 0)
			jsonString = jsonString.substring(0, jsonString.length() - 1);
		jsonString += "]}";
		System.out.println(jsonString);
		return jsonString;
	}

	public String addEvent(String strJsonArray, String userId) throws Exception {
		JSONArray jsonArray = JSONArray.fromObject(strJsonArray);
		for (int i = 0; i < jsonArray.size(); i++) {
			System.out.println(jsonArray.get(i));
			JSONObject jsonObject = JSONObject.fromObject(jsonArray.get(i));
			CalendarEvent event = new CalendarEvent();
			User user = new User();
			user.setId(userId);
			event.setUser(user);
			event.setTitle(jsonObject.getString("Title"));
			Calendar calendar = new Calendar();
			calendar.setId(jsonObject.getInt("CalendarId"));
			event.setCalendar(calendar);
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date startTime = format.parse(jsonObject.getString("StartDate").replace("T", " "));
			event.setStartTime(startTime);
			Date endTime = format.parse(jsonObject.getString("EndDate").replace("T", " "));
			event.setEndTime(endTime);
			event.setAllDay(jsonObject.getBoolean("IsAllDay"));
			event.setN(false);

			if (jsonObject.has("Notes"))
				event.setNote(jsonObject.getString("Notes"));
			if (jsonObject.has("Url"))
				event.setUrl(jsonObject.getString("Url"));
			if (jsonObject.has("Reminder"))
				event.setReminder(jsonObject.getString("Reminder"));
			if (jsonObject.has("Location"))
				event.setLocation(jsonObject.getString("Location"));
			calendarEventDao.saveEvent(event);
		}
		return "{success:true, msg:'添加成功！'}";
	}

	public String updateEvent(String strJsonArray) throws Exception {
		JSONArray jsonArray = JSONArray.fromObject(strJsonArray);
		for (int i = 0; i < jsonArray.size(); i++) {
			System.out.println(jsonArray.get(i));
			JSONObject jsonObject = JSONObject.fromObject(jsonArray.get(i));
			CalendarEvent event = calendarEventDao.findEvent(jsonObject.getInt("EventId"));
			if (event != null) {
				event.setTitle(jsonObject.getString("Title"));
				Calendar calendar = new Calendar();
				calendar.setId(jsonObject.getInt("CalendarId"));
				event.setCalendar(calendar);
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date startTime = format.parse(jsonObject.getString("StartDate").replace("T", " "));
				event.setStartTime(startTime);
				Date endTime = format.parse(jsonObject.getString("EndDate").replace("T", " "));
				event.setEndTime(endTime);
				event.setAllDay(jsonObject.getBoolean("IsAllDay"));
				event.setN(false);

				if (jsonObject.has("Notes"))
					event.setNote(jsonObject.getString("Notes"));
				if (jsonObject.has("Url"))
					event.setUrl(jsonObject.getString("Url"));
				if (jsonObject.has("Reminder"))
					event.setReminder(jsonObject.getString("Reminder"));
				if (jsonObject.has("Location"))
					event.setLocation(jsonObject.getString("Location"));
				calendarEventDao.updateEvent(event);
			} else {

			}
		}
		return "{success:true, msg:'更新成功！'}";
	}

	public String deleteEvent(String strJsonArray) {
		JSONArray jsonArray = JSONArray.fromObject(strJsonArray);
		for (int i = 0; i < jsonArray.size(); i++) {
			System.out.println(jsonArray.getInt(i));
			CalendarEvent event = calendarEventDao.findEvent(jsonArray.getInt(i));
			if (event != null)
				calendarEventDao.deleteEvent(event);
		}
		return "{success:true, msg:'删除成功！'}";
	}
}
