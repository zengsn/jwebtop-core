/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

// Webware Definition
JW.webware.EducationWindow = Ext.extend(JW.Webware, {
	id : 'education-win',
	title: '教学管理器',
	iconCls: 'icon-education',
	init : function() {
		this.launcher = {
	            text: this.title,
	            iconCls:this.iconCls,
	            //handler : this.createWindow,
	            scope: this,
	            menu: {
		            items: [{
		            	windowId: 'education-college-win',
		        		text: '学院管理',
		        		iconCls: 'icon-education-college',
		                handler : this.createWindow,
		                scope: this
		            },{
		            	windowId: 'education-course-win',
		        		text: '课程管理',
		        		iconCls: 'icon-education-course',
		                handler : this.createWindow,
		                scope: this
		            },{
		            	windowId: 'education-Schedule-win',
		        		text: '课程表',
		        		iconCls: 'icon-education-Schedule',
		                handler : this.createWindow,
		                scope: this
		            },{
		            	windowId: 'education-schoolwork-win',
		        		text: '学校作业',
		        		iconCls: 'icon-education-schoolwork',
		                handler : this.createWindow,
		                scope: this
		            },{
		            	windowId: 'education-gradebook-win',
		        		text: '成绩单',
		        		iconCls: 'icon-education-gradebook',
		                handler : this.createWindow,
		                scope: this
		            },{
		            	windowId: 'education-ReportCard-win',
		        		text: '期末成绩报告',
		        		iconCls: 'icon-education-ReportCard',
		                handler : this.createWindow,
		                scope: this
		            },{
		            	windowId: 'education-Examination-win',
		        		text: '测试及考试',
		        		iconCls: 'icon-education-Examination',
		                handler : this.createWindow,
		                scope: this
		            },{
		            	windowId: 'education-ELearning-win',
		        		text: '在线学习',
		        		iconCls: 'icon-education-ELearning',
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
			if ('education-college-win'==src.windowId) {
				innerPanel = new JW.webware.collegePanel({webware: this});
			} else if ('education-course-win'==src.windowId) {
				innerPanel = new JW.webware.coursePanel({webware: this});
			} else if ('education-Schedule-win'==src.windowId) {
				innerPanel = new JW.webware.SchedulePanel({webware: this});
			} else if ('education-schoolwork-win'==src.windowId) {
				innerPanel = new JW.webware.schoolworkPanel({webware: this});
			} else if ('education-gradebook-win'==src.windowId) {
				innerPanel = new JW.webware.gradebookPanel({webware: this});
			} else if ('education-ReportCard-win'==src.windowId) {
				innerPanel = new JW.webware.ReportCardPanel({webware: this});
			} else if ('education-Examination-win'==src.windowId) {
				innerPanel = new JW.webware.ExaminationPanel({webware: this});
			} else if ('education-ELearning-win'==src.windowId) {
				innerPanel = new JW.webware.ELearningPanel({webware: this});
			} else {
				innerPanel = new JW.webware.EducationPanel({webware: this});
			}
			
			win = webtop.createWindow({
				id : src.windowId,
				title : src.text,
				maximizable : false,
				iconCls : src.iconCls,
				shim : false,
				border: false,
				animCollapse : false,
				constrainHeader : true,
				layout : 'fit',
				items :[innerPanel]
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


JW.webware.EducationPanel = function(config) {
	this.webware = config.webware;
	var store = new Ext.data.Store({
		autoLoad: true,
		url: JXP_WEB_CONTEXT + '/webwares/education/1.0.0/xml/education.xml',
		reader: new Ext.data.XmlReader({
			record: 'education',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    'id', 'name', 'image', 'path', 'type', 'summary'
		])
    });
	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="education-wrap" id="{id}">',
            '<div class="education"><img src=".{image}" title="{summary}" alt="{summary}"></div>',
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
        itemSelector:'div.education-wrap',
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
            	config.webware.createWindowById('education-'+ record.data.id + '-win');
            }
        }
    });
    
    var pagingBar = new Z.ux.PagingToolbarCN({
        pageSize: 5,
        displayInfo: true,
        store: store,
        emptyMsg : '没有数据'

	});
    
    
	JW.webware.EducationPanel.superclass.constructor.call(this, {
		id:'education-view',
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
Ext.extend(JW.webware.EducationPanel, Ext.Panel,{
	
});

//Add webware instance
WEBWARES[WEBWARES.length] = new JW.webware.EducationWindow();