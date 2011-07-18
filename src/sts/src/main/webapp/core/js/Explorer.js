/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW');
//
JW.ExplorerWindow = Ext.extend(JW.Webware, {
	
	id : 'explorer-win',
	title: '资源浏览',
	iconCls: 'icon-explorer',
	
	
	init : function() {
        this.launcher = {
            text: this.title,
            iconCls:this.iconCls,
            handler : this.createWindow,
            scope: this
        };
	},

	createWindow : function() {
		var webware = this;
		var webtop = this.system.getWebtop();
		var win = webtop.getWindow(this.id);
		this.setPath();
		if (!win) {
			win = webtop.createWindow({
				id : this.id,
				title : this.title,
				width : 740,
				height : 480,
				iconCls : this.iconCls,
				shim : false,
				border: true,
				animCollapse : false,
				constrainHeader : true,

				layout : 'fit',
				items : new JW.ExplorerPanel({
					path: this.path,
					webware: webware
				})
			});
		}
		win.show();
	},
	
	setPath : function(path) {
		if (path) {
			this.path = path;
		} else if (this.id != 'explorer-win') {
			this.path = '/' + this.id.replace('-win', '');
		} else {
			this.path = '/';
		}
	},
	
	getWindow : function() {
		return this.system.getWebtop().getWindow(this.id);
	}
});

JW.ExplorerPanel = function(config) {
	config = config || {};
	if (!config.path) config.path = "ROOT";
	this.path = config.path; // exploring path
	this.webware = config.webware;
	var system = this.webware.system;
	var store = new Ext.data.Store({
		autoLoad: true,
		url: '.'+this.getPath()+'resources.xml',
		reader: new Ext.data.XmlReader({
			record: 'resource',
			id: 'id',
			totalRecords: 'totalCount'
		}, 
		[
		    'id', 'name', 'image', 'path', 'type', 'summary'
		])
    });
	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="resource-wrap" id="{id}">',
		    '<div class="resource"><img src=".{image}" title="{summary}" alt="{summary}"></div>',
		    '<span class="x-editable">{shortName}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
	);

    var dataview = new Ext.DataView({
        store: store,
        tpl: tpl,
        //autoHeight:true,
        multiSelect: true,
        overClass:'x-view-over',
        itemSelector:'div.resource-wrap',
        emptyText: 'No resources to display',

        plugins: [
            new Ext.DataView.DragSelector()
        ],

        prepareData: function(data){
            data.shortName = Ext.util.Format.ellipsis(data.name, 15);
            return data;
        },
        
        listeners: { 
        	'click': function(dataView, index, node, evnObj) {
            	var record = store.getAt(index);
            	var type = record.data.type;
            	if ('window' == type) {
            		var webware = system.getWebware(record.data.id + '-win');
            		webware.createWindow();
            	}
            }
        }
    });
    
	JW.ExplorerPanel.superclass.constructor.call(this, {   
		
		id:'resources-view',
        //frame:true,
        //width:535,
        //autoHeight:true,
        //collapsible:true,
        layout:'fit',
        border: false,
        //title:'Simple DataView (0 items selected)',

        items: dataview,
		tbar: [{
			text: '后退',
			iconAlign: 'right',
			iconCls: 'icon-left'
		}, '-', {
			text: '前进',
			iconCls: 'icon-right'
		}, '-', {
			//text: '刷新',
			iconCls: 'icon-refresh'
		}, '-', '地址:', ' ', {
			id: 'explorepath',
			xtype: 'combo',
			width: 480,
			value: this.path,    
			//typeAhead: true,
		    triggerAction: 'all',
		    lazyRender:true,
		    store: store,
		    valueField: 'path',
		    displayField: 'path',
		    
		    listeners: {
				'select' : function(combo, record, index) {
					var id = record.data.id + '-win';
					var title = record.data.name;
					var iconCls = 'icon-' + record.data.id;
					var win = this.webware.getWindow();
					if (win) {
						win.setTitle(title);
						win.setIconClass(iconCls);
					}
					//this.webware.setPath(record.data.path);
				}
			}
		}, '-', {
			//text: '转到',
			iconCls: 'icon-go'
		}, '->', {
			//text: '帮助',
			iconCls: 'icon-help'
		}],
		
		bbar: ['状态栏']
	});
};
Ext.extend(JW.ExplorerPanel, Ext.Panel, {
	
	getPath : function() {
		if (!this.path || 'ROOT' == this.path) {
			return '/';
		} else {
			return '/' + this.path.replace(/-/g, '/');
		}
	}
});
Ext.reg('jwexplorerpanel', JW.ExplorerPanel);


//Add webware instance
WEBWARES[WEBWARES.length] = new JW.ExplorerWindow();