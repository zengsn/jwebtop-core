/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

/**
 * 招生工作。
 * @param config
 */
JW.webware.AdmissionsPanel = function(config) {
	var grid1 = new JW.webware.Applypanel({id:'apply'});
	var grid2 = new JW.webware.Enrollpanel({id:'enroll'});
	var grid3 = new JW.webware.NoEnrollpanel({id:'noenroll'});
	var inner ={};
	JW.webware.AdmissionsPanel.superclass.constructor.call(this, {
		id:'admissions-panel', 
		layout: 'border',
        defaults: {
            collapsible: true,
            split: true
        },
        items: [
        {
            region: 'east',
            title:'功能栏',
            xtype:'panel',
            border: false,
            defaultType:'button',
            defaults:{width:178,
        	style: {  
            marginTop: '1px',
            marginBottom: '12px',
		    marginLeft:'2px',
		    marginRight:'2px'
            },scale: 'medium'},
            items: [{
                xtype: 'datepicker'
            },{text:'录 取',
               handler:function(){

                var a = new Ext.Window({
                       title:"录取工作",
                       resizable : false, 
                       width:450,
                       height:320,                
                       plain:true,
                       layout:"form",
                       labelWidth:70,
                       defaultType:"textfield",
                       items:[{
                          xtype:"panel",
                          baseCls:"x-plain",
                          style:"padding:5px",
                          items:[{
                              layout:"form",
                              labelWidth:66,
                              defaultType:"textfield",
                              defaults:{width:330,
                                        allowBlank: false,
                                        itemCls: '输入不能为空'},
                              baseCls:"x-plain",
                              items:[{
                  		        fieldLabel:"学号"
                  		    },{
                  		        fieldLabel:"学生姓名"
                  		    },{
                  		        fieldLabel:"年龄",
                  		        value:23,
                  		        readOnly:true
                  		    },{
                      		    xtype:"datefield",
                      		    format:"Y-m-d",
                      		    value:"1989-09-03",
                      		    value:new Date(),
                      		    //readOnly:true,
                  		        fieldLabel:"出生日期",
                  		        listeners:{
                  		           "blur":function(_df){

                		                   var _age = _df.ownerCt.findByType("textfield")[1];
                		                   _age.setValue(new Date().getFullYear() - _df.getValue().getFullYear() + 1);

                  		             }
                  		        }
                  		    },{
                  		        fieldLabel:"联系电话"
                  		    },{
                  		        fieldLabel:"电子邮箱"
                  		    },{
                      		    xtype:"combo",
                  		        fieldLabel:"性别",
                  		        mode : "local",
                  		        displayField:"sex",
                  		        //readOnly:true,
                  		        //writerable:false,
                  		        triggerAction:"all",
                  		        value:"男",
                  		        store: new Ext.data.SimpleStore({
                                                  fields:["sex"],
                                                  data: [["男"],["女"]]
                  	             		        })
                  		   },{
                      		    xtype:"combo",
                  		        fieldLabel:"评价",
                  		        mode : "local",
                  		        displayField:"Evaluation",
                  		        //readOnly:true,
                  		        //writerable:false,
                  		        triggerAction:"all",
                  		        value:"A",
                  		        store: new Ext.data.SimpleStore({
                                                  fields:["Evaluation"],
                                                  data: [["A"],["B"],["C"]]
                  	             		        })
                  		},{
                         xtype:'datefield',
                         format:'Y-m-d',
                         value:new Date(),
                         //readOnly:true,
                         fieldLabel:'录取时间',
                         itemCls:'输入不能为空'
                         }]
                              }] 
                       }],
                         buttons:[{
                                text:"确定"
                             },{
                                text:"取消"
                         }]
                }).show();}
            },{text:'不录取',
               handler:function(){

                new Ext.Window({
                       title:"不录取",
                       resizable : false, 
                       width:450,
                       height:300,                
                       plain:true,
                       layout:"form",
                       labelWidth:70,
                       defaultType:"textfield",
                       items:[{
                          xtype:"panel",
                          baseCls:"x-plain",
                          style:"padding:5px",
                          items:[{
                              layout:"form",
                              labelWidth:66,
                              defaultType:"textfield",
                              defaults:{width:330,
                                        allowBlank: false,
                                        itemCls: '输入不能为空'},
                              baseCls:"x-plain",
                              items:[{
                  		        fieldLabel:"学生姓名",
                  		        itemCls: '输入不能为空'
                  		    },{
                  		        fieldLabel:"电子邮箱"
                  		    },{
                  		        fieldLabel:"手机号码"
                  		    },{
                  		    	xtype:'textarea',
                  		    	fieldLabel:'不录取原因',
                  		    	height:'110'
                  		    },{
                         xtype:'datefield',
                         format:'Y-m-d',
                         value:new Date(),
                         //readOnly:true,
                         fieldLabel:'操作时间',
                         itemCls:'输入不能为空'
                         }]
                              }] 
                       }],
                         buttons:[{
                                text:"确定"
                             },{
                                text:"取消"
                         }]
                }).show();
            }
           },
            {xtype:'panel',
               title:'详细说明',
            	height:111,
                bodyStyle: 'padding-bottom:15px',
        		autoScroll: true,
        		html:'<p>点击录取按钮实现录取功能</p></br><p>点击不录取按钮实现不录取功能</p>'}],	
                width: 181
        },{
            region: 'center',
            xtype:'tabpanel',
            items:[{
            	title:'已申请的学生',
            	layout:'fit',
            	items:[grid1]
            
            },{
            	title:'已录取',
            	layout:'fit',
            	items:[grid2]
            	
            },{
            	title:'不录取',   	
            	layout:'fit',
            	items:[grid3]
            }],
            activeItem:0,
            collapsible: false
        }]
	});
	
};
Ext.extend(JW.webware.AdmissionsPanel, Ext.Panel, {
	
});