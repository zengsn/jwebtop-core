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
			


	

			var t1 = new JW.webware.TreeMenu();
	        var t2 = new JW.webware.TreeMenu({	
	            root : new Ext.tree.AsyncTreeNode( {
					text : "成绩管理",
					expanded : true,
					children : [{
						id:'computerdepartment',	
						text:'计算机科学系',
						children:[{
						text:'网络班',
						expanded : true,
						children:[{
					    id:'seventhnetwork',
						text:'07网络',
						leaf:true
						},{
					    id:'sixthnetwork',
						text:'06网络',
						leaf:true
						},{
					    id:'fifthnetwork',
						text:'05网络',
						leaf:true
						},{
					    id:'fourthnetwork',
						text:'04网络',
						leaf:true
						}]
						},{
						text:'软件班',
						leaf:true
						},{
						text:'计算机1班',
						leaf:true
						},{
						text:'计算机2班 ',
						leaf:true
						}]
						}
					, {
						id : "foreigndepartment",
						text : "外语系",
						leaf : true
					}, {
						id : "chinesedepartment",
						text : "中文系",
						leaf:true
					}]
				})});
              var t3 =new JW.webware.TreeMenu({
                    root:new Ext.tree.AsyncTreeNode( {
					text : "在线学习",
					expanded : true            
                    })
              });
             var t4 =new JW.webware.TreeMenu({
                    root:new Ext.tree.AsyncTreeNode( {
					text : "在线考试",
					expanded : true            
                    })
              });

			var leftmenu = new JW.webware.LeftMenu( {
				title : '导航栏',
		   
			    trees : [t1, t2,t3,t4]
			});
		

			
			
			
			var mainTab = new JW.webware.mainTab();

			// 5、建立leftmenu和mainTab两者之间的关系
//			leftmenu.on("nodeClick", function(nodeAttr) {
//				mainTab.loadTab(nodeAttr);
//			});
			
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
				items :[leftmenu, mainTab]
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