JW.webware.CollegemgmtPanel = function(config) {

	JW.webware.CollegemgmtPanel.superclass.constructor.call(this, {
		id : 'Collegemgmt',
		title : "学院管理",
		width : '100%',
		width : 690,
		height : 450,
		autoheight : true,
//		closable : true,
		items : new JW.webware.CollegeGridPanel()
	});

};

Ext.extend(JW.webware.CollegemgmtPanel, Ext.Panel, {});
// *********************************************************************
JW.webware.CollegeGridPanel = function(config) {
	var thisGrid = this;
	this.insertWin=new JW.webware.CollegeInfoWindow();
	var colleges = new Ext.data.Record.create([ {
		name : 'collegeId',
		type : "int"
	}, {
		name : 'collegeName',
		type : "string"
	}, {
		name : 'collegeFather',
		type : "string"
	} ]);

	// 定义分析器
	var reader = new Ext.data.XmlReader({
		record : 'colleges'

	}, colleges);

	// 定义store
	var ds = new Ext.data.Store({
		url : JXP_WEB_CONTEXT + '/webwares/education/1.0.0/xml/college.xml',
		reader : reader,
		autoLoad : true

	});

	// cm,grid

	var cm = new Ext.grid.ColumnModel({
		defaultSortable : true,
		defaultWidth : 100,
		columns : [ {
			id : 'collegeId',
			header : '学院编号',
			dataIndex : 'collegeId'
		}, {
			header : "学院名称",
			dataIndex : 'collegeName'
		}, {
			header : "隶属部门",
			dataIndex : 'collegeFather'

		} ]
	});

	var pagingBar = new Z.ux.PagingToolbarCN({
        pageSize: 10,
        displayInfo: true,
        store: ds,
        emptyMsg : '没有数据',
        items : [ {
			text : "添加",
			handler : function() {
				thisGrid.insertWin.show();
				thisGrid.insertWin.toFront();
			}
		}, {
			text : "修改"
		}, {
			text : "删除"
		} ]
	});

	// tbar分页,工具栏
	JW.webware.CollegeGridPanel.superclass.constructor.call(this, {
		id : 'Collegemgmt',
		cm : cm,
		sm : new Ext.grid.RowSelectionModel({
			singleSelect : true
		}),
		store : ds,
		width : 690,
		height : 450,
		border : false,
		region : 'north',
		bbar : pagingBar,
		loadMask : {
			msg : '正在载入数据,请稍等...'
		},

		title : '院系列表'

	});

};
Ext.extend(JW.webware.CollegeGridPanel, Ext.grid.GridPanel, {
	insertWin : null

});






