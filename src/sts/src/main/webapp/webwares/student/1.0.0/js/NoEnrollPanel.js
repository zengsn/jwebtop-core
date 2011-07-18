/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');


JW.webware.NoEnrollpanel = function(config) {
	Ext.apply(this,config);
	var dr = new Ext.data.Record.create([{
		name : 'sid',type : "string"
	}, {
		name : 'name',type : "string"
	}, {
	    name : 'email',type : "string"
	}, {
		name : 'phone',type : "int"
    }, {
		name : 'reason',type : "string"
    }, {
		name: 'time', type: 'date', dateFormat: 'n/j h:ia'
	}]);
	var reader = new Ext.data.XmlReader( {
		record :'noenrolldata'	
	}, dr);
	var ds = new Ext.data.Store( {
		url : JXP_WEB_CONTEXT+'/webwares/student/1.0.0/xml/noenroll.xml',
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
	JW.webware.NoEnrollpanel.superclass.constructor.call(this, {
		store: ds,
		columns: [sm,
		            {id:'1',header: "学号",sortable: true, dataIndex: 'sid'},
		            {id:'2',header: "姓名",width:50,sortable: true, dataIndex: 'name'},
		            {id:'3',header: "邮箱", width:130,sortable: true, dataIndex: 'email'},
		            {id:'4',header: "电话", width: 70, sortable: true, dataIndex: 'phone'},
		            {id:'5',header: "原因", width:80,sortable: true, dataIndex: 'reason'},
		            {id:'6',header: "操作时间", width:70,sortable: true, renderer: Ext.util.Format.dateRenderer('Y/m/d'), dataIndex: 'time'}
		
		            
		        ],
		        trackMouseOver: true,
		        enableHdMenu:false,
		        autoExpandColumn: '1',
		        sm : sm,
		        tbar:[{text:'清除记录',
		        	   cale: 'big',
                       iconCls: 'icon-delete',
                       iconAlign: 'left',
                       handler:Ext.emptyFn
		              }],
		        bbar: pagingBar,
		        view:gridbuffer
		       
		
	});
};


Ext.extend(JW.webware.NoEnrollpanel, Ext.grid.GridPanel, {
	
});