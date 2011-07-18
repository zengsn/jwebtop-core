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
	var thisPanel = this;
	var buttonHandler = function(btn, state) {
		var cardId = btn.id.replace('btn-', 'card-');
		if (state) {
			thisPanel.layout.setActiveItem(cardId);
		} else {
			//Ext.getCmp('btn-mywebwares').toggle(true, false);
			//thisPanel.layout.setActiveItem(0);
		}
	};
	JW.core.WebwaresPanel.superclass.constructor.call(this, {
		id:'webwares-browser',
        layout:'card',
        activeItem: 0,
        defaults: {border: false},
        border: true,
		tbar: [' ', ' ', ' ', {
			id: 'btn-mywebwares',
			text: '我的网件',
			iconAlign: 'top',
			iconCls: 'icon-mywebwares',
			enableToggle: true,
			toggleGroup: 'webwares',
			toggleHandler: buttonHandler,
			pressed: true,
            scale: 'large'
		}, ' ', ' ', ' ', {
			id: 'btn-recommandwebwares',
			text: '推荐网件',
			iconAlign: 'top',
			iconCls: 'icon-recommandwebwares',
			enableToggle: true,
			toggleGroup: 'webwares',
			toggleHandler: buttonHandler,
			pressed: false,
            scale: 'large'
		}, ' ', ' ', ' ', {
			id: 'btn-allwebwares',
			text: '所有网件',
			iconAlign: 'top',
			iconCls: 'icon-allwebwares',
			enableToggle: true,
			toggleGroup: 'webwares',
			toggleHandler: buttonHandler,
			pressed: false,
            scale: 'large'
		}, ' ', ' ', ' ', {
			id: 'btn-webwarecd',
			text: '网件 CD',
			iconAlign: 'top',
			iconCls: 'icon-webwarecd',
			enableToggle: true,
			toggleGroup: 'webwares',
			toggleHandler: buttonHandler,
			pressed: false,
            scale: 'large'
		}, ' ', ' ', ' ', {
			id: 'btn-upgradewebwares',
			text: '网件升级',
			iconAlign: 'top',
			iconCls: 'icon-upgradewebwares',
			enableToggle: true,
			toggleGroup: 'webwares',
			toggleHandler: buttonHandler,
			pressed: false,
            scale: 'large'
		}, ' ', ' ', ' ', {
			id: 'btn-uninstallwebwares',
			text: '网件卸载',
			iconAlign: 'top',
			iconCls: 'icon-uninstallwebwares',
			enableToggle: true,
			toggleGroup: 'webwares',
			toggleHandler: buttonHandler,
			pressed: false,
            scale: 'large'
		}, ' ', ' ', ' ', {
			id: 'btn-topwebwares',
			text: '网件排名',
			iconAlign: 'top',
			iconCls: 'icon-topwebwares',
			enableToggle: true,
			toggleGroup: 'webwares',
			toggleHandler: buttonHandler,
			pressed: false,
            scale: 'large'
		}, {
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
        }],
        items: [ new JW.core.WebwaresGridPanel({
        	id: 'card-mywebwares'
		}),new JW.core.WebwareDetailPanel({
			id: 'card-mywebwares-detail'
		}),{
        	id: 'card-recommandwebwares',
        	html: '推荐网件'
		},{
        	id: 'card-allwebwares',
        	html: '所有网件'
		},{
        	id: 'card-webwarecd',
        	html: '网件 CD'
		},{
        	id: 'card-upgradewebwares',
        	html: '升级网件'
		},{
        	id: 'card-uninstallwebwares',
        	html: '卸载网件'
		},{
        	id: 'card-topwebwares',
        	html: '网件排名'
		}]
	});
};
Ext.extend(JW.core.WebwaresPanel, Ext.Panel, {
	
});

/**
 * 网件列表。
 */
