/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

/**
 * 课程管理
 *
 */
JW.webware.coursePanel = function(config){
	
	/*
	 *
	 */
	
	var subjectPanel = new JW.webware.SubjectPanel();
	
	var rollcallPanel = new JW.webware.RollCallMgmtPanel();
	
	var courseTabPanel = new Ext.TabPanel({
		activeTab : 0,
		border : false,
		defaults : {layout : 'fit'},
		items : [{
			title : '学科管理',
			items : [subjectPanel]
		},{
			title : '选课情况'
		},{
			title : '点名册',
			items : [rollcallPanel]
		}]
	});
	
	JW.webware.coursePanel.superclass.constructor.call(this, {
		id:'course-panel',
	    layout:'fit',
		border : false,
		width : 900,
		height : 480,
		html : 'coursePanel',
		items : [courseTabPanel]
	});
};

Ext.extend(JW.webware.coursePanel, Ext.Panel, {
	
});
