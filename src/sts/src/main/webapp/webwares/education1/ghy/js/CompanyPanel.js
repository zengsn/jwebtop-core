JW.webware.CompanyPanel = function(config) {
	JW.webware.CompanyPanel.superclass.constructor.call(this, config);

	// 加上服务器上的jsp数据生成
	// 生成Company类型
	var proxy = new Ext.data.HttpProxy( {
		url : 'company.jsp'
	});

	var recordType = new Ext.data.Record.create([ {
		name : "id",
		type : "int"
	}, {
		name : "comNum",
		type : "string"
	}, {
		name : "comName",
		type : "string"
	}, {
		name : "comAddress",
		type : "string"
	}]);

	// 定义分析器
	var reader = new Ext.data.JsonReader( {
		totalProperty : "results",
		root : "rows",
		id : "id"
	}, recordType);

	// 定义store
	var ds = new Ext.data.Store( {
		proxy : proxy,
		reader : reader
	});
this.ds=ds;
	// 第二，讲一下cm,grid

	var cm = new Ext.grid.ColumnModel( {
		defaultSortable : true,
		defaultWidth : 180,
		columns : [ {
			header : '编号',
			dataIndex : 'comNum'
		}, {
			header : '名称',
			dataIndex : 'comName'
		}, {
			header : '公司地址',
			width : 300,
			dataIndex : 'comAddress'
		}]
	});
	var pagingBar = new Ext.PagingToolbar({
        pageSize: 10,
        store: ds,
        displayInfo: true,
        displayMsg: '共有 {2}，当前显示 {0} - {1}条',
        emptyMsg: "没有数据"
    });
	var grid = new Ext.grid.GridPanel( {
		cm : cm,
		store : ds,
		width : 660,
		height : 400,
		bbar:pagingBar,
		loadMask:{msg:'正在载入数据,请稍等...'},
		title : '公司列表'
	});
	//ds.load();

	this.add(grid);
	// 第三、调整，tbar分页,工具栏
	
}
Ext.extend(JW.webware.CompanyPanel, Ext.Panel, {});