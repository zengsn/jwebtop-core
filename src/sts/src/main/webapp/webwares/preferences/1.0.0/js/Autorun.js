/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.core');

/**
 * 自动运行。
 * @param config
 */
JW.core.AutorunPanel = function(config) {
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
	JW.core.AutorunPanel.superclass.constructor.call(this, {
		id:'autorun-panel',
        layout:'fit',
        border: true,
        html: 'Shortcuts ...'
	});
};
Ext.extend(JW.core.AutorunPanel, Ext.Panel, {
	
});