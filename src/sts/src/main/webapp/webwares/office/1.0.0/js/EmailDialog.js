Ext.namespace('JW', 'JW.webware');
EmailSettingDialog = Ext.extend(Ext.Window, {
	maileditPanel : null,
	constructor : function(config){
	    function settingSave(basic, url){
	    	  //alert(basic);
	  		  var emailsettingJSON = Ext.util.JSON.encode(basic.getFieldValues());
			  Ext.Ajax.request({
					url : url,
					params : {
				      emailsettingJSON : emailsettingJSON
					},
					method : 'POST',
					success : function(response,options) {
						var result = Ext.util.JSON.decode(response.responseText);
						if (result.success) {
							// 服务器端数据成功删除后，同步删除客户端列表中的数据
							Ext.Msg.alert('提示',result.msg);
							
							//active.setValue('true');
						} else {
							Ext.Msg.alert('提示',result.msg);
							//active.setValue('false');
						}
					},
					failure : function(response,options) {
						Ext.Msg.alert('提示','邮件保存请求失败！');
					}
			    });
	    }
		this.maileditPanel = new Ext.form.FormPanel({
		      margins: '5 5 5 5',
		      bodyStyle: {
		    	  'padding':'15px'
		      },
		      defaultType:'textfield',
		      labelWidth: 95,
		      waitMsgTarget: true,			  
		      renderTo : Ext.getBody(),  //渲染到页面
		      items:[{
		    	  xtype : 'textfield',
		    	     hidden : true,
		    	     name: 'id'
		      },{
		    	     xtype : 'textfield',		         
			         fieldLabel : '  名    字     ',
			         anchor : '80%',
			         allowBlank:false,
			         name:'name'
		      },{
			         xtype : 'textfield',		         
			         fieldLabel : 'POP3服务器设置',
			         anchor : '95%',
			         allowBlank:false,
			         name:'popService'
		      },{
			         xtype : 'textfield',		         
			         fieldLabel : 'SMTP服务器设置',
			         anchor : '95%',
			         allowBlank:false,
			         name:'smtpService'
		      },{
			         xtype : 'textfield',		         
			         fieldLabel : '  邮箱地址  ',
			         anchor : '65%',
			         allowBlank:false,
			         name:'emailAddress'
		      },{
			         xtype : 'textfield',
			         inputType:'password',
			         fieldLabel : ' 密码 ',
			         anchor : '65%',
			         allowBlank:false,
			         name:'password'
		      },{
		    	     xtype : 'textarea',
		    	     anchor : '95%',
		    	     fieldLabel : '描述',
		    	     name : 'decription'
		      },{
		    	     xtype : 'textfield',
		    	     hidden : true,
		    	     name: 'active'
		      }],
			  buttons:[{
					text:'测试连接',
					listeners:{
						click:function(button){
					      var basic = this.ownerCt.ownerCt.getForm(); 
					      var active = this.ownerCt.ownerCt.findByType('textfield')[7];
					      if(basic.isValid()){
					      var emailsettingJSON = Ext.util.JSON.encode(basic.getFieldValues());
						  Ext.Ajax.request({
								url : './email.jxp?action=set',
								params : {
							      emailsettingJSON : emailsettingJSON
								},
								method : 'POST',
								success : function(response,options) {
									var result = Ext.util.JSON.decode(response.responseText);
									if (result.success) {
										Ext.Msg.alert('提示',result.msg);										
										active.setValue('true');
									} else {
										Ext.Msg.alert('提示',result.msg);
										active.setValue('false');
									}
								},
								failure : function(response,options) {
									Ext.Msg.alert('提示','邮箱测试请求失败！');
								}
						    });
					      }
					    }
					}
			  },{
				  text:'保存',
				  handler:function(){
					  var basic = this.ownerCt.ownerCt.getForm(); 
					  var active = this.ownerCt.ownerCt.findByType('textfield')[7];
					  
					  var button = this.ownerCt.findByType('button')[0];
					  alert(button.getXTypes());
				      if(basic.isValid()){
				    	  if(active.getValue() != 'true'){
				    		  Ext.MessageBox.confirm('提示', '你还没测试设置，是否测试?',function(btn){
				    		                                                                  if(btn == 'yes'){
				    		                                                                         button.fireEvent('click');
				    		                                                                  }else{
				    		                                                                        settingSave(basic, './email.jxp?action=settingSave');      
				    		                                                                  }
				    		                                                         });
				    	  }else{
                              settingSave(basic, './email.jxp?action=settingSave');
				    	  }
				      }
			     }
			  },{
				  text:'保存修改',
				  hidden: true,
				  handler:function(){
					  var basic = this.ownerCt.ownerCt.getForm();
					  var active = this.ownerCt.ownerCt.findByType('textfield')[5];
					  var button = this.ownerCt.findByType('button')[0];
				      if(basic.isValid()){
				    	  if(active.getValue() != 'true'){
				    		  Ext.MessageBox.confirm('提示', '你还没测试设置，是否测试?',function(btn){
				    		                                                                  if(btn == 'yes'){
				    		                                                                         button.fireEvent('click');
				    		                                                                  }else{
				    		                                                                        settingSave(basic, './email.jxp?action=settingUpdate');      
				    		                                                                  }
				    		                                                         });
				    	  }else{
                              settingSave(basic, './email.jxp?action=settingUpdate');
				    	  }
				      }
				      //this.ownerCt.ownerCt.ownerCt.hide();
			     }
			  },{
					text:'取消',
					handler:function(){
					   this.ownerCt.ownerCt.ownerCt.hide();
			        }    
			  }]
	});
	EmailSettingDialog.superclass.constructor.call(this,{
    	title : '邮件设置',
	    maximizable : true,	   
	    width : 540,
	    border:false,
	    closeAction:'hide',
		height : 330,
		minWidth : 540,
		minHeight : 330,
		iconCls : ' ',		
		items : [
			this.maileditPanel
		],
		listeners:{
	    	  hide : function(win){
	             win.maileditPanel.getForm().reset();
	          }
	    }
      })
    }

});



