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
JW.webware.RecordsPanel = function(config) {
	Ext.apply(this,config);
	Ext.app.DataLoader = Ext.extend(Ext.ux.tree.XmlTreeLoader, {
	    processAttributes : function(attr){
	        if(attr.classes){
	            attr.text = attr.classes;

	            //icon:
	           // 图片用的attr.iconCls = 'author-' + attr.gender;
	            attr.loaded = true;
	            attr.expanded = true;
	        }
	        else if(attr.grades){
	        	 attr.text = attr.grades;
		         attr.loaded = true;
	        }
	        else if(attr.sid){ 
	            attr.text = attr.sid+ ' (' + attr.name + ')';
	            // icon:
	            //图片用的attr.iconCls = 'book';
	            attr.leaf = true;
	        }
	    }
	});

	    var detailsText = '<i>选择要查看的档案.....</i>';

		var tpl = new Ext.Template(
	        '<h1 class="sid"><b>学号</b>:{sid}</h1>',
	        '<div style="margin:10px;"><img src="./webwares/student/1.0.0/images/student-images/{sid}.jpg"></div>',
	        '<hr/>',
	        '<table align="left" style="margin:10px;"> ',
	        '<tr height="40"><td width="90"><b>姓名</b>: {name}</td><td width="90"><b>性别</b>: {sex}</td>',
	        '<td width="90"><b>年龄</b>: {age}</td><td width="90"><b>评价</b>: {evaluate}</td></tr>',
	        
	        '<tr height="40"><td width="200"><b>邮箱</b>: {email}</td><td width="100"><b>联系电话</b>: {phone}</td></tr>',
	        
	        '<tr height="40"><td><b>注册时间</b>: {enrolltime}</td></tr>',
	        '</table > '
		);
	    tpl.compile();
	    var sid = "";
	JW.webware.RecordsPanel.superclass.constructor.call(this, {
		
		 id:'recordss-panel',
		 layout: 'border',
	        items: [{
	        	
	            region: 'west',
	            xtype: 'treepanel',
	            id: 'tree-panel',
	            title:'选 项',
	            autoScroll: true,
	            collapsible: false,
	            margins: '0 3 0 1',
	            width:200,
	            rootVisible: false,
		        root: new Ext.tree.AsyncTreeNode(),
		        // Our custom TreeLoader:
		        loader: new Ext.app.DataLoader({
		            dataUrl:JXP_WEB_CONTEXT+'/webwares/student/1.0.0/xml/student-data.xml'
		        }),
	            listeners: {
		            'render': function(tp){
	                    tp.getSelectionModel().on('selectionchange', function(tree, node){
	                        var el = Ext.getCmp('details-panel').body;
		                    if(node && node.leaf){
		                        tpl.overwrite(el, node.attributes);
		                    }else{
	                            el.update(detailsText);
	                            if(node.attribute == 'sid'){
	                            	sid = node.attribute.value;
	                            }
	                        }
		                    
	                    });
		            }
	           },
	        bbar : [{
				xtype : 'textfield',
				width : '160'
			},{
				iconCls : 'icon-search'
			}]
	        },{

	            region: 'center',
	            title: '学生信息',
	            id: 'details-panel',
	            autoScroll: true,
	            collapsible: true,
	            split: true,
	            html: detailsText,
	            bbar : [{xtype:'button',text:'修 改'}]
	          

	          
	        }]
		 


			 
	});

};
Ext.extend(JW.webware.RecordsPanel, Ext.Panel, {
	
});