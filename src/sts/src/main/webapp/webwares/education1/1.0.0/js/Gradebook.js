/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

JW.webware.gradebookPanel = function(config){
	
	JW.webware.gradebookPanel.superclass.constructor.call(this, {
		id:'course-panel',
	    layout:'fit',
		border : true,
		width : 900,
		height : 480,
		html : '成绩表'
	});
};

Ext.extend(JW.webware.gradebookPanel, Ext.Panel, {
	
});
