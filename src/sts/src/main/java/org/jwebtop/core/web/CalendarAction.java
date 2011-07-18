package org.jwebtop.core.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;

import org.jwebtop.core.service.CalendarService;

import org.zengsource.mvc.MvcException;
import org.zengsource.mvc.action.MultipleAction;

public class CalendarAction extends MultipleAction {
	private static final long serialVersionUID = 1L;
	public CalendarService calendarService;

	public CalendarService getCalendarService() {
		return calendarService;
	}

	public void setCalendarService(CalendarService calendarService) {
		this.calendarService = calendarService;
	}

	public void doCalendars() throws MvcException {
		System.out.println("calendars");
		String result = calendarService.getCalendars();
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			System.out.println(result);
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doEvents() throws MvcException, Exception {
		System.out.println("events");
		String userId = "guest";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		sdf.setLenient(false);
		String result = calendarService.getEvents(userId);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			System.out.println(result);
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doAddEvent() throws MvcException, Exception {
		System.out.println("doAddEvent");
		String userId = "guest";
		String jsonArray = this.getRequest().getParameter("event");
		System.out.println(jsonArray);
		String result = calendarService.addEvent(jsonArray, userId);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			System.out.println(result);
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doUpdateEvent() throws MvcException, Exception {
		System.out.println("doUpdateEvent");
		String jsonArray = this.getRequest().getParameter("event");
		System.out.println(jsonArray);
		String result = calendarService.updateEvent(jsonArray);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			System.out.println(result);
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}

	public void doDeleteEvent() throws MvcException {
		System.out.println("doDeleteEvent");
		String jsonArray = this.getRequest().getParameter("event");
		System.out.println(jsonArray);
		String result = calendarService.deleteEvent(jsonArray);
		PrintWriter out = null;
		try {
			out = this.getResponse().getWriter();
			System.out.println(result);
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
				out = null;
			}
		}
	}
}
