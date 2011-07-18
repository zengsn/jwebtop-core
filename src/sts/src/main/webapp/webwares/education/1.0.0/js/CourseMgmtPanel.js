Ext.namespace("JW","JW.webware");
JW.webware.CourseMgmtPanel=function(config){
	thisGrid = this;
	config = config || {};
	config = Ext.applyIf(config, {
	   //renderTo:'container',
	   id:'panel-coursemgmt',
	   closable:true,
	   title:"学科管理",
	   width:800,
	   height:500,
	   layout:'fit',
	   items:new JW.webware.CourseMgmtGridPanel()
   });
	Ext.apply(this, config);
	JW.webware.CourseMgmtPanel.superclass.constructor.call(this,arguments);
};
Ext.extend(JW.webware.CourseMgmtPanel,Ext.Panel,{});
//***********************************************************

//************************************************************   
JW.webware.CourseMgmtGridPanel=function(config){
	thisGrid = this;
	config = config || {};
	  var expander = new Ext.ux.grid.RowExpander({
        tpl : new Ext.Template(
            '<p><b>学科:</b> {courseName}</p><br>',
            '<p><b>详细信息:</b> {descripe}</p>'
        )
    });
		var store = new Ext.data.Store({
		autoLoad:true,	
        url: './course.xml',
        //baseParams: {action: 'list'},
        reader: new Ext.data.XmlReader({
               record: 'Course',
               id: 'id',
               totalRecords: 'totalCount'
           }, [
               {name: 'courseId', type: 'int'},
               {name: 'courseName'},
               {name: 'period'},
               {name: 'periodScore'},
               {name: 'courseTeacher'},
               {name:'descripe'},
               {name:'createdTime'}
              
           ])
    });
	config = Ext.applyIf(config,{
		//renderTo:document.body,
        store: store,
        
        cm: new Ext.grid.ColumnModel({
            defaults: {
                width: 150,
                sortable: true
            },
            columns: [
                expander,
                {header: "学科编号", dataIndex: 'courseId'},
                {header: "学科名称",dataIndex: 'courseName'},
                {header: "学时", dataIndex: 'period'},
                {header: "学分", dataIndex: 'periodScore'},
                {header: "讲师", dataIndex: 'courseTeacher'},
                {header: "创建时间",  dataIndex: 'createdTime'}
            ]
        }),
        viewConfig: {
            forceFit:true
        },        
        width: 600,
        height: 300,
        plugins: expander,
        //collapsible: true,
        animCollapse: false,
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
       
    });
	Ext.apply(this, config);
	JW.webware.CourseMgmtGridPanel.superclass.constructor.call(this,arguments);
};
Ext.extend(JW.webware.CourseMgmtGridPanel,Ext.grid.GridPanel,{});