/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.core');

/**
 * 网件管理控件：添加、删除、升级。
 * @param config
 */
JW.core.WebwaresPanel = function(config) {
	var store = new Ext.data.Store({
		autoLoad: true,
		url: './preferences-webwares.xml',
		reader: new Ext.data.XmlReader({
			record: 'webware',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    'id', 'name', 'author', 'screen', 'image', 'status', 'versions', 'currentVersion', 'release', 'description'
		])
    });
	var viewTemplate = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="view-item-wrap {statusText}" id="{id}">',
			'<div class="view-item"><img src=".{screen}" title="{name}" alt="{description}"></div>',
			'<span class="x-editable">{shortName}</span></div>',
		'</tpl>'
	);
	viewTemplate.compile();
	var detailsTemplate = new Ext.XTemplate(
		'<div class="webware-details">',
			'<tpl for=".">',
				'<img src=".{screen}"><div class="webware-details-info">',
				'<center class="{statusText}">{name}({statusTextCN})</center>',
				'<b>网件作者：</b>',
				'<span>{author}</span>',
				'<b>当前版本：</b>',
				'<span>{currentVersion}</span>',
				'<b>所有版本：</b>',
				'<span>{versions}</span>',
				'<b>发布日期：</b>',
				'<span>{release}</span>',
				'<b>说明：</b>',
				'<span>{description}</span></div>',
			'</tpl>',
		'</div>'
	);
	detailsTemplate.compile();

    var dataview = new Ext.DataView({
        store: store,
        tpl: viewTemplate,
        //autoHeight:true,
        multiSelect: true,
        overClass:'x-view-over',
        itemSelector:'div.view-item-wrap',
        emptyText: 'No item to display',

        plugins: [
            new Ext.DataView.DragSelector()
        ],

        prepareData: function(data){
            data.shortName = Ext.util.Format.ellipsis(data.name, 15);
            data.statusText = (data.status==0?'disabled':'enabled');
            data.statusTextCN = (data.status==0?'未启用':'已启用');
            return data;
        },
        
        listeners: { 
        	'click': function(dataView, index, node, evnObj) {
            	//var record = store.getAt(index);
        	    var selNode = dataView.getSelectedNodes();
        	    var detailEl = Ext.getCmp('webware-details-panel').body;
        		if(selNode && selNode.length > 0){
        			selNode = selNode[0];
        			//Ext.getCmp('ok-btn').enable();
        		    var data = store.getAt(index).data;
                    detailEl.hide();
                    detailsTemplate.overwrite(detailEl, data);
                    detailEl.slideIn('l', {stopFx:true,duration:.2});
                    // Enable/Disable buttons
                    if (data.status ==0) {
                    	Ext.getCmp('btn-ww-enable').enable();
                    	Ext.getCmp('btn-ww-disable').disable();
                    	Ext.getCmp('btn-ww-upgrade').disable();
                    }
                    if (data.status ==1) {
                    	Ext.getCmp('btn-ww-enable').disable();
                    	Ext.getCmp('btn-ww-disable').enable();
                    	Ext.getCmp('btn-ww-upgrade').enable();
                    }
        		} else{
        		    //Ext.getCmp('ok-btn').disable();
        		    detailEl.update('');
        		}
            }
        }
    });
	JW.core.WebwaresPanel.superclass.constructor.call(this, {
		id:'webwares-browser',
        layout:'border',
        border: true,
        items: [{
        	id: 'webwares-view',
			region: 'center',
			split: true,
			margins: '5, 0, 5, 5',
			items: dataview,
			tbar: [{
            	text: '过滤：'
            },{
            	xtype: 'textfield',
            	id: 'filter',
            	selectOnFocus: true,
            	width: 100,
            	listeners: {
            		'render': {fn:function(){
				    	Ext.getCmp('filter').getEl().on('keyup', function(){
				    		// this.filter();
				    	}, this, {buffer:500});
            		}, scope:this}
            	}
            }, ' ', '-', {
            	text: '排序：'
            }, {
            	id: 'sortSelect',
            	xtype: 'combo',
		        typeAhead: true,
		        triggerAction: 'all',
		        width: 100,
		        editable: false,
		        mode: 'local',
		        displayField: 'desc',
		        valueField: 'name',
		        lazyInit: false,
		        value: 'name',
		        store: new Ext.data.ArrayStore({
			        fields: ['name', 'desc'],
			        data : [['name', 'Name'],['size', 'File Size'],['lastmod', 'Last Modified']]
			    }),
			    listeners: {
					'select': {fn:this.sortImages, scope:this}
			    }
		    }],
		    bbar: new Z.ux.PagingToolbarCN({
	            pageSize: 10,
	            displayInfo: true,
	            store: store
	        })
		}, {
			id: 'webware-details-panel',
			region: 'east',
			width: 280,
			split: true,
			autoScroll: true,
			margins: '5, 5, 5, 0',
			html: '单击查看网件信息。',
			tbar: ['网件信息', '->',{
				//text: '帮助',
				iconCls: 'icon-help'
			}],
			buttons: [{
				id: 'btn-ww-enable',
				text: '使用',
				disabled: true,
				iconCls: 'icon-enable'
			},{
				id: 'btn-ww-disable',
				text: '停用',
				disabled: true,
				iconCls: 'icon-disable'
			},{
				id: 'btn-ww-upgrade',
				text: '升级',
				disabled: true,
				iconCls: 'icon-upgrade'
			}]
		}]
	});
};
Ext.extend(JW.core.WebwaresPanel, Ext.Panel, {
	
});