JW.core.WebwaresGridPanel = function(config) {
	this.id = config.id;
	var store = new Ext.data.Store({
		autoLoad: true,
		url: './preferences-webwares.xml',
		reader: new Ext.data.XmlReader({
			record: 'webware',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    'id', 'name', 'author', 'screen', 'image', 'status', 'score', 'versions', 'currentVersion', 'release', 'description'
		])
    });
	var renderLogo = function(val) {
		return '<img src=".'+val+'" />';
	};
	var renderInfo = function(value, p, record) {
		return String.format(
                '<a class="webware-name" href="#" id="{0}">{1}</a> ({2})<br /><span class="webware-desc">{3}</span>',
                value, record.data.name, record.data.currentVersion, record.data.description);
	};
	var renderOption = function(value, p, record) {
		if (value == 0) {
			return '<a class="option-link-install" href="./webwares/'+record.data.id+'/install">安装</a>';
		} else {			
			return '<a class="option-link-uninstall" href="./webwares/'+record.data.id+'/upgrade">卸载</div>';
		}
	};
	var renderScore = function(value, p, record) {
		return String.format(
				'<div class="webware-score" style="width:{0}px"></div><div>{1} 分</div>',
                (value/100)*16*5, value);
	};
	JW.core.WebwaresGridPanel.superclass.constructor.call(this, {
		trackMouseOver: true,
		autoExpandColumn: 'name',
		store: store,
		columns: [{
            header: "LOGO",
            dataIndex: 'image',
            width: 56,
            renderer: renderLogo,
            sortable: false
		}, {
            id: 'name',
            header: "网件",
            dataIndex: 'id',
            width: 200,
            renderer: renderInfo,
            sortable:true
        },{
            header: "版本",
            dataIndex: 'currentVersion',
            width: 70,
            align: 'center',
            sortable:true
        },{
            header: "评分",
            dataIndex: 'score',
            width: 90,
            renderer: renderScore,
            align: 'center',
            sortable:true
        },{
            id: 'option',
            header: "操作",
            dataIndex: 'status',
            width: 160,
            renderer: renderOption,
            align: 'center',
            sortable:true
        }],
	    bbar: new Z.ux.PagingToolbarCN({
            pageSize: 10,
            displayInfo: true,
            store: store
        }),        

	    view: new Ext.ux.grid.BufferView({
		    // custom row height
		    rowHeight: 50,
		    // render rows as they come into viewable area.
		    scrollDelay: false
	    }),
	    
	    listeners: {
			'cellclick' : function(grid, rowIndex, columnIndex, e) {
				var record = grid.getStore().getAt(rowIndex);  // Get the Record
			    var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
			    var data = record.get(fieldName);
			    var target = e.getTarget();
			    var className = target.className;
			    var url = '';
			    if (className == 'webware-name') {
			    	e.stopEvent();
			    	e.stopPropagation();
			    	var panel = Ext.getCmp('webwares-browser');
			    	panel.layout.setActiveItem('card-mywebwares-detail');
			    	panel.items.get('card-mywebwares-detail').loadWebware(record.data);
			    } else if (className == 'option-link-install') {
			    	e.stopEvent();
			    	e.stopPropagation();
			    	url = target.href;
			    } else if (className == 'option-link-uninstall') {
			    	e.stopEvent();
			    	e.stopPropagation();
			    	url = target.href;
			    } else if (className == 'option-link-upgrade') {
			    }
			    //send ajax request
			    
			}
		}
	});
};
Ext.extend(JW.core.WebwaresGridPanel, Ext.grid.GridPanel, {
});

/**
 * 网件明细。
 */
JW.core.WebwareDetailPanel = function(config) {
	this.id = config.id;
	this.webware = config.webware;
	JW.core.WebwareDetailPanel.superclass.constructor.call(this, {
		html: '正在加载网件……',
		buttons: [{
			text: '返回',
			handler: function() {
		    	var panel = Ext.getCmp('webwares-browser');
		    	panel.layout.setActiveItem('card-mywebwares');
			}
		}]
	});
};
Ext.extend(JW.core.WebwareDetailPanel, Ext.Panel, {
	loadWebware : function(webware) {
		//alert(webware.id);
	}
});