/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

JW.webware.SchedulePanel = function(config){
	
	JW.webware.SchedulePanel.superclass.constructor.call(this, {
		id:'course-panel',
	    layout:'fit',
		border : true,
		width : 900,
		height : 480,
		html : '计划表'
	});
};

Ext.extend(JW.webware.SchedulePanel, Ext.Panel, {
	
});
