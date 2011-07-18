/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

// Webware Definition
JW.webware.EducationWindow = Ext.extend(JW.Webware, {
	id : 'education-win',
	title: '教学管理器',
	iconCls: 'icon-education',
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
			


	

			var t1 = new Ext.tree.TreePanel( {
				border : false,
				rootVisible : false,
				root : new Ext.tree.AsyncTreeNode( {
					text : "课程管理",
					expanded : true,
					children : [ {
						id : 'dept',
						text : "学院管理",
						leaf : true
					}, {
						id : "company",
						text : "学科管理",
						leaf : true
					}, {
						id : "somethinguseful",
						text : "暂时不管",
						leaf : true
					}]
				})
			});

			var t2 = new Ext.tree.TreePanel( {
				border : false,
				rootVisible : false,
				root : new Ext.tree.AsyncTreeNode( {
					text : "教学安排",
					expanded : true,
					children : [ {
						id : "one",
						text : "以后用到1",
						leaf : true
					}, {
						id : "two",
						text : "以后用到2",
						leaf : true
					}, {
						id : "three",
						text : "以后用到3",
						leaf:true

					}]
				})

			});

			var leftmenu = new JW.webware.LeftMenu( {
				title : '导航栏',
		
			    trees : [t1, t2]
			});
		

			
			
			
			var mainTab = new JW.webware.MainingPanel( {
				style : 'padding:0 6px 0 0',
				autoScroll : true,
				region : 'center',
				deferredRender : false,
				activeTab : 0,
				resizeTabs : true,
				inTabWidth : 100,
				tabWidth : 90,
				enableTabScroll : true,
				items : [{
					title : '我的首页',
					html : 'helloworld'
				}]
			});

			// 5、建立leftmenu和mainTab两者之间的关系
			leftmenu.on("nodeClick", function(nodeAttr) {
				mainTab.loadTab(nodeAttr);
			});
			
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
				layout : 'border',
				items :[ leftmenu, mainTab]
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


//Add webware instance
WEBWARES[WEBWARES.length] = new JW.webware.EducationWindow();