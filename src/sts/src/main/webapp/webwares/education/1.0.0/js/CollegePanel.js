

Ext.namespace("JW","JW.webware");

/**
 * User management grid.
 */
JW.webware.CollegePanel=function(config){
	thisGrid = this;
	config = config || {};
	config = Ext.applyIf(config, {
	   //renderTo:'container',
	   id:'panel-college',
	   closable:true,
	   title:"学院管理",
	   width:800,
	   height:500,
	   layout:'fit',
	   items:new JW.webware.CollegeMgmtGridPanel()
   });
	Ext.apply(this, config);
	JW.webware.CollegePanel.superclass.constructor.call(this,arguments);
};
Ext.extend(JW.webware.CollegePanel,Ext.Panel,{});
JW.webware.CollegeMgmtGridPanel = function(config) {
	// Local variable
	thisGrid = this;
	//this.userFormWindow;
	// Avoid null
	config = config || {};
	var store = new Ext.data.Store({
        url: 'college.jxp',
        baseParams: {action: 'list'},
        reader: new Ext.data.XmlReader({
               record: 'College',
               id: 'id',
               totalRecords: 'totalCount'
           }, [
               {name: 'collegId'},
               {name: 'collegename'},
               {name: 'collegeMaster'},
               {name: 'createdTime'}
              
           ])
    });
	var searchRenderer = function(value, metaData, record, rowIndex, colIndex, store) {
		var q = store.baseParams['q'];
		if (q) {
			return value.replace(q, '<b><font color="red">'+q+'</font></b>');
		}
		return value;
	};
	//var Plant = grid.getStore().recordType;
	var sm = new Ext.grid.CheckboxSelectionModel();

	// Config - 以下是定制界面的具体配置
	config = Ext.applyIf(config, {
		id:'collegegrid',
		viewConfig:{
	        forceFit: true
	      },
		//title: '学院管理',          
		store: store,
        sm: sm,
        //frame:true,
        columnLines: true,
        iconCls:'user',
        cm: new Ext.grid.ColumnModel({
            defaults: {
                width: 200,
                sortable: true
            },
            columns: [
                sm,
                //{id:'uid',header: "ID", width: 200, dataIndex: 'uid'},
                {header: "学院代码",width: 160, dataIndex: 'collegeId',align:'center'}, 
                {header: "学院名称", width: 160, dataIndex: 'collegeName', renderer: searchRenderer,align:'center'},
                {header: "学院校长", width: 160, dataIndex: 'collegeMaster',align:'center'},
                {header: "创建时间", dataIndex: 'collegeTime'}
              
            ]
        }),
        bbar: new Z.ux.PagingToolbarCN({
        	store: store,
            pageSize: 50,
            displayInfo: true,
            items: ['-', {
            	text: '创建',
            	iconCls: 'user-add',
            	handler: function(btn) {
	            	if (!(thisGrid.collegeFormWindow)) {
	            		thisGrid.collegeFormWindow = new JW.webware.CollegeEditFormWindow({
	            			height:150,
	            			title: '创建学院',
	            			grid: thisGrid
	            		});
	            	}
	            	thisGrid.collegeFormWindow.show(btn);
	            }
            }, '-', {
            	text: '编辑',
            	iconCls: 'user-edit',
            	handler: function(btn) {
            		var count = sm.getCount();
            		if (count ==0) {
            			Ext.Msg.alert('错误', '请选择一个网点进行学院！');
            		} else if (count > 1) {
            			Ext.Msg.alert('错误', '不能同时编辑多个学院！');
            		} else {
    	            	if (!(thisGrid.collegeFormWindow)) {
    	            		thisGrid.collegeFormWindow = new JW.webware.SiteEditFormWindow({
    	            			title: '编辑学院',
    	            			iconCls: 'user-edit',
    	            			grid: thisGrid,
    	            			cid: sm.getSelected().data.id
    	            		});
    	            	}
    	            	thisGrid.collegeFormWindow.show(btn);
            		}
            	}
            }, '-', {
            	text: '删除',
            	iconCls: 'user-delete',
            	handler: function(btn) {
            		var count = sm.getCount();
            		if (count ==0) {
            			Ext.Msg.alert('错误', '请至少选择一个学院进行删除！');
            		} else {
            			Ext.Msg.confirm('确认', '确定删除所选学院？', function(btn) {
            				if (btn == 'yes') {
            					var selections = sm.getSelections();
            					var ids = '';
            					for(var i=0; i<selections.length; i++) {
            						ids += selections[i].data.id + ',';
            					}
            					Ext.Ajax.request({
            						url: 'college.jxp',
	            						success: function(response, opts) {
	            						var obj = Ext.decode(response.responseText);
	            						//console.dir(obj);
	            						Ext.Msg.alert('成功', '所选学院已删除！');
	            						//thisGrid.getStore().load({params:{start:0,limit:50}});
	            						Ext.getCmp('collegegrid').getStore().load({params:{start:0,limit:50}});
	            					},
	            					failure: function(response, opts) {
	            						//console.log('server-cide failure with status code ' + response.status);
	            					},
	            					headers: {
	            						'power-by': 'zsn.cc'
	            					},
	            					params: {
	            						action: 'delete',
	            						id: ids
	            					}
        						});
            				}
            			});
            		}
            	}
            }, '-', '过滤', new Ext.app.SearchField({
                width:240,
				store: store,
				paramName: 'q'
            })]
        }),
        listeners: {
			'show': function(){
				store.load({params:{start:0,limit:50}});
			}
		}
	});
	Ext.apply(this, config);
	
    // Constructor
	JW.webware.CollegeMgmtGridPanel.superclass.constructor.apply(this, arguments);
};

