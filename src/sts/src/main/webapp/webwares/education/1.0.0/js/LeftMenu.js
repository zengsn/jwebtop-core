
Ext.namespace("JW","JW.webware");
JW.webware.LeftMenu = function(config) {
	var d = Ext.apply( {// default set
				width : 200,
				split : true,
				region : 'west',
				collapseMode :'mini',
				defaults : {
					border : false
				},
				layoutConfig : {
					animate : true
				}
			}, config || {}); 

	config = Ext.apply(d, {
		layout : 'accordion',
		collapsible : true
	});
	
	JW.webware.LeftMenu.superclass.constructor.call(this, config);
	
	//改进，并为增加了个配置项tree!
	for(var i=0;i<this.trees.length;i++)		 
	 	this.add({title:this.trees[i].getRootNode().text,items:[this.trees[i]]});	

	// 事件处理
	//this.addEvents('nodeClick');
	//this.initTreeEvent();
};
Ext.extend(JW.webware.LeftMenu, Ext.Panel,{});

//Ext.extend(JW.webware.LeftMenu, Ext.Panel, {
//	initTreeEvent : function() {
//		if(!this.items) return;
//		for (var i = 0;i < this.items.length; i++) {
//			var p = this.items.itemAt(i);
//			if (p)
//			var t = p.items.itemAt(0);
//			if(t)
//			t.on( {
//				'click' : function(node, event) {
//					if (node && node.isLeaf()) {
//						event.stopEvent();
//						this.fireEvent('nodeClick', node.attributes);
//					}
//				},
//				scope : this
//			});
//		}
//	}
//})
