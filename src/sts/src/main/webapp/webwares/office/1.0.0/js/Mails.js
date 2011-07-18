/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');
JW.webware.MailsPanel=function(config){
	this.id=config.id;
	var sm = new Ext.grid.CheckboxSelectionModel();  // add checkbox column
	var email_store = new Ext.data.Store({		           
		proxy: new Ext.data.HttpProxy(new Ext.data.Connection({ url: './email.jxp', timeout: 1200000, method:'POST' })),
		baseParams: {
			action: 'inbox',
			start: 0,
			limit: 25
		},
		reader: new Ext.data.JsonReader({
            root: 'mails'
			}, [{name: 'mailId', type:'string'},{name:'sender', type:'string'}, {name:'theme', type:'string'}, 
			    {name:'time', type:'string'}, {name:'content', type:'string'}, {name:'files', type:'string'}]
			),
		listeners:{
			datachanged:function(store){
				//var today;
				//alert(today = new Date().clearTime());
				//alert(today.add(Date.DAY, -20).add(Date.HOUR, 10));
				alert(store);
			}
		}
    });

	var emailSetting_store = new Ext.data.Store({
		autoLoad:true,
		url: './email.jxp',
		method:'post',
		baseParams: {
			action: 'load',
			start: 0,
			limit: 25
		},
		reader: new Ext.data.JsonReader({
		    root: 'emailSetting'
		    },[{name:'id', type:'string'},{name:'name',type:'string'},{name:'emailAddress',type:'string'},
		      {name:'decription',type:'string'},{name:'active',type:'string'},{name:'password', type:'string'},
		      {name:'popService',type:'string'},{name:'smtpService',type:'string'}]
		)
		
	});
    
	var emailSelect_store = new Ext.data.Store({
		url: './email.jxp',
		method:'post',
		baseParams: {
			action: 'emailSelect',
			start: 0,
			limit: 25
		},
		reader: new Ext.data.JsonReader({
		    root: 'emailSelect'
		    },[{name:'emailId',type:'integer'},{name:'emailAddress',type:'string'}]
		)		
	});
	var draft_store = new Ext.data.Store({		           
			url: './email.jxp',
			method:'post',
			baseParams: {
				action: 'draft',
				start: 0,
				limit: 25
			},
			reader: new Ext.data.JsonReader({
	                           root: 'drafts'
			}, [
			     {name:'sender', type:'string'}, {name:'theme', type:'string'}, 
			     {name:'time', type:'string'}, {name:'content', type:'string'}
			])      
	});
	
	var mailsGrid = new Ext.grid.GridPanel({
        trackMouseOver : true,
        enableHdMenu:false,
		store : emailSetting_store,
		loadMask : {
				msg : '列表加载中...'
			},
		columns : [sm,{
					header : "名字",
					dataIndex : 'name',
					width : 100,
					sortable : true
				}, {
					header : "邮箱地址",
					dataIndex : 'emailAddress',
					width : 150,
					sortable : false
				}, {
					header : "描述",
					dataIndex : 'decription',
					align : 'center',
					width: 350,
					sortable : false
				},{
					header : "是否可用",
					dataIndex : 'active',
					width : 60,
					align : 'center',							
					sortable : false
				}],
		sm : sm,
		bbar : new Z.ux.PagingToolbarCN({
					pageSize : 25,
					displayInfo : true,
					store : emailSetting_store
				}),
		view : new Ext.ux.grid.BufferView({
					rowHeight : 25,
					scrollDelay : false
				})
	});
	var emailSelect_window = new Ext.Window({
				closeAction:'hide',
				resizable:false,
				width: 200,
				height: 100,
				title:'选择收件邮箱',
				modal: true,
				items:[{
					baseCls:'x-plain',
					items:[{
						xtype:"label",
						text : '请选择要收件的邮箱:'
					},{
						xtype:'combo',
						mode:'remote',
						valueField: 'emailId',
						displayField:'emailAddress',
						store:emailSelect_store,
						loadMask : {
							msg : '列表加载中...'
						},
						triggerAction:'all',
						editable:false
					}],
				buttons:[{
					text:'确定',
					handler:function(){
					   //alert(this.ownerCt.ownerCt.findByType('combo')[0].getValue());
					   email_store.setBaseParam('emailId', this.ownerCt.ownerCt.findByType('combo')[0].getValue());
					   email_store.reload();
					   this.ownerCt.ownerCt.ownerCt.hide();
				    }
				},{
					text:'取消',
					handler:function(){
					    this.ownerCt.ownerCt.ownerCt.hide();
					}
				}]
		}]
	});
	
	var emailInbox_window = new Ext.Window({
		closeAction:'hide',
		resizable:false,
		title:'收件箱',
		draggable:false,
		layout:'fit',
		items:[{
			xtype:'grid',
			trackMouseOver : true,
            enableHdMenu:false,
			store : email_store,
			loadMask : {
				msg : '列表加载中...'
			},
			columns : [sm, {
						header : '发件人',
						dataIndex : 'sender',
						width : 180,
						sortable : true
					}, {
						header : '主题',
						dataIndex : 'theme',
						width : 250,
						sortable : false
					}, {
						header : "时间",
						dataIndex : 'time',
						width : 150,
						align : 'center',
						sortable : false
					}],
			sm : sm,
			bbar : new Z.ux.PagingToolbarCN({
						pageSize : 25,
						displayInfo : true,
						store : email_store
					}),
			view : new Ext.ux.grid.BufferView({
						rowHeight : 25,
						scrollDelay : false
					}),
			listeners:{
				rowdblclick : function(grid, rowIndex, e){
					var emailContentPanel = new Ext.Window({
                          height:400,
                          width: 500,
                          maximizable:true,
                          layout:'border',
                          items:[{
                        	      xtype:'panel',
                        	      region:'north',
                        	      height:120,
                        	      layout:'form',
                        	      margins: '5 5 5 5',
                        	      baseCls:"x-plain",
                			      bodyStyle: {
                			    	  'padding':'15px'
                			      },
                			      labelWidth: 60,
		                          items:[{
		                        	  xtype:'label',
		                        	  style : 'font-size:18px', 
		                        	  text: grid.getStore().getAt(rowIndex).get('theme')
		                          },{
		                        	  xtype : 'textfield',
		         			          fieldLabel : '发件人',
		         			         anchor : '90%',
		                        	  disabled: true,
		                        	  value: grid.getStore().getAt(rowIndex).get('sender')
		                          },{
		                        	  xtype : 'textfield',
		         			         fieldLabel : '时间',
		                        	  disabled: true,
		                        	  anchor : '90%',	
		                        	  value: grid.getStore().getAt(rowIndex).get('time')
		                          },{
		                        	 layout:'column',
		                        	 baseCls:'x-plain',
		                        	 hidden: true,
		                        	 items:[{
		                        	    	 xtype : 'label',
		         			                 //fieldLabel : '附件',
		         			                 columnWidth: 0.86,	
		                        	         text: grid.getStore().getAt(rowIndex).get('files')
		                        	 },{
		                        		     xtype : 'button',
		                        		     columnWidth: 0.1,
		                        		     text : '下载附件',
		                        		     handler:function(){
		                        		    	        var mailSetId =emailSelect_window.findByType('combo')[0].getValue();
alert(mailSetId);
				          								window.location = encodeURI('./email.jxp?action=downloadfile&emailId=' + grid.getStore().getAt(rowIndex).get('mailId'))
				          								+'&mailSetId='+mailSetId;
		                        		     }
		                        	 }],
		                        	 listeners:{
				                        	 afterrender : function(panel){
				                        		 if(grid.getStore().getAt(rowIndex).get('files').length > 0)
				                        			 panel.setVisible(true);
				                        	 }
		                        	 }
		                          }]
		                          
                          },{
	                        	  xtype: 'panel',
	                        	  region:'center',
	                        	  autoScroll:true,
	                        	  html: grid.getStore().getAt(rowIndex).get('content')
                          }]
					}).show();
				} 
			}
		}],
		tbar:[{	
	             text: '删除邮件',
	             scale: 'small',
	             iconCls: 'icon-delete',
	             iconAlign: 'left',
	             width:10,
	             listeners : {
					click : function() {
							
					}	             
	             }
	         },'-',{             	
	           	text: '转 发',
	             scale: 'small',
	             iconCls : 'icon-send',
	             iconAlign: 'left',
	             width:10
	         }]
	});

	var emailOutbox_window = new Ext.Window({
		closeAction:'hide',
		resizable:false,
		title:'发邮件',
		draggable:false,
		layout:'fit',
		items:[{
			      xtype:'form',
			      autoScroll:true,
			      margins: '5 5 5 5',
			      bodyStyle: 'padding:15px',
			      labelWidth: 40,
			      waitMsgTarget: true,		     
			      items:[{
				         xtype : 'textfield',
				         fieldLabel : '收件人',
				         anchor : '90%',
				         allowBlank:false,
				         name : 'receiver' 
			      },{
				    	 xtype:'combo',
						 mode:'remote',
						 fieldLabel : '发件人',
						 valueField: 'emailId',
						 displayField:'emailAddress',
						 store:emailSelect_store,
						 triggerAction:'all',
						 editable:false,
						 allowBlank:false,
						 name: 'sender'
					},{
				         xtype : 'textfield',		         
				         fieldLabel : '主题',
				         anchor : '90%',
				         allowBlank:false,
				         name : 'subject'
			      },{
				         xtype:'htmleditor',		         
				         fieldLabel : '正文',
				         anchor : '90%',
				         height : 240,
				         name : 'content'
			      }]		
		}],
		tbar:[{
			text: '发送',
            scale: 'small',
            iconCls: 'icon-send',
            iconAlign: 'left',
            width:10,
            handler: function(){
	            	var basic = this.ownerCt.ownerCt.ownerCt.findByType('form')[0].getForm();
	            	basic.submit({  
		            		url: './email.jxp?action=sendEmail',
		            		method: 'POST', 
		            		waitMsg : '正在发送,请稍候...',// 提示信息
							waitTitle : '提示',// 标题
							success: function(form, action){ 
								  Ext.Msg.alert('提示', '发送成功！');    
							   },    
							failure: function(){  
								Ext.Msg.alert('提示', '发送失败！');
							} 
					});
            }
            
		},'-',{
			text: '存草稿',
            scale: 'small',
            iconCls: 'icon-draft',
            iconAlign: 'left',
            width:10,
            handler:function(){
            	var basic = this.ownerCt.ownerCt.ownerCt.findByType('form')[0].getForm();
            	basic.submit({  
            		url: './email.jxp?action=savedraft',
            		method: 'post', 
					success: function(form, action){ 
						  Ext.Msg.alert('提示', '保存成功！');    
					   },    
					failure: function(){  
						Ext.Msg.alert('提示', '保存失败！');
					} 
			});
            }
		},'-',{
			text: '取消',
            scale: 'small',
            iconCls: 'icon-cancel',
            iconAlign: 'left',
            width:10,
            handler:function(){
            	emailOutbox_window.hide();
            }
		},'->',{
			text: '添加抄送',
            scale: 'small',
            iconCls: 'icon-cc',
            iconAlign: 'left',
            width:10,
            listeners : {						
						click : function() {							
						}	             
	             }
		},'-',{
			text: '添加附件',
            scale: 'small',
            iconCls: 'icon-attach',
            iconAlign: 'left',
            width:10,
            listeners : {						
						click : function() {							
						}	             
	             }
		}]
	});
	var emailInedbox_window = new Ext.Window({
		closeAction:'hide',
		resizable:false,
		title:'已发邮件',
		draggable:false,
		layout:'fit',
		items:[{
			xtype:'grid',
			trackMouseOver : true,
            enableHdMenu:false,
			store : draft_store,
			loadMask : {
				msg : '列表加载中...'
			},
			columns : [sm, {
						header : "收件人",
						dataIndex : 'sender',
						width : 100,
						sortable : false
					}, {
						header : "主题",
						dataIndex : 'theme',
						sortable : false
					}, {
						header : "时间",
						dataIndex : 'time',
						width : 100,
						align : 'center',
						sortable : true
					}],
			sm : sm,
			bbar : new Z.ux.PagingToolbarCN({
						pageSize : 25,
						displayInfo : true,
						store : draft_store
					}),
			view : new Ext.ux.grid.BufferView({
						rowHeight : 25,
						scrollDelay : false
					}) 
		}],
		tbar:[{	
	             text: '删除',
	             scale: 'small',
	             iconCls: 'icon-delete',
	             iconAlign: 'left',
	             width:10,
	             listeners : {						
						click : function() {							
						}	             
	             }
	         },'-',{             	
	           	text: '转发',
	             scale: 'small',
	             iconCls: 'icon-send',
	             iconAlign: 'left',
	             width:10
	         }]
	});
	var emailDraftbox_window = new Ext.Window({
		closeAction:'hide',
		resizable:false,
		title:'草稿箱',
		draggable:false,
		layout:'fit',
		items:[{
			xtype:'grid',
			trackMouseOver : true,
            enableHdMenu:false,
			autoExpandColumn : 'subject',
			store : draft_store,
			loadMask : {
				msg : '列表加载中...'
			},
			columns : [sm, {
						header : "收件人",
						dataIndex : 'sender',
						width : 200,
						sortable : false
					}, {
						id : 'subject',
						header : "主题",
						dataIndex : 'theme',
						sortable : false
					}, {
						header : "时间",
						dataIndex : 'time',
						width : 150,
						align : 'center',
						sortable : true
					}],
			sm : sm,
			bbar : new Z.ux.PagingToolbarCN({
						pageSize : 10,
						displayInfo : true,
						store : draft_store
					}),
			view : new Ext.ux.grid.BufferView({
						rowHeight : 25,
						scrollDelay : false
					}) 
		}],
		tbar:[{	
	             text: '添加草稿',
	             scale: 'small',
	             iconCls: 'icon-draft',
	             iconAlign: 'left',
	             width:10,
	             listeners : {						
						click : function() {							
						}	             
	             }
	         },'-',{             	
	           	text: '删除草稿',
	             scale: 'small',
	             iconCls: 'icon-delete',
	             iconAlign: 'left',
	             width:10
	         },'-',{             	
		           	text: '转发',
		             scale: 'small',
		             iconCls: 'icon-send',
		             iconAlign: 'left',
		             width:10
		         }]
	});
	
	var emailSettingDialog = null;
	var emailEditSetting = null;
	JW.webware.MailsPanel.superclass.constructor.call(this, {		  
		   activeTab: 0,
		   items: [{       	
		        title: '设置邮箱',
		        scale: 'small',
		        iconCls: 'icon-mailsreceive',
		        iconAlign: 'left',
		        layout:'fit',
		        items:[mailsGrid],
		        tbar:[{	
		                text: '添加发件人',
		                scale: 'small',
		                iconCls: 'icon-add',
		                iconAlign: 'left',
		                width:10,
		                listeners : {
							click : function() {
		        	           if(emailSettingDialog == null){
		        	        	   emailSettingDialog = new EmailSettingDialog();
		        	           }
		        	               emailSettingDialog.show();
		        	           
		        	        }	             
		                }
		         },'-',{             	
		              	text: '修改发件人',
		                scale: 'small',
		                iconCls: 'icon-modify',
		                iconAlign: 'left',
		                width:10,
		                handler : function(){                	
		        	          var records = mailsGrid.getSelectionModel().getSelections();
							  if (records.length == 0) {
									Ext.MessageBox.alert('提示', '请选择你要修改的邮箱！');
							  } else if (records.length > 1) {
									Ext.MessageBox.alert('提示', '一次只能修改一个邮箱！');
							  } else {
									if(emailEditSetting == null){
										emailEditSetting = new EmailSettingDialog();
										//emailEditSetting.maileditPanel;
										buttons = emailEditSetting.maileditPanel.buttons;
										buttons[1].setVisible(false);
										buttons[2].setVisible(true);
									}
									var record = records[0];
									var textArray = emailEditSetting.maileditPanel.findByType('textfield');
									textArray[0].setValue(record.get('id'));
									textArray[1].setValue(record.get('name'));
									textArray[2].setValue(record.get('popService'));
									textArray[3].setValue(record.get('smtpService'));
									textArray[4].setValue(record.get('emailAddress'));
									textArray[5].setValue(record.get('password'));
									textArray[6].setValue(record.get('decription'));
									textArray[7].setValue('false');
									emailEditSetting.show();
							  }
		                }
		         },'-',{
		                text: '删除发件人', 
		                scale: 'small',
		                iconCls: 'icon-delete',
		                handler: function(){
									function geIdList() {
										var recs = mailsGrid.getSelectionModel().getSelections();
										var list = [];
										if (recs.length == 0) {
											Ext.MessageBox.alert('提示',
													'请选择要删除的邮箱设置！');
										} else {
											for (var i = 0; i < recs.length; i++) {
												var rec = recs[i];
												list.push(rec.get('id'));
											}
										}
										return list;
									}
									// 删除信息
			                        function Delete(IdList) {
			                                 var emailSettingIds = IdList;
			//alert(fileIds.toString());
			                                var msgTip = Ext.Msg.wait("正在删除，请稍候...","提示");
			                                Ext.Ajax.request({
				                                url : './email.jxp?action=emailSettingDelete',
				                                params : {
					                                   emailSettingIds : emailSettingIds.toString()
				                                },
				                                method : 'POST',
							                    success : function(resp,opts) {			                                	
								                          msgTip.hide();
								                           var respText = Ext.util.JSON.decode(resp.responseText);
								                           alert(respText);
											                if (respText.info =='ok') {
												            // 服务器端数据成功删除后，同步删除客户端列表中的数据
			//alert(respText.info);
												                for (var i = 0; i < IdList.length; i++) {
														             var index = emailSetting_store.find('id', IdList[i]);
alert(index);
														        if (index != -1) {
															         var rec = emailSetting_store.getAt(index)
															         emailSetting_store.remove(rec);
														        }
													             }
														           Ext.Msg.alert('提示', '删除成功！');
													         } else {
														           Ext.Msg.alert('提示', '删除失败！');
													        }
				                                }
			                                });
			                      }
			                var IdList = geIdList();
			                var num = IdList.length;
			                if (num == 0) {
				                 return;
			                     }
			                Ext.MessageBox.confirm('提示', '您确定要删除所选收件人吗？', function(btnId) {
				           if (btnId == 'yes') {
					             Delete(IdList);
				              }
			              })
		                }
		         },'-',{          	
			            text: '刷新',
			            scale: 'small',
			            iconCls: 'icon-refresh',
			            iconAlign: 'left',
						handler:function(){
						        emailSetting_store.reload();
						}
			}]        
		    },{
		        title: '进入邮箱',
		        scale: 'small',
		        iconCls: 'icon-mailswrite',
		        iconAlign: 'left',
		        layout:'border',
		        items:[{
		        	region:'west',
		        	xtype:'panel',
		        	width:100,
		        	layout:{
						type:'vbox',
					    align:'stretch'
					},
		        	items:[{
					    xtype:'button',
					    iconCls: 'icon-outbox',
				        iconAlign: 'left',
						text:'收件',
						handler:function(){ 
		        		   //emailSelect_store.setBaseParam('foo', 3);
		        		   emailSelect_store.reload();
		        		   emailInbox_window.show();
		        		   emailInbox_window.maximize();
		        		   emailSelect_window.show();
		        	    }
					},{
						xtype:'button',
						iconCls: 'icon-mailswrite',
				        iconAlign: 'left',
						text:'写信',
						handler:function(){
		        		   emailOutbox_window.show();
		        		   emailOutbox_window.maximize();
		        	    }
					},{
						xtype:'button',
						iconCls: 'icon-mailsreceive',
				        iconAlign: 'left',
						text:'已发邮件',
						handler:function(){						   
		        		   emailInedbox_window.show();
		        		   emailInedbox_window.maximize();
		        	    }
					},{
						xtype:'button',
						iconCls: 'icon-draft',
				        iconAlign: 'left',
						text:'草稿',
						handler:function(){
							draft_store.reload();
		        		   emailDraftbox_window.show();
		        		   emailDraftbox_window.maximize();
		        	    }
					}]
		        },{
		        	region:'center',
		        	xtype:'panel',
		        	items:[emailSelect_window,emailInbox_window,emailOutbox_window,emailDraftbox_window,emailInedbox_window]
		        }]
		     }]	
            });
          };
          
Ext.extend(JW.webware.MailsPanel,Ext.TabPanel,{
});
          
