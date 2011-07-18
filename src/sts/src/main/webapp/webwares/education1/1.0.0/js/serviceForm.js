/**
 * ==================================================================
 * 系别信息表单
 */
JW.webware.DepartmentInfoFormPanel = Ext.extend(Ext.form.FormPanel, {
	constructor : function() {

		JW.webware.DepartmentInfoFormPanel.superclass.constructor.call(this, {
			labelWidth : 60,
			defaultType : "textfield",
			defaults : {
				anchor : "98%"
			},
			baseCls : "x-plain",
			items : [ {
				fieldLabel : "院系代码",
				name : "departmentID"
			}, {
				fieldLabel : "系名",
				name : "departmentName"

			}, {
				fieldLabel : "辅导员",
				name : "assistant"
			}, {
				fieldLabel : "联系电话",
				name : "telephone"
			}, {
				xtype : "combo",
				fieldLabel : "性别",
				hiddenName : "sex",
				mode : "local",
				displayField : "sex",
				typeAhead : true,
				triggerAction : "all",
				value : "男",
				store : new Ext.data.SimpleStore({
					fields : [ "sex" ],
					data : [ [ "男" ], [ "女" ] ]
				})
			} ]
		});

	},
	getValues : function() {
		return Ext.data.Record(this.getForm().getValues());
	},
	setValues : function(_r) {
		this.getForm().loadRecord(_r);
	},
	reset : function() {
		this.getForm().reset();
	}
});
/**
 * 添加系别信息窗口
 */
JW.webware.DepartmentInfoWindow = Ext.extend(Ext.Window, {
	form : new JW.webware.DepartmentInfoFormPanel(),
	constructor : function() {
		JW.webware.DepartmentInfoWindow.superclass.constructor.call(this, {
			plain : true,
			width : 300,
			items : this.form,
			modal : true,
			closeAction : "hide",
			buttons : [ {
				text : "确 定",
				handler : this.onSubmitClick,
				scope : this
			}, {
				text : "取 消",
				handler : this.onCancleClick,
				scope : this
			} ]
		});
		// this.addEvents("submit");

	},
	close : function() {
		this.form.reset();
		this.hide();
	},
	onSubmitClick : function() {
		// this.fireEvent("submit",this,this.form.getForm().getValues());
		// this.close();
		this.form.getForm().submit({
			url : 'webware/education/dept.jxp',
			params : {
				action : 'insert'
			},
			waitMsg : '正在保存数据，请稍候...',
			submitEmptyText : false
		});
	},
	onCancleClick : function() {
		this.close();
	}
});

/**
 * ========================================================================
 * 学院信息表单
 */
JW.webware.CollegeInfoFormPanel = Ext.extend(Ext.form.FormPanel, {
	constructor : function() {
		JW.webware.CollegeInfoFormPanel.superclass.constructor.call(this, {
			padding : '5px 0 0 5px',
			labelWidth : 60,
			defaultType : 'textfield',
			border : false,
			items : [{
				fieldLabel : '学院编号',
				anchor : '98%'
			},{
				fieldLabel : '学院名称',
				anchor : '98%'
					
			},{
				xtype : "combo",
				fieldLabel : '隶属部门',
				mode : "local",
				displayField : "section",
				typeAhead : true,
				triggerAction : "all",		
				anchor : '98%',
				hiddenName : "sex",
				mode : "local",
				typeAhead : true,
				maxHeight : 100,
				triggerAction : "all",
				value : "惠州学院",
				store : new Ext.data.SimpleStore({
					fields : [ "section" ],
					data : [ [ "惠州学院" ], [ "其它" ] ]
				})
			}]
		});
	},
	getValues : function() {
		return Ext.data.Record(this.getForm().getValues());
	},
	setValues : function(_r) {
		this.getForm().loadRecord(_r);
	},
	reset : function() {
		this.getForm().reset();
	}
});
/**
 * 添加学院信息窗口
 */
JW.webware.CollegeInfoWindow = Ext.extend(Ext.Window, {
	form : new JW.webware.CollegeInfoFormPanel(),
	constructor : function() {
		JW.webware.CollegeInfoWindow.superclass.constructor.call(this, {
			plain : true,
			title : '添加学院信息',
			width : 300,
			resizable : false,
			items : this.form,
			modal : true,
			closeAction : "hide",
			buttons : [ {
				text : "确 定",
				handler : this.onSubmitClick,
				scope : this
			}, {
				text : "取 消",
				handler : this.onCancleClick,
				scope : this
			} ]
		});
		// this.addEvents("submit");

	},
	close : function() {
		this.form.reset();
		this.hide();
	},
	onSubmitClick : function() {
		// this.fireEvent("submit",this,this.form.getForm().getValues());
		// this.close();
		this.form.getForm().submit({
			url : 'webware/education/college.jxp',
			params : {
				action : 'insert'
			},
			waitMsg : '正在保存数据，请稍候...',
			submitEmptyText : false
		});
	},
	onCancleClick : function() {
		this.close();
	}
});

/**
 * ========================================================================
 * 教师信息表单
 */
