/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');


JW.webware.Applypanel = function(config) {
	Ext.apply(this,config);
	var dr = new Ext.data.Record.create([{
		name : 'name',type : "string"
	}, {
		name : 'sex',type : "string"
	}, {
		name : 'age',type : "string"
	},{
		name : 'score',type : "string"
    }, {
	    name : 'email',type : "string"
	}, {
		name : 'phone',type : "int"
    }, {
	    name : 'mark',type : "string"
    }]);
	var reader = new Ext.data.XmlReader( {
		record :'applydata'	
	}, dr);
	var ds = new Ext.data.Store( {
		url : JXP_WEB_CONTEXT+'/webwares/student/1.0.0/xml/apply.xml',
		reader : reader,
		autoLoad:true
	    
	});
	var pagingBar = new Z.ux.PagingToolbarCN({
		pageSize: 10,
        displayInfo: true,
        store:ds,
        emptyMsg : '没有数据' 
    });
	var gridbuffer =  new Ext.ux.grid.BufferView({
		    // custom row height
		    rowHeight: 25,
		    // render rows as they come into viewable area.
		    scrollDelay: false
	});  
	var sm = new Ext.grid.CheckboxSelectionModel();
	///////////////////////////////////////////////////////
	JW.webware.Applypanel.superclass.constructor.call(this, {
		store: ds,
		columns: [sm,
		            {id:'1',header: "学生姓名",sortable: true, dataIndex: 'name'},
		            {id:'2',header: "性别", width:40,sortable: true, dataIndex: 'sex'},
		            {id:'3',header: "年龄", width:40,sortable: true, dataIndex: 'age'},
		            {id:'4',header: "总成绩", width:60,sortable: true, dataIndex: 'score'},
		            {id:'5',header: "邮箱", width:180,sortable: true, dataIndex: 'email'},
		            {id:'6',header: "电话", width: 80, sortable: true, dataIndex: 'phone'},
		            {id:'7',header: "是否已批", width: 60, sortable: true, dataIndex: 'mark'}
		            
		        ],
		        trackMouseOver: true,
		        enableHdMenu:false,
		        autoExpandColumn: '1',
		        sm : sm,
		        tbar:[{text:'清除记录',
		        	   cale: 'big',
                       iconCls: 'icon-delete',
                       iconAlign: 'left',
                       listeners : {            	            		
      	                   click : function() {
		        	               
		                   }
                       }
		        }],
		        bbar: pagingBar,
		        view:gridbuffer
		       
		
	});
};


Ext.extend(JW.webware.Applypanel, Ext.grid.GridPanel, {
	
});