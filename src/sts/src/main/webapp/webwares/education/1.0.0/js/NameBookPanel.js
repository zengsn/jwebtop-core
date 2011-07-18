

Ext.namespace('JW', 'JW.webware');
JW.webware.NameBookPanel=function(config){
	thisGrid = this;
	config = config || {};
	config = Ext.applyIf(config, {
	   id:'panel-namebook',	
	   title:'点名册',
	   closable:true,
	   width:800,
	   height:500,
	   layout:'fit',
	   items:new JW.webware.NameBookGridPanel()
   });
	Ext.apply(this, config);
	JW.webware.NameBookPanel.superclass.constructor.call(this,arguments);
};
Ext.extend(JW.webware.NameBookPanel,Ext.Panel,{});
JW.webware.NameBookGridPanel = function(config) {
	// Local variable
	thisPanel = this;
	// Avoid null
	config = config || {};

	var sm=new Ext.grid.CheckboxSelectionModel(); 
	
	var checkColumn = new Ext.grid.CheckColumn( {
		header : '是否缺席',
		dataIndex : 'absent'

	});
	var sm=new Ext.grid.CheckboxSelectionModel();

	var rn=new Ext.grid.RowNumberer();
	var cm = new Ext.grid.ColumnModel( {
		defaultSortable : true,
		defaultWidth : 100,
		columns : [
		    rn,       
		    sm,{
			header : '课程名',
			dataIndex : 'courseName'
		},{
			header : '班级',
			dataIndex : 'classes'
		},{
			header : '学号',
			dataIndex : 'id'
		}, {
			header : "姓名",
			dataIndex : 'name'
		}, checkColumn , {
			header : "备注",
			dataIndex : 'remarks'

		}]
	});

	var store = new Ext.data.Store( {
		url : 'namebook.jxp',
		baseParams: {
			action: 'list',
			start: 0,
			limit: 50
		},
		reader :  new Ext.data.XmlReader({
			record: 'seventhnetwork',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    {name:'courseName'},
		    {name:'class'},
		    {name:'id'}, 
		    {name:'name'}, 
		    {name:'absent'},
		    {name: 'remarks'}
		   
		    ]),
		listeners:{'show':function(){
		store.load({start:0,limit:50});
		}}
		
		//autoLoad : true

	});

	
	config = Ext.applyIf(config, {
	   viewConfig:{
	      forceFit: true
	        },
	    //renderTo:'container',    
		plugins: checkColumn,
		sm:sm,
		cm: cm,
		store: store,
		width: 660,
		height: 400,
		bbar: new Z.ux.PagingToolbarCN({
            pageSize: 50,
            displayInfo: true,
            store: store,
            buttons:[{
            text:'导出',
            iconCls:'export'
            },{
            text:'保存',
            iconCls:'save'
            }]
		}),
		loadMask: {msg:'正在载入数据,请稍等...'}
		
	});
	Ext.apply(this, config);
	
    // Constructor
	JW.webware.NameBookGridPanel.superclass.constructor.apply(this, arguments);
};

Ext.extend(JW.webware.NameBookGridPanel, Ext.grid.GridPanel, {
});
Ext.reg('namebookgridpanel', JW.webware.NameBookGridPanel);