/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

JW.webware.schoolworkPanel = function(config){

	
	JW.webware.schoolworkPanel.superclass.constructor.call(this, {
		id:'course-panel',
	    layout:'fit',
		border : true,
		width : 900,
		height : 480,
		html : '学校作业'
	});
};

Ext.extend(JW.webware.schoolworkPanel, Ext.Panel, {
	
});
