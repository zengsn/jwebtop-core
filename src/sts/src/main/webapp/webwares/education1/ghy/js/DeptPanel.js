
JW.webware.DeptPanel=function(config){
	JW.webware.DeptPanel.superclass.constructor.call(this,{
	   title:"学院管理",
	   width:660,
	   autoheight:true,
	   //id:"dept"
	  items:new JW.webware.DeptGridPanel()
   });
};
   
   
   Ext.extend(JW.webware.DeptPanel,Ext.Panel,{});
//*********************************************************************
JW.webware.DeptGridPanel = function(config) {
	var thisGrid = this;
	this.insertWin=new DepartmentInfoWindow();
	var Departments = new Ext.data.Record.create([ {
		name : 'departmentId',
		type : "int"
	}, {
		name : 'departmentName',
		type : "string"
	}, {
		name : 'assistant',
		type : "string"
	}, {
		name : 'telephone',
		type : 'int'
	}]);

	// 定义分析器
	var reader = new Ext.data.XmlReader( {
		//totalProperty : "results",
		record :'department'
		
	}, Departments);

	// 定义store
	var ds = new Ext.data.Store( {
		url : JXP_WEB_CONTEXT+'/webwares/education/1.0.0/js/departments.xml',
		reader : reader,
		autoLoad:true
	    
	});
  
	// cm,grid

	var cm = new Ext.grid.ColumnModel( {
		defaultSortable : true,
		defaultWidth : 100,
		columns : [ {
			id:'departmentId',
			header : '院系代号',
			dataIndex : 'departmentId'
		}, {
			header: "系名",
	        dataIndex: 'departmentName'
		}, {
			header: "辅导员",
	        dataIndex: 'assistant'
				
		},{
			 header: "联系电话",
	         dataIndex: 'telephone'
		}]
	});
	
	
  var pagingBar = new Ext.PagingToolbar({
        pageSize: 4,
        store: ds,
        displayInfo: true,
        displayMsg: '共有 {2}，当前显示 {0} - {1}条',
        emptyMsg: "没有数据",
        items:[{ 	
        text:"添加",
        handler:function(){
        thisGrid.insertWin.show();
        }	
        },{
        text:"修改"
        },{
    	text:"删除",
    //  iconCls:'icon-delete',
     //iconAlign: 'top',
    	width:50
    		//scale: 'large'
    	    }]
    });

  
	  
 
	
	// tbar分页,工具栏
	JW.webware.DeptGridPanel.superclass.constructor.call(this, {
		
		cm : cm,
		sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
//		tbar:[{
//		text:"添加",
//		handler:function(){
//		this.insertWin.show();
//	    },
//	    scope:this,
//		iconCls:'icon-add',
//		iconAlign: 'top',
//		width:50
//		
//		},"-",{
//	    text:"修改",
//	    iconCls:'icon-alter',
//		iconAlign: 'top',
//		width:50,
//		scale: 'large'
//	    },"-",{
//		text:"删除",
//		iconCls:'icon-delete',
//		iconAlign: 'top',
//		width:50,
//		scale: 'large'
//	    }],
		store : ds,
		width : 660,
		height : 420,
		bbar:pagingBar,
		loadMask:{msg:'正在载入数据,请稍等...'},
		title : '院系列表'
	});
	
};
Ext.extend(JW.webware.DeptGridPanel, Ext.grid.GridPanel, {
        insertWin:null
	
});

//*********************************************************************





