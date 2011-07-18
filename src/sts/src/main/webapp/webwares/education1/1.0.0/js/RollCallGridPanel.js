JW.webware.RollCallGridPanel = function(config) {

	var rollcall = new Ext.data.Record.create([{
				name : 'stuId',
				type : 'int'
			}, {
				name : 'stuName',
				type : "string"
			}, {
				name : 'subject',
				type : 'string'
			}, {
				name : 'ordinary',
				type : 'int'
			}, {
				name : 'experiment',
				type : 'int'
			}, {
				name : 'midterm',
				type : 'int'
			}, {
				name : 'final',
				type : 'int'
			}, {
				name : 'total',
				type : 'int'
			}, {
				name : 'credit',
				type : 'int'
			}, {
				name : 'point',
				type : 'int'
			}, {
				name : 'late',
				type : 'int'
			}, {
				name : 'sickLeave',
				type : 'int'
			}, {
				name : 'truancy',
				type : 'int'
			}]);

	// 定义分析器
	var reader = new Ext.data.XmlReader({
				record : 'rollcallList'
			}, rollcall);

	// 定义store
	var ds = new Ext.data.Store({
				url : JXP_WEB_CONTEXT
						+ '/webwares/education/1.0.0/xml/rollcall.xml',
				reader : reader,
				autoLoad : true
			});

	// cm,grid

	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				id : 'stuId',
				header : '学号',
				dataIndex : 'stuId'
			}, {
				header : '学生姓名',
				dataIndex : 'stuName'
			}, {
				header : '课程名称',
				dataIndex : 'subject'
			}, {
				header : '平时成绩',
				dataIndex : 'ordinary',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '实验成绩',
				dataIndex : 'experiment',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '期中成绩',
				dataIndex : 'midterm',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '期末成绩',
				dataIndex : 'final',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '总评',
				dataIndex : 'total',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '学分',
				dataIndex : 'credit',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '绩点',
				dataIndex : 'point',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '迟到',
				dataIndex : 'late',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '请假',
				dataIndex : 'sickLeave',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}, {
				header : '旷课',
				dataIndex : 'truancy',
				editor : new Ext.grid.GridEditor(new Ext.form.TextField({
							allowBlank : false
						}))
			}]);

	var pagingBar = new Z.ux.PagingToolbarCN({
				pageSize : 10,
				displayInfo : true,
				store : ds,
				emptyMsg : '没有数据',
				items : [{
							text : '刷新'
						}, {
							text : "修改"
						}, {
							xtype : 'combo',
							fieldLabel : '课程列表',
							displayField : 'subject',
							width : 160,
							mode : 'local',
							hiddenName : 'subject',
							autoScroll : true,
							triggerAction : "all",
							value : 'java程序设计教程',
							store : new Ext.data.SimpleStore({
								fields : ['subject'],
								data : [['java程序设计教程'], ['C#程序设计教程'],['软件工程导论'],['数据库系统概论']]
							})
						}, {
							iconCls : 'icon-search'
						}]
			});

	// tbar分页,工具栏
	JW.webware.RollCallGridPanel.superclass.constructor.call(this, {
				id : 'RollCallGridPanel',
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

				title : '学生名单'

			});

};
Ext.extend(JW.webware.RollCallGridPanel, Ext.grid.EditorGridPanel, {
			insertWin : null

		});
		
JW.webware.Software0802Panel = function(config) {

	JW.webware.Software0802Panel.superclass.constructor.call(this, {
		title : "08软件2班",
		id : 'software0802',
		autoheight : true,
		width : '100%',
		height : 420,
		items : new JW.webware.RollCallGridPanel()
	});

};

Ext.extend(JW.webware.Software0802Panel, Ext.Panel, {});