JW.webware.TeacherInfoFormPanel = Ext.extend(Ext.form.FormPanel, {
	constructor : function() {
		JW.webware.TeacherInfoFormPanel.superclass.constructor.call(this, {
			padding : '5px 0 0 5px',
			labelWidth : 60,
			defaultType : 'textfield',
			defaults : {
				anchor : "98%"
			},
			border : false,
			items : [{
				fieldLabel : '教师编号'
			},{
				fieldLabel : '教师姓名'
					
			},{
				fieldLabel : '教师职称'
					
			},{
				fieldLabel : '教师职位'
			},{
				fieldLabel : '教师手机'
			},{
				fieldLabel : '固定电话'
			},{
				xtype : "combo",
				fieldLabel : '隶属部门',
				mode : "local",
				displayField : "section",
				typeAhead : true,
				triggerAction : "all",		
				mode : "local",
				typeAhead : true,
				maxHeight : 100,
				triggerAction : "all",
				value : "计算机科学系",
				store : new Ext.data.SimpleStore({
					fields : [ "section" ],
					data : [ [ "计算机科学系" ], [ "数学系" ],["艺术系"] ,["其它"]]
				})
			}]
		});
	},
	getValues : function() {
		return Ext.data.Record(this.getForm().getValues());
	},
	setValues : function(_r) {
		this.getForm().loadRecord(_r);
	},
	reset : function() {
		this.getForm().reset();
	}
});
/**
 * 添加教师信息窗口
 */
JW.webware.TeacherInfoWindow = Ext.extend(Ext.Window, {
	form : new JW.webware.TeacherInfoFormPanel(),
	constructor : function() {
		JW.webware.TeacherInfoWindow.superclass.constructor.call(this, {
			plain : true,
			title : '添加教师信息',
			width : 300,
			resizable : false,
			items : this.form,
			modal : true,
			closeAction : "hide",
			buttons : [ {
				text : "确 定",
				handler : this.onSubmitClick,
				scope : this
			}, {
				text : "取 消",
				handler : this.onCancleClick,
				scope : this
			} ]
		});
		// this.addEvents("submit");

	},
	close : function() {
		this.form.reset();
		this.hide();
	},
	onSubmitClick : function() {
		// this.fireEvent("submit",this,this.form.getForm().getValues());
		// this.close();
		this.form.getForm().submit({
			url : 'webware/education/teacher.jxp',
			params : {
				action : 'insert'
			},
			waitMsg : '正在保存数据，请稍候...',
			submitEmptyText : false
		});
	},
	onCancleClick : function() {
		this.close();
	}
});

/**
 * ========================================================================
 * 学科信息表单
 */
JW.webware.SubjectInfoFormPanel = Ext.extend(Ext.form.FormPanel, {
	constructor : function() {
		JW.webware.SubjectInfoFormPanel.superclass.constructor.call(this, {
			padding : '5px 0 0 5px',
			labelWidth : 60,
			defaultType : 'textfield',
			defaults : {
				anchor : "98%"
			},
			border : false,
			items : [{
				fieldLabel : '学科编号',
				name : 'subjectId'
			},{
				fieldLabel : '学科名称',
				name : 'subjectName'
			},{
				fieldLabel : '上课时间',
				name : 'subjectTime'
			},{
				fieldLabel : '学科学时',
				name : 'subjectPeriod'
			},{
				fieldLabel : '学科学分',
				name : 'subjectCredit'
			},{
				fieldLabel : '上课周数',
				name : 'subjectLasttime'
			},{
				fieldLabel : '测验方式',
				name : 'subjectExam'
			},{
				fieldLabel : '上课班级',
				name : 'subjectClass'
			},{
				fieldLabel : '上课地点',
				name : 'subjectAdd'
			},{
				fieldLabel : '任课教师',
				name : 'subjectTeacher'
			},{
				xtype : "combo",
				fieldLabel : '隶属部门',
				name : 'subjectFather',
				mode : "local",
				displayField : "section",
				typeAhead : true,
				maxHeight : 100,
				triggerAction : "all",		
				value : "计算机科学系",
				store : new Ext.data.SimpleStore({
					fields : [ "section" ],
					data : [ [ "计算机科学系" ], [ "数学系" ],["艺术系"] ,["其它"]]
				})
			},{
				xtype : 'textarea',
				name : 'subjectDesc',
				fieldLabel : '课程描述'
			}]
		});
	},
	getValues : function() {
		return Ext.data.Record(this.getForm().getValues());
	},
	setValues : function(_r) {
		this.getForm().loadRecord(_r);
	},
	reset : function() {
		this.getForm().reset();
	}
});
/**
 * 添加学科信息窗口
 */
