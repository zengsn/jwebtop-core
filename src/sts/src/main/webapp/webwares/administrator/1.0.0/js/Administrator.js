/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

// Webware Definition
JW.webware.AdministratorWindow = Ext.extend(JW.Webware, {
	id : 'administrator-win',
	title: '超级管理器',
	iconCls: 'icon-administrator',
	init : function() {
        this.launcher = {
            text: this.title,
            iconCls:this.iconCls,
            handler : this.createWindow,
            scope: this
        };
	},

	createWindow : function(src) {
		var webtop = this.system.getWebtop();
		if (!src) {src = {};}
        if (!src.windowId) { 
        	src.windowId = this.id; 
        	src.text = this.title; 
	        src.iconCls = this.iconCls;
        } 
		var win = webtop.getWindow(src.windowId);
		if (!win) {
			var innerPanel = new JW.webware.AdministratorPanel({webware: this});
			win = webtop.createWindow({
				id : src.windowId,
				title : src.text,
				width : 740,
				height : 480,
				iconCls : src.iconCls,
				shim : false,
				border: false,
				animCollapse : false,
				constrainHeader : true,

				layout : 'fit',
				items : innerPanel
			});
		}
		win.show();
	},
	
	createWindowById: function(windowId) {
		var windows = this.launcher.menu.items;
		for(var i=0; i<windows.length; i++) {
			var window = windows[i];
			if (windowId == window.windowId) {
				this.createWindow(windows[i]);
				return;
			}
		}
		alert("找不到控件ID:[" + windowId + "]");
	}
});

/**
 * 管理器Panel。
 * @param config
 */
JW.webware.AdministratorPanel = function(config) {
	var thisPanel = this;
	var buttonHandler = function(btn, state) {
		var cardId = btn.id.replace('btn-', 'card-');
		if (state) {
			thisPanel.layout.setActiveItem(cardId);
		} else {
			//Ext.getCmp('btn-mywebwares').toggle(true, false);
			//thisPanel.layout.setActiveItem(0);
		}
	};
	JW.webware.AdministratorPanel.superclass.constructor.call(this, {
		id:'administrator-panel',
        layout:'card',
        activeItem: 0,
        defaults: {border: false},
        border: true,
		tbar: [' ', ' ', ' ', {
			id: 'btn-adminwebwares',
			text: '网件',
			width: 50,
			iconAlign: 'top',
			iconCls: 'icon-adminwebwares',
			enableToggle: true,
			toggleGroup: 'administrator',
			toggleHandler: buttonHandler,
			pressed: true,
            scale: 'large'
		}, ' ', ' ', ' ', {
			id: 'btn-adminusers',
			text: '用户',
			width: 50,
			iconAlign: 'top',
			iconCls: 'icon-adminusers',
			enableToggle: true,
			toggleGroup: 'administrator',
			toggleHandler: buttonHandler,
			pressed: false,
            scale: 'large'
		},'->',{
        	xtype: 'textfield',
        	id: 'filter',
        	selectOnFocus: true,
        	width: 100,
        	height: 50,
        	listeners: {
        		'render': {fn:function(){
			    	Ext.getCmp('filter').getEl().on('keyup', function(){
			    		// this.filter();
			    	}, this, {buffer:500});
        		}, scope:this}
        	}
        }, {
        	iconCls: 'icon-search'
        }],
        items: [ new JW.webware.WebwaresGridPanel({
        	id: 'card-adminwebwares'
		}),{
        	id: 'card-adminusers',
        	html: '用户管理'
		}]
	});
};
Ext.extend(JW.webware.AdministratorPanel, Ext.Panel, {
	
});

//Add webware instance
WEBWARES[WEBWARES.length] = new JW.webware.AdministratorWindow();