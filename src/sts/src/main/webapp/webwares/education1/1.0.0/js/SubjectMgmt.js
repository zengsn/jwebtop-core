Ext.namespace("JW", "JW.webware");

JW.webware.SubjectPanel = function(config) {

	var subjectGridPanel = new JW.webware.SubjectGridPanel();// 学科数据面板

	var subjectDetailPanel = new JW.webware.SubjectDetailPanel();// 学科详情面板

	var subjectLeftMenu = new JW.webware.SubjectLeftMenu();// 学科导航栏

	var subjectPanel = new JW.webware.MainingPanel({
		region : 'center',
		activeTab : 0,
		items : [subjectGridPanel]
	});

	// 导航栏与学科数据面板关联
	subjectLeftMenu.on('nodeclick', function(nodeAttr) {
		subjectPanel.loadTab(nodeAttr);
	});

	JW.webware.SubjectPanel.superclass.constructor.call(this, {
		border : 'false',
		layout : 'border',
		border : false,
		items : [subjectLeftMenu, subjectPanel, subjectDetailPanel]
	});

};

Ext.extend(JW.webware.SubjectPanel, Ext.Panel, {});

/**
 * 学科管理导航栏
 */

JW.webware.SubjectLeftMenu = function(config) {
	var subjectT1 = new Ext.tree.TreePanel({
		border : false,
		rootVisible : false,
		root : new Ext.tree.AsyncTreeNode({
			text : "学科管理",
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

	JW.webware.SubjectLeftMenu.superclass.constructor.call(this, {

		title : '导航栏',
		region : 'west',
		width : 150,
		height : 300,
		trees : [subjectT1]
	});

};
Ext.extend(JW.webware.SubjectLeftMenu, JW.webware.LeftMenu, {

});

/**
 * 学科详情面板
 */
JW.webware.SubjectDetailPanel = function(config) {

//	var xmlReader = new Ext.data.XmlReader({
//		record : 'subjects',
//		fields : ['subjectDesc']
//		
//	});
//
//	var formPanel = new Ext.form.FormPanel({
//		width : 200,
//		border : false,
//		//url : JXP_WEB_CONTEXT + '/webwares/education/1.0.0/xml/Allsubjects.xml',
//		reader : xmlReader,
//		autoScroll : true,
//		autoHeight : true,
//		items : [{
//			xtype : 'textarea',
//			name : 'subjectDesc'
//		}],
//
//		buttons:[{
//			text:'加载',
//			handler:function(){
//				formPanel.getForm().load({
//					url:JXP_WEB_CONTEXT + '/webwares/education/1.0.0/xml/Allsubjects.xml',
//					waitMsg:'数据加载中.....'
//				})
//			}
//		}]
//	});

	var store = new Ext.data.Store({
		autoLoad: true,
		url: JXP_WEB_CONTEXT + '/webwares/education/1.0.0/xml/subjectDetail.xml',
		reader: new Ext.data.XmlReader({
			record: 'subjects',
			id: 'subjectId'
		}, [
		    'subjectId', 'subjectName', 'subjectDesc'
		])
    });
    store.load();
	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="subject-wrap" id="{subjectId}"',
			'<div class=""><b><p>{subjectName}</p></b></div>',
            '<div class=""><p>{subjectDesc}</p></div>',
        '</tpl>'
	);
	
	JW.webware.SubjectDetailPanel.superclass.constructor.call(this, {
		title : '学科详细信息',
		layout : 'fit',
		width : 200,
		height : 300,
		region : 'east',
		collapseMode : 'mini',
		headBorder : false,
		split : true,
		collapsible : true,
		items : new Ext.DataView({
			store : store,
			tpl : tpl,
			autoHeight : true,
			emptyText : '该课程没有描述'
		})
	});
};
Ext.extend(JW.webware.SubjectDetailPanel, Ext.Panel, {

});
