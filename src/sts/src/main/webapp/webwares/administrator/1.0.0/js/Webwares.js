/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');
/**
 * 网件列表。
 */
JW.webware.WebwaresGridPanel = function(config) {
	var thisGrid = this;
	this.id = config.id;
	var store = new Ext.data.Store({//需要
		autoLoad: true,
		url: './webware.jxp',
		//url: './preferences-webwares.xml',
		baseParams: {
			action: 'search',
			start: 0,
			limit: 25
		},
		reader: new Ext.data.XmlReader({//需要
			record: 'webware',
			id: 'id',
			totalRecords: 'totalCount'
		}, [
		    'id', 'name', 'author', 'screen', 'logo', 'status', 'score', 'versions', 'currentVersion', 'release', 'description'
		])
    });
	var renderLogo = function(value, p, record) {
		return String.format(
                '<img src="./webwares/{0}/{1}/images/{2}" />',
                record.data.id, record.data.currentVersion, value);
		return '<img src="./webwares'+val+'" />';
	};
	var renderInfo = function(value, p, record) {
		return String.format(
                '<a class="webware-name" href="#" id="{0}">{1}</a> ({2})<br /><span class="webware-desc">{3}</span>',
                value, record.data.name, record.data.currentVersion, record.data.description);
	};
	var renderOption = function(value, p, record) {
		return '<a class="option-link-reload" href="./webwares/'+record.data.id+'/install">重新加载</a>';
	};
	var renderScore = function(value, p, record) {
		return String.format(
				'<div class="webware-score" style="width:{0}px"></div><div>{1} 分</div>',
                (value/100)*16*5, value);
	};
	JW.webware.WebwaresGridPanel.superclass.constructor.call(this, {
		trackMouseOver: true,
		autoExpandColumn: 'name',
		store: store,
		columns: [{
            header: "LOGO",
            dataIndex: 'logo',
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
			    	//var panel = Ext.getCmp('webwares-browser');
			    	//panel.layout.setActiveItem('card-mywebwares-detail');
			    	//panel.items.get('card-mywebwares-detail').loadWebware(record.data);
			    } else if (className == 'option-link-reload') {
			    	e.stopEvent();
			    	e.stopPropagation();
			    	url = target.href;
			    	thisGrid.reloadWebware(record.data);
			    } else {
			    }
			    //send ajax request
			    
			}
		}
	});
};
Ext.extend(JW.webware.WebwaresGridPanel, Ext.grid.GridPanel, {
	/* 强制重新加载网件配置 */
	reloadWebware : function(webware) {
		var thisGrid = this;
		Ext.MessageBox.confirm('操作确认', '确定要重新加载网件【'+webware.name+'】吗?', function(btn){
	        if (btn == 'yes') {
	    		Ext.MessageBox.show({
	    			msg: '正在重新加载，请稍候...',
	    			progressText: 'Reloading...',
	    			width:300,
	    			wait:true,
	    			waitConfig: {interval:200},
	    			//icon:'ext-mb-download', 
	    			//animEl: 'mb7',
	    			closable:true
	    		});

				Ext.Ajax.request({
					url: './webware.jxp',
					params: {
						action: 'reload',
						id: webware.id
					}, 
					success: function() {
						Ext.example.msg('操作成功', '网件【{0}】重新加载成功！', webware.name);
						Ext.MessageBox.hide();
						thisGrid.getStore().load({params:{start:0,limit:25}});
					},
					failure: function() {
						Ext.example.msg('操作失败', '网件【{0}】重新加载失败！', webware.name);
						Ext.MessageBox.hide();
					}
				});
	        }
	    });		
	}
});