/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.core');//Ext命名空间：自定义名称（跟前面没什么联系，只要命名不跟前面的一样就可以进行命名）

// Webware Definition
JW.core.PreferencesWindow = Ext.extend(JW.Webware, {//对JW.Webware进行扩展，创建新的对象PreferencesWindow
	
	id : 'preferences-win',//唯一标识该窗体：窗体标识名
	title: '偏好设置',//图标下标名：窗体显示名称
	iconCls: 'icon-preferences',//配置图标：图标名
	
	init : function() {//是一个公共方法函数，init相当于指在PreferencesWindow里面含有的东西
        
	this.launcher = {//该窗体的启动程序
            text: this.title,//启动程序的标题
            iconCls:this.iconCls,//启动程序的图标
            //handler : this.createWindow,//执行句柄：执行函数名
            scope: this,//指作用域
            //以下这一块是当你点击桌面的偏好设置图标后会弹出以下菜单
            menu: {//该启动程序的菜单
	            items: [{//该菜单的有关项
	            	windowId: 'preferences-shortcuts-win',//唯一标识菜单项：菜单项的标识名
	        		text: '快捷方式',//名称
	        		iconCls: 'icon-preferences-shortcuts',//图标
	                handler : this.createWindow,//执行句柄：创建窗体函数
	                scope: this//作用范围
	            },{
	            	windowId: 'preferences-autorun-win',
	        		text: '自动运行',
	        		iconCls: 'icon-preferences-autorun',
	                handler : this.createWindow,
	                scope: this
	            },{
	            	windowId: 'preferences-quickstart-win',
	        		text: '快速启动',
	        		iconCls: 'icon-preferences-quickstart',
	                handler : this.createWindow,
	                scope: this
	            },{
	            	windowId: 'preferences-appearance-win',
	        		text: '显示设置',
	        		iconCls: 'icon-preferences-appearance',
	                handler : this.createWindow,
	                scope: this
	            },{
	            	windowId: 'preferences-webwares-win',
	        		text: '安装网件',
	        		iconCls: 'icon-preferences-webwares',
	                handler : this.createWindow,
	                scope: this
	            }]
        	}
        };
	},

	createWindow : function(src) {//创建窗体函数，src是窗体对象参数
		
		var webtop = this.system.getWebtop();//用webtop变量引用真正的Webtop界面
		
		if (!src) {src = {};}//如果参数src没有输入对象，则把其赋值为空对象
		
        if (!src.windowId) { //如果没有对象的标识名,就把当前的对象的id、title、iconCls赋值给它
        	src.windowId = this.id; 
        	src.text = this.title; 
	        src.iconCls = this.iconCls;
        } 
        
		var win = webtop.getWindow(src.windowId);//用win变量来引用通过src.windowId所获得的Webtop界面上的窗体
		
		if (!win) {
			var innerPanel;//偏好设置窗体的内部窗体
			if ('preferences-shortcuts-win'==src.windowId) {
				innerPanel = new JW.core.ShortcutsPanel({webware: this});
			} else if ('preferences-autorun-win'==src.windowId) {
				innerPanel = new JW.core.AutorunPanel({webware: this});
			} else if ('preferences-quickstart-win'==src.windowId) {
				innerPanel = new JW.core.QuickStartPanel({webware: this});
			} else if ('preferences-appearance-win'==src.windowId) {
				innerPanel = new JW.core.AppearancePanel({webware: this});
			} else if ('preferences-webwares-win'==src.windowId) {
				innerPanel = new JW.core.WebwaresPanel({webware: this});
			} else {
				innerPanel = new JW.core.PreferencesPanel({webware: this});
			}
			
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
		win.show();//显示窗体
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
 * 偏好设置主页。
 * @param config
 */
JW.core.PreferencesPanel = function(config) {
	this.webware = config.webware;
	var store = new Ext.data.Store({
		autoLoad: true,
		url: './preferences.xml',
		reader: new Ext.data.XmlReader({
			record: 'prenference',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    'id', 'name', 'image', 'path', 'type', 'summary'
		])
    });
	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="preference-wrap" id="{id}">',
            '<div class="preference"><img src=".{image}" title="{summary}" alt="{summary}"></div>',
		    '<div class="infomation"><span class="x-editable">{shortName}</span><p>{summary}</p></div></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
	);

    var dataview = new Ext.DataView({
        store: store,
        tpl: tpl,
        //autoHeight:true,
        multiSelect: true,
        overClass:'x-view-over',
        itemSelector:'div.preference-wrap',
        emptyText: 'No item to display',

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
            	config.webware.createWindowById('preferences-'+record.data.id + '-win');
            }
        }
    });
    //操作条，前进、后退、刷新等
	JW.core.PreferencesPanel.superclass.constructor.call(this, {
		id:'preferences-view',
        layout:'fit',
        border: true,

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
			iconCls: 'icon-refresh',
			handler: function() {store.load();}
		}, '->', {
			//text: '帮助',
			iconCls: 'icon-help'
		}],
		
		bbar: ['状态栏']
	});
};
Ext.extend(JW.core.PreferencesPanel, Ext.Panel, {
	
});


//Add webware instance
WEBWARES[WEBWARES.length] = new JW.core.PreferencesWindow();