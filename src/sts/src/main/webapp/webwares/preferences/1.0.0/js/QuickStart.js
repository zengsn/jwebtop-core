/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.core');

/**
 * 快速启动。
 * @param config
 */
JW.core.QuickStartPanel = function(config) {
	var store = new Ext.data.Store({
		//autoLoad: true,
		url: './preferences-webwares.xml',
		reader: new Ext.data.XmlReader({
			record: 'webware',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    'id', 'name', 'author', 'screen', 'status', 'versions', 'currentVersion', 'release', 'description'
		])
    });
	JW.core.QuickStartPanel.superclass.constructor.call(this, {
		id:'quickstart-panel',
        layout:'fit',
        border: true,
        html: 'Shortcuts ...'
	});
};
Ext.extend(JW.core.QuickStartPanel, Ext.Panel, {
	
});