EmailDialog = Ext.extend(Ext.Window, {
	maileditPanel : null,
	constructor : function(config){
		this.maileditPanel = new Ext.form.FormPanel({
			  region : 'south',			  
		      margins: '5 5 5 5',
		      bodyStyle: 'padding:15px',
		      labelWidth: 50,
		      labelPad: 20,
		      waitMsgTarget: true,			  
		      renderTo : Ext.getBody(),  //渲染到页面
		      items:[{
		         xtype : 'combo',		         
		         fieldLabel : '发件人',
		         anchor : '95%',
		         store : new Ext.data.ArrayStore({
		         	fields : [],
		         	data : [["a"],["b"]]
		         })
		         
		      },
		      	{
		         xtype : 'textfield',		         
		         fieldLabel : '收件人',
		         anchor : '95%'		         
		      },{
		         xtype : 'textfield',		         
		         fieldLabel : '主题',
		         anchor : '95%'
		      },{
		         xtype:'htmleditor',
		         //layout:'fit'
		         //fieldLabel : '正文',
		         anchor : '95%'
		         //height:240
		      }]
		      });
    EmailDialog.superclass.constructor.call(this,{
    	title : '写信',
	    maximizable : true,	 
	    closable:false,
	    width : 640,
		height : 480,
		minWidth : 640,
		minHeight : 480,
		iconCls : 'icon-send',		
		items : [{
		layout : 'fit',
		items:[this.maileditPanel]
		}],
		tbar : [{
					text : '发送',
					scale : 'small',
					iconAlign : 'left',
					iconCls : 'icon-send'
				}, {
					xtype : 'splitbutton',
					text : 'Send&Resolve',
					scale : 'small',
					iconCls : 'add16',
					menu : [{
								text : 'Send&Open'
							}, {
								text : 'Send&Accept'
							}, {
								text : 'Send&Resolve'
							}]
				}, {
					text : '取消',
					scale : 'small',
					iconAlign : 'left',
					iconCls : 'icon-send'
				}, '->', {
					text : '添加抄送',
					scale : 'small',
					iconAlign : 'left',
					iconCls : 'icon-send'
				}, {
					text : '分别发送',
					scale : 'small',
					iconAlign : 'left',
					iconCls : 'icon-send'
				}, {
					text : '添加附件',
					scale : 'small',
					iconAlign : 'left',
					iconCls : 'icon-send'
				}, {
					text : '标签',
					scale : 'small',
					iconAlign : 'left',
					iconCls : 'icon-send'
				}]
        })
    }

})