/**
 *
 */

Ext.namespace('JW', 'JW.webware');


JW.webware.collegePanel = function(config) {

	/*
		学院院系管理tabPanel
	*/
	
	var t1 = new Ext.tree.TreePanel( {
		border : false,
		rootVisible : false,
		root : new Ext.tree.AsyncTreeNode( {
			text : "学院管理",
			expanded : true,
			children : [{
				id : 'Collegemgmt',
				text : '学院管理',
				leaf : true
			},{
				id : 'Deptmgmt',
				text : "系别管理",
				leaf : true
			}]
		})
	});

	var t2 = new Ext.tree.TreePanel( {
		border : false,
		rootVisible : false,
		root : new Ext.tree.AsyncTreeNode( {
			text : "教师管理",
			expanded : true,
			children : [{
				id : 'Allteachers',
				text : '所有教师',
				leaf : true
			},{
				id : 'Computerdept',
				text : '计算机科学系',
				leaf : true
			},{
				id : 'Artdept',
				text : "艺术系",
				leaf : true
			}, {
				id : "Ecnomicdept",
				text : "经济管理系",
				leaf : true
			}, {
				id : "Chinesedept",
				text : "中文系",
				leaf : true
			}]
		})
	});
	
	var t3 = new Ext.tree.TreePanel( {
		border : false,
		rootVisible : false,
		root : new Ext.tree.AsyncTreeNode( {
			text : "学生管理",
			expanded : true,
			children : [{
				id : 'Allstudents',
				text : '所有学生',
				leaf : true
			},{
				id : 'Computerdept',
				text : '计算机科学系',
				leaf : true
			},{
				id : 'Artdept',
				text : "艺术系",
				leaf : true
			}, {
				id : "Economicdept",
				text : "经济管理系",
				leaf : true
			}, {
				id : "Chinesedept",
				text : "中文系",
				leaf : true
			}]
		})
	});
	
	var leftmenu = new JW.webware.LeftMenu( {
		title : '导航栏',

	    trees : [t1, t2, t3]
	});
	

	var collegetabpanel = new JW.webware.MainingPanel({
		id : 'collegetabpanel',
		style : 'padding:0 6px 0 0',
		region : 'center',
		deferredRender : false,
		layoutOnTabChange : true,
		activeTab : 0,
		resizeTabs : true,
		inTabWidth : 100,
		tabWidth : 90,
		closable : true,
		animScroll : true,
		enableTabScroll : true,
		items : [
//			title : '我的首页',
//			html : 'helloworld'
			new JW.webware.CollegemgmtPanel()
		]
	});
	
	
	/*
		主面板列表面板
	*/
	
	leftmenu.on("nodeClick", function(nodeAttr) {
		collegetabpanel.loadTab(nodeAttr);
	});
	
	/*
		学院管理主窗口
	*/
	
	JW.webware.collegePanel.superclass.constructor.call(this, {
		id:'college-panel',
        layout:'border',
		border : false,
		resizable : false,
		width : 900,
		height : 480,
		items : [leftmenu, collegetabpanel]
	});
};

Ext.extend(JW.webware.collegePanel, Ext.Panel, {
	
});
