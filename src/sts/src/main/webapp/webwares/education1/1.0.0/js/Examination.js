/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

JW.webware.ExaminationPanel = function(config){

	
	JW.webware.ExaminationPanel.superclass.constructor.call(this, {
		id:'course-panel',
	    layout:'fit',
		border : true,
		width : 900,
		height : 480,
		html : '在线考试'
	});
};

Ext.extend(JW.webware.ExaminationPanel, Ext.Panel, {
	
});
/**
 * 
 */