Ext.extend(JW.webware.CollegeMgmtGridPanel, Ext.grid.GridPanel, {
});
Ext.reg('collegemgmtgridpanel', JW.webware.CollegeMgmtGridPanel);

/**
 * Site edit form window.
 */
JW.webware.CollegeEditFormWindow = function(config){
	// Local variable
	thisWin = this;
	// Avoid null
	config = config || {};
	//this.grid = config.grid;
	var parentGrid = config.grid;
	var cid = config.cid;
	this.collegeForm = new Ext.form.FormPanel({      
        labelAlign: 'right',
        labelWidth: 60,
        action : 'save',
        width:340,
        bodyStyle: 'padding:5px;',
        waitMsgTarget: true,

        // configure how to read the XML Data
        reader :  new Ext.data.XmlReader({
            record: 'College',
            id: 'id',
            totalRecords: 'totalCount'
        }, [
            {name: 'collegeId'},
            {name: 'collegeName'},
            {name: 'collegeMaster'},
            {name: 'createdTime'}
           
        ]),

        // reusable eror reader class defined at the end of this file
        //errorReader: new Ext.form.XmlErrorReader(),
        
        defaultType: 'textfield',
        defaults: {width: 200},
        items: [{
        	xtype: cid ? 'textfield' : 'hidden',
        	disabled: true,
        	fieldLabel: 'ID',
        	name: '序号'
        }, {
        	fieldLabel:'学院代码',
        	emptyText:'学院代码',
            name: 'collegeId',
            anchor: '90%',
            allowBlank:false
        },{
        	fieldLabel:'学院名称',
        	emptyText:'学院名称',
            name: 'collegeName',
            anchor: '90%',
            allowBlank:false
        }, {
        	fieldLabel:'学院校长',
        	emptyText:'学院校长',
            name: 'collegeMaster',
            anchor: '90%',
            allowBlank:false
        }]

	});
	// Config - 以下是定制界面的具体配置
	config = Ext.applyIf(config, {
		title: '学院管理',
		layout: 'fit',                
		width:300,
        height:100,
		iconCls: 'user-add',
        closeAction:'hide',
        plain: true,
        border: false,
		items: this.collegeForm,
		buttons: [{
			text: '确定',
			handler: function() {
				var form = thisWin.collegeForm.getForm();
				form.submit({    
					clientValidation: true,
				    url: 'college.jxp',
				    params: {
				        action: 'add'
				    },
				    success: function(form, action) {
				       //Ext.Msg.alert('Success', action.result.msg);
				    	Ext.Msg.alert('成功', '新学院已创建！');
						parentGrid.collegeFormWindow.close();
						parentGrid.collegeFormWindow = undefined;
						//parentGrid.getStore().load({params:{start:0,limit:50}});
						Ext.getCmp('collegegrid').getStore().load({params:{start:0,limit:50}});
				    },
				    failure: function(form, action) {
				        switch (action.failureType) {
				            case Ext.form.Action.CLIENT_INVALID:
				                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
				                break;
				            case Ext.form.Action.CONNECT_FAILURE:
				                Ext.Msg.alert('Failure', 'Ajax communication failed');
				                break;
				            case Ext.form.Action.SERVER_INVALID:
				               Ext.Msg.alert('Failure', action.result.msg);
				       }
				    }					
				});
			}
		}, {
			text: '取消',
			handler: function() {
				parentGrid.collegeFormWindow.close();
				parentGrid.collegeFormWindow = undefined;
			}
		}]
	});
	Ext.apply(this, config);
	
    // Constructor
	JW.webware.CollegeEditFormWindow.superclass.constructor.apply(this, arguments);
	
	// Load for edit
	if (cid) {
		var form = thisWin.collegeForm.getForm();
		form.load({
		    url: 'college.jxp',
		    params: {
		        action: 'load',
		        id: cid
		    },
		    //success: function(form, action) {
		       //Ext.Msg.alert('Success', action.result.msg);
		    //},
		    failure: function(form, action) {
		        switch (action.failureType) {
		            case Ext.form.Action.CLIENT_INVALID:
		                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
		                break;
		            case Ext.form.Action.CONNECT_FAILURE:
		                Ext.Msg.alert('Failure', 'Ajax communication failed');
		                break;
		            case Ext.form.Action.SERVER_INVALID:
		               Ext.Msg.alert('Failure', action.result.msg);
		       }
		    }				
		});
	}
};

Ext.extend(JW.webware.CollegeEditFormWindow, Ext.Window, {
});
Ext.reg('collegeeditformwindow', JW.webware.CollegeEditFormWindow);