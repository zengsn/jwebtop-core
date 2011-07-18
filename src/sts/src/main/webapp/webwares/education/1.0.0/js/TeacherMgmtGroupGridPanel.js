Ext.namespace('JW', 'JW.webware');
JW.webware.TeacherMgmtPanel=function(config){
	thisGrid = this;
	config = config || {};
	config = Ext.applyIf(config, {
	   id:'panel-teachermgmtgroup',	
	   title:'教师管理',
	   closable:true,
	   width:800,
	   height:500,
	   layout:'fit',
	   items:new JW.webware.TeacherMgmtGroupGridPanel()
   });
	Ext.apply(this, config);
	JW.webware.TeacherMgmtPanel.superclass.constructor.call(this,arguments);
};
Ext.extend(JW.webware.TeacherMgmtPanel,Ext.Panel,{});
//************************************************
JW.webware.TeacherMgmtGroupGridPanel=function(config){
	thisPanel=this;
	config = config || {};
	var sexRenderer = function(val) {
		if (val == "男") {
			return "<span style='color:green;font-weight:bold;'>男</span><img src='./webwares/education/1.0.0/images/user_suit.png'/>"; 
		} else if (val =="女") {
			return "<span style='color:red;font-weight:bold;'>女</span><img src='./webwares/education/1.0.0/images/user_female.png'/>"; 
		} 
	};
	var store = new Ext.data.GroupingStore({
		autoLoad: true,
		//url: 'teacher.jxp',
		url: './teachers.xml',
		success: '@success',
//		baseParams: {
//			action: 'list',
//			start: 0,
//			limit: 50
//		},
		reader: new Ext.data.XmlReader({
			record: 'Teacher',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    {name:'id'}, 
		    {name:'teacherName'},
		    {name:'position'},
		    {name:'sex'},
		    {name:'department'}, 
		    {name:'telePhone'},
		    {name:'createdTime'}
		    
		]),
		groupField:'sex'  
    });
	var cm = new Ext.grid.ColumnModel( {
		defaultSortable : true,
		defaultWidth : 100,
	
		columns : [ 
	     {
			header : "职工号",
			dataIndex : 'id',
			width:120
		},{
		    header :"教师名",
			dataIndex : 'teacherName'
		},{
			header : "职称",
			dataIndex : 'position',
			width:120

		},{
			header : "性别",
			dataIndex : 'sex',
			width:120,
			renderer:sexRenderer

		},{
			header : "所属系",
			dataIndex : 'department',
			width:120

		},{
			header : "联系电话",
			dataIndex : 'telePhone',
			width:120

		},{
			header : "入职时间",
			dataIndex : 'createdTime',
			width:120

		}]
	});

	config = Ext.applyIf(config, {
		//renderTo:'container',
		//id:'grid-devicegroup',
		store: store,
		width:500,
		height:400,  
		cm:cm,                  
		view: new Ext.grid.GroupingView({
	            forceFit:true,
	            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	     }),
		bbar: new Z.ux.PagingToolbarCN({
            pageSize: 50,
            displayInfo: true,
            store: store,
            buttons:[{
            text:'添加',
            iconCls:'user-add'
            },{
            text:'修改',
            iconCls:'user-edit'
            },{
            text:'删除',
            iconCls:'user-delete'
            }]
		}),
		loadMask: {msg:'正在载入数据,请稍等...'}
//		,
//		 listeners: {
//			'show' : function(){
//				store.load({params:{start:0,limit:50}});
//			}
//		}
 
		
	});
	Ext.apply(this, config);
	JW.webware.TeacherMgmtGroupGridPanel.superclass.constructor.apply(this, arguments);
};
Ext.extend(JW.webware.TeacherMgmtGroupGridPanel, Ext.grid.GridPanel, {});
Ext.reg('teachermgmtgroupgridpanel', JW.webware.TeacherMgmtGroupGridPanel);