JW.webware.SubjectInfoWindow = Ext.extend(Ext.Window, {
	form : new JW.webware.SubjectInfoFormPanel(),
	constructor : function() {
		JW.webware.SubjectInfoWindow.superclass.constructor.call(this, {
			plain : true,
			title : '添加学科信息',
			width : 300,
			resizable : false,
			items : this.form,
			modal : true,
			closeAction : "hide",
			buttons : [ {
				text : "确 定",
				handler : this.onSubmitClick,
				scope : this
			}, {
				text : "取 消",
				handler : this.onCancleClick,
				scope : this
			} ]
		});
		// this.addEvents("submit");

	},
	close : function() {
		this.form.reset();
		this.hide();
	},
	onSubmitClick : function() {
		// this.fireEvent("submit",this,this.form.getForm().getValues());
		// this.close();
		this.form.getForm().submit({
			url : 'webware/education/subject.jxp',
			params : {
				action : 'insert'
			},
			waitMsg : '正在保存数据，请稍候...',
			submitEmptyText : false
		});
	},
	onCancleClick : function() {
		this.close();
	}
});

/**
 * ========================================================================
 * 学生信息表单
 */
JW.webware.StudentInfoFormPanel = Ext.extend(Ext.form.FormPanel, {
	constructor : function() {
		JW.webware.StudentInfoFormPanel.superclass.constructor.call(this, {
//			defaultType : 'textfield',
//			style : 'padding:5px',
			labelWidth:55,
			border : false,
//			plain : true,
			layout : 'form',
			items : [{
				layout : 'column',
				border : false,
				style : 'padding:5px 0 0 5px',
				items : [{
					columnWidth : .5,
					layout : 'form',
					baseCls : 'x-plain',
					labelWidth : 55,
					defaults : {width:155},
					defaultType : 'textfield',
					style : 'text-algin:right',
					items : [{
						fieldLabel : '学号',
						name : ''
					},{
						fieldLabel : '姓名',
						name : ''
					},{
						xtype : "combo",
						fieldLabel : "性别",
						hiddenName : "studentSex",
						mode : "local",
						displayField : "sex",
						typeAhead : true,
						triggerAction : "all",
						value : "男",
						store : new Ext.data.SimpleStore({
							fields : [ "sex" ],
							data : [ [ "男" ], [ "女" ] ]
						})
					},{
						fieldLabel : '民族',
						name : ''
					},{
						fieldLabel : '籍贯',
						name : ''
					},{
						fieldLabel : '出生年月',
						name : ''
					},{
						fieldLabel : '教育程度',
						name : ''
					},{
						xtype : "combo",
						fieldLabel : '所在系',
						name : '',
						mode : "local",
						displayField : "department",
						typeAhead : true,
						maxHeight : 100,
						triggerAction : "all",		
						value : "计算机科学系",
						store : new Ext.data.SimpleStore({
							fields : [ "department" ],
							data : [ [ "计算机科学系" ], [ "数学系" ],["艺术系"],["服装系"],["旅游系"] ,["其它"]]
						})
					},{
						fieldLabel : '所在班级',
						name : ''
					},{
						fieldLabel : '政治面貌',
						name : ''
					}]
				},{
					layout : 'form',
					columnWidth : .5,
					labelWidth : 55,
					baseCls : 'x-plain',
//					border : true,
					items : [{
						xtype : 'panel',
						style : 'margin:0 auto',
						html:'<img src="' + JXP_WEB_CONTEXT + '/webwares/education/1.0.0/js/stuFace.jpg" width=200 height=265 />',
						//fieldLabel : '相片',
						id : 'stuFace',
						width:200,
						height:265
					}]
				}]
			},{
				layout : 'form',
//				border : true,
				baseCls : 'x-plain',
				defaultType : 'textfield',
				defaults : {width : 370},
				style : 'padding:0 0 0 5px',
				items : [{
					fieldLabel : '联系电话'
				},{
					fieldLabel : '身份证号'
				},{
					fieldLabel : '家庭地址' 
				}]
			}]
		});
	},
	getValues : function() {
		return Ext.data.Record(this.getForm().getValues());
	},
	setValues : function(_r) {
		this.getForm().loadRecord(_r);
	},
	reset : function() {
		this.getForm().reset();
	}
});
/**
 * 添加学科信息窗口
 */
JW.webware.StudentInfoWindow = Ext.extend(Ext.Window, {
	form : new JW.webware.StudentInfoFormPanel(),
	constructor : function() {
		JW.webware.StudentInfoWindow.superclass.constructor.call(this, {
			plain : true,
			title : '添加学生信息',
			width : 460,
			resizable : false,
			items : this.form,
			modal : true,
			closeAction : "hide",
			buttons : [ {
				text : "确 定",
				handler : this.onSubmitClick,
				scope : this
			}, {
				text : "取 消",
				handler : this.onCancleClick,
				scope : this
			} ]
		});
		// this.addEvents("submit");
	},
//	show : function(win){
//		win.findById('stuFace').getEl.dom.src="stuFace.jpg";
//	},
	close : function() {
		this.form.reset();
		this.hide();
	},
	onSubmitClick : function() {
		// this.fireEvent("submit",this,this.form.getForm().getValues());
		// this.close();
		this.form.getForm().submit({
			url : 'webware/education/student.jxp',
			params : {
				action : 'insert'
			},
			waitMsg : '正在保存数据，请稍候...',
			submitEmptyText : false
		});
	},
	onCancleClick : function() {
		this.close();
	}
});