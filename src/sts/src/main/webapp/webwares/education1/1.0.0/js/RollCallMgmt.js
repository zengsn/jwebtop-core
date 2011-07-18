JW.webware.RollCallMgmtPanel = function(config) {

	var rollcallLeftMenu = new JW.webware.RollcallLeftMenu();
	
	var rollcallGridPanel = new JW.webware.RollCallGridPanel();
	
	var rollcallPanel = new JW.webware.MainingPanel({
		region : 'center',
		activeTab : 0,
		items : [rollcallGridPanel]
	});
	
	rollcallLeftMenu.on('nodeclick',function(nodeAttr){
		rollcallPanel.loadTab(nodeAttr);
	})
	
	JW.webware.RollCallMgmtPanel.superclass.constructor.call(this, {
		border : 'false',
		layout : 'border',
		border : false,
		items : [rollcallLeftMenu, rollcallPanel]
	});

};

Ext.extend(JW.webware.RollCallMgmtPanel, Ext.Panel, {});


/**
 * 点名册导航栏
 */



JW.webware.RollcallLeftMenu = function(config) {

	
	var classList1 = new Ext.tree.TreePanel({
		border : false,
		rootVisible : true,
		root : new Ext.tree.AsyncTreeNode({
			text : "计算机科学系",
			expanded : true,
			children : [{
				id : 'software0801',
				text : '08软件工程1班',
				leaf : true
			}, {
				id : 'software0802',
				text : '08软件工程2班',
				leaf : true
			}, {
				id : 'net0801',
				text : "08网络工程1班",
				leaf : true
			}, {
				id : "net0802",
				text : "08网络工程2班",
				leaf : true
			}, {
				id : "computer0801",
				text : "08计算机科学与技术1班",
				leaf : true
			}, {
				id : "computer0802",
				text : "08计算机科学与技术2班",
				leaf : true
			}]
		})
	});
	
	var classList2 = new Ext.tree.TreePanel({
		border : false,
		rootVisible : true,
		root : new Ext.tree.AsyncTreeNode({
			text : "数学系",
			expanded : true,
			children : [{
				id : 'Allsubjects',
				text : '所有学科',
				leaf : true
			}, {
				id : 'Computerdeptsubject',
				text : '计算机科学系',
				leaf : true
			}, {
				id : 'Artdeptsubject',
				text : "艺术系",
				leaf : true
			}, {
				id : "Ecnomicdeptsubject",
				text : "经济管理系",
				leaf : true
			}, {
				id : "Chinesedeptsubject",
				text : "中文系",
				leaf : true
			}]
		})
	});
	
	

	JW.webware.RollcallLeftMenu.superclass.constructor.call(this, {
		title : '导航栏',
		region : 'west',
		width : 150,
		height : 300,
		trees : [classList1, classList2]
	});

};
Ext.extend(JW.webware.RollcallLeftMenu, JW.webware.LeftMenu, {

});