/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

// Webware Definition
JW.webware.StudentWindow = Ext.extend(JW.Webware, {
	id : 'student-win',
	title: '学生管理器',
	iconCls: 'icon-student',
	init : function() {
		this.launcher = {
	            text: this.title,
	            iconCls:this.iconCls,
	            //handler : this.createWindow,
	            scope: this,
            menu: {
	            items: [{
	            	windowId: 'student-admissions-win',
	        		text: '招生工作',
	        		iconCls: 'icon-student-admissions',
	                handler : this.createWindow,
	                scope: this
	            },{
	            	windowId: 'student-records-win',
	        		text: '学生档案',
	        		iconCls: 'icon-student-records',
	                handler : this.createWindow,
	                scope: this
	            },{
	            	windowId: 'student-classmates-win',
	        		text: '校友管理',
	        		iconCls: 'icon-student-classmates',
	                handler : this.createWindow,
	                scope: this
	            },{
	            	windowId: 'student-parents-win',
	        		text: '家长通道',
	        		iconCls: 'icon-student-parents',
	                handler : this.createWindow,
	                scope: this
	            },{
	            	windowId: 'student-medicaltreatment-win',
	        		text: '医疗记录',
	        		iconCls: 'icon-student-medicaltreatment',
	                handler : this.createWindow,
	                scope: this
	            }]
        	}
        };
	},
		
	createWindow : function(src) {
		var webtop = this.system.getWebtop();
		if (!src) {src = {};}
        if (!src.windowId) { 
        	src.windowId = this.id; 
        	src.text = this.title; 
	        src.iconCls = this.iconCls;
        } 
        
		var win = webtop.getWindow(src.windowId);
		
		if (!win) {		
			var innerPanel;
			if ('student-admissions-win'==src.windowId) {
				innerPanel = new JW.webware.AdmissionsPanel({webware: this});
			} else if ('student-records-win'==src.windowId) {
				innerPanel = new JW.webware.RecordsPanel({webware: this});
			} else if ('student-classmates-win'==src.windowId) {
				innerPanel = new JW.webware.ClassmatesPanel({webware: this});
			} else if ('student-parents-win'==src.windowId) {
				innerPanel = new JW.webware.ParentsPanel({webware: this});	
			} else if ('student-medicaltreatment-win'==src.windowId) {
				innerPanel = new JW.webware.MedicalTreatmentPanel({webware: this});	
			} else {
				innerPanel = new JW.webware.StudentPanel({webware: this});
			}
			
			win = webtop.createWindow({
				id : src.windowId,
				title : src.text,
				width : 740,
				height : 480,
				iconCls : src.iconCls,
				shim : false,
				border: false,
				animCollapse : false,
				constrainHeader : true,
				layout : 'fit',
				items : innerPanel
			});
		}
		win.show();
	},
	
	createWindowById: function(windowId) {
		var windows = this.launcher.menu.items;
		for(var i=0; i<windows.length; i++) {
			var window = windows[i];
			if (windowId == window.windowId) {
				this.createWindow(windows[i]);
				return;
			}
		}
		alert("找不到控件ID:[" + windowId + "]");
	}
});


JW.webware.StudentPanel = function(config) {
	this.webware = config.webware;
	var store = new Ext.data.Store({
		autoLoad: true,
		url: JXP_WEB_CONTEXT + '/webwares/student/1.0.0/xml/student.xml',
		reader: new Ext.data.XmlReader({
			record: 'student',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    'id', 'name', 'image', 'path', 'type', 'summary'
		])
    });
	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="student-wrap" id="{id}">',
            '<div class="student"><img src=".{image}" title="{summary}" alt="{summary}"></div>',
		    '<div class="infomation"><span class="x-editable">{shortName}</span><p>{summary}</p></div></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
	);
	
    var dataview = new Ext.DataView({
        store: store,
        tpl: tpl,
        //autoHeight:true,
        multiSelect: true,
        overClass:'x-view-over',
        itemSelector:'div.student-wrap',
        emptyText: 'No item to display',

        plugins: [
            new Ext.DataView.DragSelector()
        ],

        prepareData: function(data){
            data.shortName = Ext.util.Format.ellipsis(data.name, 15);
            return data;
        },
        
        listeners: { 
        	'click': function(dataView, index, node, evnObj) {
            	var record = store.getAt(index);
            	config.webware.createWindowById('student-'+ record.data.id + '-win');
            }
        }
    });
    
    var pagingBar = new Z.ux.PagingToolbarCN({
        pageSize: 5,
        displayInfo: true,
        store: store,
        emptyMsg : '没有数据'

	});
    
    
	JW.webware.StudentPanel.superclass.constructor.call(this, {
		id:'student-view',
        layout:'fit',
        border: true,
        autoScroll:true,
		width : 740,
		height : 480,

        items: dataview,
		tbar: ['->',{
			text: '帮助',
			iconCls: 'icon-help'
		}],
		
		bbar: new Z.ux.PagingToolbarCN({
            pageSize: 5,
            displayInfo: true,
            store: store
        })
	}); 
};
Ext.extend(JW.webware.StudentPanel, Ext.Panel,{
	
});

//Add webware instance
WEBWARES[WEBWARES.length] = new JW.webware.StudentWindow();