<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JWebtop.org 
</title>

    <link rel="shortcut icon" href="./resources/images/favicon.ico" />
	<link rel="icon" href="./resources/images/favicon.ico" />

    <jsp:include page="ext.jsp"></jsp:include>

	<!-- User Styles -->
    <link rel="stylesheet" type="text/css" href="./resources/css/icons.css" />
    <link rel="stylesheet" type="text/css" href="./resources/css/view.css" />
    <link rel="stylesheet" type="text/css" href="./core/css/desktop.css" />
    <link rel="stylesheet" type="text/css" href="./core/css/startbar.css" />
    <link rel="stylesheet" type="text/css" href="./core/css/explorer.css" />
    <!-- 
    <link rel="stylesheet" type="text/css" href="./webwares/preferences/1.0.0/css/preferences.css" />
    <link rel="stylesheet" type="text/css" href="./webwares/preferences/1.0.0/css/shortcuts.css" />
    <link rel="stylesheet" type="text/css" href="./webwares/preferences/1.0.0/css/autorun.css" />
    <link rel="stylesheet" type="text/css" href="./webwares/preferences/1.0.0/css/quickstart.css" />
    <link rel="stylesheet" type="text/css" href="./webwares/preferences/1.0.0/css/appearance.css" />
    <link rel="stylesheet" type="text/css" href="./webwares/preferences/1.0.0/css/webwares2.css" />
    -->

    <!-- DESKTOP -->
    <script type="text/javascript" src="./core/js/Message.js"></script>
    <script type="text/javascript" src="./core/js/StartMenu.js"></script>
    <script type="text/javascript" src="./core/js/TaskBar.js"></script>
    <script type="text/javascript" src="./core/js/Webtop.js"></script>
    <script type="text/javascript" src="./core/js/System.js"></script>
    <script type="text/javascript" src="./core/js/Webware.js"></script>
    <!-- Webwares -->
    <script type="text/javascript" src="./core/js/Explorer.js"></script>
    <!-- 
    <script type="text/javascript" src="./webwares/preferences/1.0.0/js/Shortcuts.js"></script>
    <script type="text/javascript" src="./webwares/preferences/1.0.0/js/Autorun.js"></script>
    <script type="text/javascript" src="./webwares/preferences/1.0.0/js/QuickStart.js"></script>
    <script type="text/javascript" src="./webwares/preferences/1.0.0/js/Appearance.js"></script>
    <script type="text/javascript" src="./webwares/preferences/1.0.0/js/Webwares2.js"></script>
    <script type="text/javascript" src="./webwares/preferences/1.0.0/js/Preferences.js"></script>
    -->    
    <link rel="stylesheet" type="text/css" href="./webwares/office/1.0.0/css/calendar/resources/css/calendar.css" />  
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/Ext.calendar.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/templates/DayHeaderTemplate.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/templates/DayBodyTemplate.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/templates/DayViewTemplate.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/templates/BoxLayoutTemplate.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/templates/MonthViewTemplate.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/dd/CalendarScrollManager.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/dd/StatusProxy.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/dd/CalendarDD.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/dd/DayViewDD.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/EventRecord.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/views/MonthDayDetailView.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/widgets/CalendarPicker.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/WeekEventRenderer.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/views/CalendarView.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/views/MonthView.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/views/DayHeaderView.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/views/DayBodyView.js"></script>                                                                
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/views/DayView.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/views/WeekView.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/widgets/DateRangeField.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/widgets/ReminderField.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/EventEditForm.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/EventEditWindow.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/calendar/src/CalendarPanel.js"></script>
        <script type="text/javascript" src="./webwares/office/1.0.0/js/Calendar.js"></script>
    <c:forEach var="webware" items="${webwares}">
    	<security:accesscontrollist domainObject="${webware}" hasPermission="1,16">    	
    	<c:forEach var="style" items="${webware.styleList}">
    <link rel="stylesheet" type="text/css" href="./webwares/${webware.name}/${webware.currentVersion}/css/${style}" />	
    	</c:forEach> 	
    	<c:forEach var="jsSource" items="${webware.jsSourceList}">
    <script type="text/javascript" src="./webwares/${webware.name}/${webware.currentVersion}/js/${jsSource}"></script>	
    	</c:forEach>
    	</security:accesscontrollist>   
	</c:forEach>
    <!-- Startup Webtop -->
    <script type="text/javascript" src="./core/js/Instance.js"></script>
    
</head>
<body scroll="no">

<div id="x-desktop">
    <a href="./" target="_blank" style="margin:5px; float:right;" class="logo">&nbsp;</a>
	<span id="welcome-username" class="x-hidden"><security:authentication property="name" /></span>

    <dl id="x-shortcuts">
        <dt id="administrator-win-shortcut">
            <a href="#"><img src="./core/images/s.gif" />
            <div>超级管理</div></a>
        </dt>
        <dt id="preferences-win-shortcut">
            <a href="#"><img src="./core/images/s.gif" />
            <div>偏好设置</div></a>
        </dt>
         <dt id="office-win-shortcut">
            <a href="#"><img src="./core/images/s.gif" />
            <div>办公</div></a>
        </dt>
        <dt id="education-win-shortcut">
            <a href="#"><img src="./core/images/s.gif" />
            <div>教学管理器</div></a>
        </dt>
        <dt id="student-win-shortcut">
            <a href="#"><img src="./core/images/s.gif" />
            <div>学生管理</div></a>
        </dt>
    </dl>
    
</div>

<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-quickbuttons-panel"></div>
	<div id="ux-taskbuttons-panel"></div>
	<div id="ux-traybuttons-panel"></div>
	<div class="x-clear"></div>
</div>

<div id="message-win" class="x-hidden"></div>

</body>
</html>