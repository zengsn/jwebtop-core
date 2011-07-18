/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');
JW.webware.FilesPanel = function(config) {	
	this.id = config.id;
	var sm = new Ext.grid.CheckboxSelectionModel();  // add checkbox column
	var store = new Ext.data.Store({		           
        	       autoLoad: true,        	       
        	       url:'FileList',
        	       method:'POST',
                   baseParams: {
			             action: 'search',
			             start: 0,
			             limit: 25
		           },
		           reader : new Ext.data.JsonReader({root : 'files'}, 
									 [{name : 'fileName',type : 'string'}, 
									 {name : 'fileType'}, 
									 {name : 'lastModifyDate'}, 
									 {name : 'fileSize',type : 'string'},
									 {name : 'filePath',type : 'string'}
							])    
	});
	var filesGrid = new Ext.grid.GridPanel({
		   //id:'mygridpanel',
		   trackMouseOver: true,
		   enableHdMenu:false,
		   autoExpandColumn: 'myfiles',
           store: store,
           loadMask : {
				msg : '列表加载中...'
			},
           columns: [sm,{
            id:'myfiles',	
            header: "类型",
            dataIndex: 'fileType',
            width: 250,            
            sortable: true
		}, {
            header: "名称",
            dataIndex: 'fileName',
            width: 150,            
            sortable:true
        },{
            header: "修改日期",
            dataIndex: 'lastModifyDate',
            width: 220,
            align: 'center',            
            sortable:true
        }, {
            header: "大小",
            dataIndex: 'fileSize',
            width: 50,            
            sortable:true
        }],
	   sm:sm,
	   bbar: new Z.ux.PagingToolbarCN({
            pageSize: 10,
            displayInfo: true,           
            store:store
         }),
	    view: new Ext.ux.grid.BufferView({
		     rowHeight: 25, // custom row height
		     scrollDelay: false// render rows as they come into viewable area.
	    }),
		listeners:{
	        show:function(){
                alert();
			    store.load();
			}	
		}
	
	});
	JW.webware.FilesPanel.superclass.constructor.call(this, {		     		    
            layout: 'border',
            items: [{            	
           region: 'center',
           layout:'fit',
           items:[filesGrid]
       }, {
           region: 'north',
           height:30,
           tbar: [{            
            text: '上传',
            scale: 'small',  //元素的大小。可允许有这三种的值：small  medium  large  var showpanel=
            iconAlign: 'left',
            iconCls: 'icon-filesupload',
            listeners : {
					click : function() {
						var myForm = new Ext.form.FormPanel({
							id:'fileUploadForm',
							width : 380,
							height : 200,
							frame : true,
							monitorValid : true,
							fileUpload : true, // 需上传文件
							url : 'FileUpload',// 请求的url地址							
							method : 'POST',
					    items : [{//选择文件，浏览上传					    	
					    	xtype:'field',
							fieldLabel : '选择文件',
							inputType : 'file',	
							allowBlank:false,
							name : 'choosefile'
							}],
							buttons : [{
								text : '开始上传',								
								handler : function() {// 显示上传窗口
									    myForm.form.submit({
										clientValidation : true,// 进行客户端验证
										waitMsg : '正在上传,请稍候...',// 提示信息
										waitTitle : '提示',// 标题
										success : function(form, action) {// 加载成功的处理函数
											win.hide();
											filesGrid.getStore().reload();
											Ext.Msg.alert('提示', '上传成功！');
										},
										failure : function(form, action) {//加载失败的处理函数
											Ext.Msg.alert('提示', '上传失败！');
										}
									});	
								}
							},{
								text:'关闭',
								handler:function(){
								win.hide();								
								}
							}]
							
						});
						// 创建弹出窗口
						var win = new Ext.Window({
									layout : 'fit',
									title:'文件上传',
									width : 380, 
									closeAction : 'hide',
									height : 200, 
									resizable : false,
									shadow : true,
									modal : true,
									closable : true,
									bodyStyle : 'padding:5 5 5 5',
									animCollapse : true,
									items : [myForm]
								});
								win.show(this);                
            	}
            }
        },'-',{          	
            text: '下载',
            scale: 'small',
            iconCls: 'icon-filesdownload',
            iconAlign: 'left',
            listeners:{
            	click:function(){
            		var records = filesGrid.getSelectionModel().getSelections();
						if (records.length == 0) {
							Ext.MessageBox.alert('提示', '请选择您要下载的文件！');
						} else if (records.length > 1) {
							Ext.MessageBox.alert('提示', '一次只能下载一个文件！');
						} else {
							var _filepath = records[0].get('filePath');
							var _filename =  records[0].get('fileName');
							alert(_filepath);
							window.location = encodeURI('FileDownload?filePath=' + _filepath + '&fileName=' + _filename);
						}
						}
            }
          },'-',{          	
            text: '刷新',
            scale: 'small',
            iconCls: 'icon-refresh',
            iconAlign: 'left',
			handler:function(){
			        store.reload();
			}
          },'-',{          	
            text: '删除',
            scale: 'small',
            iconCls: 'icon-delete',
            iconAlign: 'left',
            listeners : {            	            		
            		// 显示删除对话框
	                click : function() {
								// 取得所选信息
								function geIdList() {
									var recs = filesGrid.getSelectionModel()
											.getSelections();
									var list = [];
									if (recs.length == 0) {
										Ext.MessageBox.alert('提示',	'请选择要删除的文件！');
									} else {
										for (var i = 0; i < recs.length; i++) {
											var rec = recs[i];
											list.push(rec.get('fileName'));
										}
									}
									return list;
								}
								// 删除信息
	                            function Delete(IdList) {
		                                 var fileIds = IdList;
//alert(fileIds.toString());
		                                var msgTip = Ext.Msg.wait("正在删除，请稍候...","提示");
		                                Ext.Ajax.request({
			                                url : 'FileDelete',
			                                params : {
				                                   fileIds : fileIds.toString()
			                                },
			                                method : 'POST',
						                    success : function(resp,opts) {			                                	
							                          msgTip.hide();
							                           var respText = Ext.util.JSON.decode(resp.responseText);
										                if (respText.info =='ok') {
											            // 服务器端数据成功删除后，同步删除客户端列表中的数据
//alert(respText.info);
										                for (var i = 0; i < IdList.length; i++) {
												             var index = store.find('fileName', IdList[i]);
												        if (index != -1) {
													         var rec = store.getAt(index)
													         store.remove(rec);
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
		                Ext.MessageBox.confirm('提示', '您确定要删除所选文件吗？', function(btnId) {
			           if (btnId == 'yes') {
				             Delete(IdList);
			              }
		              })
	             }	             
            }
          },'-',{          	
            text: '上传对话框',
            scale: 'small',
            iconCls: 'icon-filesrefresh',
            iconAlign: 'left',
			handler:function(){
			    var dialog = new UploadDialog({
				uploadUrl : 'uploadFiles.action',
				filePostName : 'myUpload', //这里很重要，默认值为'fileData',这里匹配action中的setMyUpload 属性
				flashUrl : 'js/swfupload.swf',
				fileSize : '500 MB', 
				fileTypes : '*.*',
				fileTypesDescription : '所有文件',
				scope : this
			})
			    dialog.show();     
			}
          },'->',{
            xtype: 'tbtext', 
            text: '容量：'            
           },{
           xtype:'progress',
           height:10,
           width:80
           },{
            xtype: 'tbtext', 
            text: '0MB/2GB'            
           }]           
    }]            
         
		});
};
Ext.extend(JW.webware.FilesPanel, Ext.Panel, {
	
});
