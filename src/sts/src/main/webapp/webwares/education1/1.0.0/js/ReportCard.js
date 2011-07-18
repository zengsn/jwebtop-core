/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

JW.webware.ReportCardPanel = function(config){
	
	JW.webware.ReportCardPanel.superclass.constructor.call(this, {
		id:'course-panel',
	    layout:'fit',
		border : true,
		width : 900,
		height : 480,
		html : '成绩报告单'
	});
};

Ext.extend(JW.webware.ReportCardPanel, Ext.Panel, {
	
});
