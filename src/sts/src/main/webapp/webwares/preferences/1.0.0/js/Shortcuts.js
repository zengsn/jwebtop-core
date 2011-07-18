/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.core');

/**
 * 桌面快捷方式配置。
 * @param config
 */
JW.core.ShortcutsPanel = function(config) {
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
	JW.core.ShortcutsPanel.superclass.constructor.call(this, {
		id:'shortcuts-panel',
        layout:'fit',
        border: true,
        html: 'Shortcuts ...'
	});
};
Ext.extend(JW.core.ShortcutsPanel, Ext.Panel, {
	
});