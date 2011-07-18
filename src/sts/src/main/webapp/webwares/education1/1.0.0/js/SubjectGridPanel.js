/**
 * 学科管理数据表
 */

JW.webware.SubjectGridPanel = function(config) {

	var thisGrid = this;
	this.insertWin = new JW.webware.SubjectInfoWindow();
	var Subjects = new Ext.data.Record.create([ {
		name : 'subjectId',
		type : "int"
	}, {
		name : 'subjectName',
		type : "string"
	}, {
		name : 'subjectTime',
		type : "string"
	}, {
		name : 'subjectPeriod',
		type : "string"
	}, {
		name : 'subjectCredit',
		type : "string"
	}, {
		name : 'subjectLasttime',
		type : "string"
	}, {
		name : 'subjectExam',
		type : "string"
	}, {
		name : 'subjectClass',
		type : "string"
	}, {
		name : 'subjectAdd',
		type : "string"
	}, {
		name : 'subjectTeacher',
		type : "string"
	}, {
		name : 'subjectDept',
		type : "string"
	}, {
		name : 'subjectDesc',
		type : 'string'
	} ]);

	// 定义分析器
	var reader = new Ext.data.XmlReader({
		// totalProperty : "results",
		record : 'subjects'

	}, Subjects);

	// 定义store
	var ds = new Ext.data.Store({
		url : JXP_WEB_CONTEXT + '/webwares/education/1.0.0/xml/Allsubjects.xml',
		reader : reader,
		autoLoad : true

	});

	// cm,grid

	var cm = new Ext.grid.ColumnModel({
		defaultSortable : true,
		defaultWidth : 100,
		columns : [ {
			id : 'subjectId',
			header : '学科编号',
			dataIndex : 'subjectId'
		}, {
			header : "学科名称",
			dataIndex : 'subjectName'
		}, {
			header : "上课时间",
			dataIndex : 'subjectTime'

		}, {
			header : "学科学时",
			dataIndex : 'subjectPeriod'
		}, {
			header : "学科学分",
			dataIndex : 'subjectCredit'
		}, {
			header : "学科周数",
			dataIndex : 'subjectLasttime'
		}, {
			header : "测验方式",
			dataIndex : 'subjectExam'
		}, {
			header : "上课班级",
			dataIndex : 'subjectClass'
		}, {
			header : "上课地点",
			dataIndex : 'subjectAdd'
		}, {
			header : "任课教师",
			dataIndex : 'subjectTeacher'
		}, {
			header : "隶属部门",
			dataIndex : 'subjectDept'
		}, {
			header : '课程描述',
			dataIndex : 'subjectDesc'
		} ]
	});

	// tbar分页,工具栏
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

	JW.webware.SubjectGridPanel.superclass.constructor.call(this, {
		id : 'Allsubjects',
		cm : cm,
		sm : new Ext.grid.RowSelectionModel({
			singleSelect : true
		}),
		store : ds,
		region : 'center',
		layout : 'fit',
		border : false,
		bbar : pagingBar,
		height : 420,
		loadMask : {
			msg : '正在载入数据,请稍等...'
		},
		title : '所有学科'
	});
};
JW.webware.SubjectGridPanel = Ext.extend(JW.webware.SubjectGridPanel,
		Ext.grid.GridPanel, {

		});

JW.webware.AllsubjectsPanel = function(config) {

	JW.webware.AllsubjectsPanel.superclass.constructor.call(this, {
		title : "所有学科",
		id : 'Allsubjects',
		autoheight : true,
		width : '100%',
		height : 420,
		items : new JW.webware.SubjectGridPanel()
	});

};

Ext.extend(JW.webware.AllsubjectsPanel, Ext.Panel, {});