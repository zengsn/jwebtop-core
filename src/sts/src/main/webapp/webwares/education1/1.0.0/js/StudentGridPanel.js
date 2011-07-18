JW.webware.AllstudentsPanel = function(config) {
	JW.webware.AllstudentsPanel.superclass.constructor.call(this, {
		id : 'Allstudents',
		title : '所有学生',
		autoheight : true,
		width : '100%',
		height : 450,
		items : new JW.webware.StudentGridPanel()
	});
};

Ext.extend(JW.webware.AllstudentsPanel, Ext.Panel, {});
// *********************************************************************
JW.webware.StudentGridPanel = function(config) {
	var thisGrid = this;
	this.insertWin = new JW.webware.StudentInfoWindow();
	var students = new Ext.data.Record.create([ {
		name : 'studentNum',
		type : "int"
	}, {
		name : 'studentName',
		type : "string"
	}, {
		name : 'studentSex',
		type : "string"
	}, {
		name : 'studentNation',
		type : 'string'
	}, {
		name : 'studentOrigin',
		type : 'string'
	}, {
		name : 'studentBirth',
		type : 'string'
	}, {
		name : 'studentEdu',
		type : 'string'
	}, {
		name : 'studentDept',
		type : 'string'
	}, {
		name : 'studentClass',
		type : 'string'
	}, {
		name : 'studentPolitics',
		type : 'string'
	}, {
		name : 'studentTel',
		type : 'string'
	}, {
		name : 'studentID',
		type : 'string'
	}, {
		name : 'studentAdd',
		type : 'string'
	} ]);

	// 定义分析器
	var reader = new Ext.data.XmlReader({
		// totalProperty : "results",
		record : 'students'

	}, students);

	// 定义store
	var ds = new Ext.data.Store({
		url : JXP_WEB_CONTEXT + '/webwares/education/1.0.0/xml/student.xml',
		reader : reader,
		autoLoad : true

	});

	// cm,grid

	var cm = new Ext.grid.ColumnModel({
		defaultSortable : true,
		defaultWidth : 100,
		columns : [ {
			id : 'studentNum',
			header : '学号',
			dataIndex : 'studentNum'
		}, {
			header : "姓名",
			dataIndex : 'studentName'
		}, {
			header : "性别",
			dataIndex : 'studentSex'

		}, {
			header : "民族",
			dataIndex : 'studentNation'
		}, {
			header : "籍贯",
			dataIndex : 'studentOrigin'
		}, {
			header : "出生年月",
			dataIndex : 'studentBirth'
		}, {
			header : "教育程度",
			dataIndex : 'studentEdu'
		}, {
			header : "所在系",
			dataIndex : 'studentDept'
		}, {
			header : "所在班级",
			dataIndex : 'studentClass'
		}, {
			header : "政治面貌",
			dataIndex : 'studentPolitics'
		}, {
			header : "联系电话",
			dataIndex : 'studentTel'
		}, {
			header : "身份证号",
			dataIndex : 'studentID'
		}, {
			header : '家庭住址',
			dataIndex : 'studentAdd'
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
	JW.webware.StudentGridPanel.superclass.constructor.call(this, {

		cm : cm,
		sm : new Ext.grid.RowSelectionModel({
			singleSelect : true
		}),
		store : ds,
		layout : 'fit',
		width : 690,
		height : 450,
		border : false,
		bbar : pagingBar,
		loadMask : {
			msg : '正在载入数据,请稍等...'
		},
		title : '学生列表'

	});
};
Ext.extend(JW.webware.StudentGridPanel, Ext.grid.GridPanel, {
	insertWin : null
});