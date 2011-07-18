
JW.webware.AllteachersPanel=function(config){
	JW.webware.AllteachersPanel.superclass.constructor.call(this,{
		id : 'Allteachers',
		title:"所有教师",
//		closable : true,
		autoheight:true,
		width : 690,
		height : 450,
		items:new JW.webware.TeacherGridPanel()
 	});  
};
   
Ext.extend(JW.webware.AllteachersPanel,Ext.Panel,{});
//*********************************************************************
JW.webware.TeacherGridPanel = function(config) {
	var thisGrid = this;
	this.insertWin=new JW.webware.TeacherInfoWindow();
	var teachers = new Ext.data.Record.create([ {
		name : 'teacherId',
		type : "int"
	}, {
		name : 'teacherName',
		type : "string"
	}, {
		name : 'teacherTitle',
		type : "string"
	}, {
		name : 'teacherPost',
		type : 'string'
	},{
		name : 'departmentName',
		type : 'string'
	},{
		name : 'teacherTel',
		type : 'string'
	},{
		name : 'teacherPhone',
		type : 'string'
	}]);
	
	// 定义分析器
	var reader = new Ext.data.XmlReader( {
		//totalProperty : "results",
		record :'teachers'
		
	}, teachers);

	// 定义store
	var ds = new Ext.data.Store( {
		url : JXP_WEB_CONTEXT+'/webwares/education/1.0.0/xml/teacher.xml',
		reader : reader,
		autoLoad:true
	    
	});
  
	// cm,grid

	var cm = new Ext.grid.ColumnModel( {
		defaultSortable : true,
		defaultWidth : 100,
		columns : [ {
			id:'teacherId',
			header : '教师编号',
			dataIndex : 'teacherId'
		}, {
			header: "教师姓名",
	        dataIndex: 'teacherName'
		}, {
			header: "教师职称",
	        dataIndex: 'teacherTitle'
				
		},{
			 header: "教师职位",
	         dataIndex: 'teacherPost'
		}, {
			header: "所在院系",
	        dataIndex: 'departmentName'
		}, {
			header: "家庭电话",
	        dataIndex: 'teacherTel'
		}, {
			header: "手机",
	        dataIndex: 'teacherPhone'
		}]
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
	JW.webware.TeacherGridPanel.superclass.constructor.call(this, {
		
		cm : cm,
		sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
		store : ds,
		layout : 'fit',
		width : 690,
		height : 450,
		border : false,
		bbar:pagingBar,
		loadMask:{msg:'正在载入数据,请稍等...'},
		title : '教师列表'

	});
};
Ext.extend(JW.webware.TeacherGridPanel, Ext.grid.GridPanel, {
        insertWin:null
});