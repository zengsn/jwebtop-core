	var root = new Ext.tree.TreeNode({
				id : "root",
				text : "相关操作"
			});
	
	var lookover_schedule = new Ext.tree.TreeNode({
		id : "lookover_schedule",
		text : "课表查询",
		listeners:{
			"click":scheduleFn
			}
	});
	
	
	root.appendChild(lookover_schedule);
	var treeMenu = new Ext.tree.TreePanel({
				border : false,
				root : root,
				rootVisible : false
			});
	
	
	//=========添加布尔类型变量，用来判断该页面是否打开
	var scheduleIsOpen = false;
