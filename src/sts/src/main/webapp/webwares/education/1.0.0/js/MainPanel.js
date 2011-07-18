Ext.ns("JW", "JW.webware");
   JW.webware.mainTab=function(config){
	     var thisPanel =this;
	     config=config||{};
	      config=Ext.applyIf(config,{
	      	    id:'mainTab',
				style : 'padding:0 6px 0 0',
				autoScroll : true,
				region : 'center',
				deferredRender : false,
				activeTab : 0,
				resizeTabs : true,
				inTabWidth : 100,
				tabWidth : 90,
				enableTabScroll : true,
				items : [{
					title : '我的首页',
					html : 'helloworld'
				}]
			});
		  Ext.apply(this,config);
		  JW.webware.mainTab.superclass.constructor.apply(this,arguments);
   };
   Ext.extend(JW.webware.mainTab,Ext.TabPanel,{});
//JW.webware.MainingPanel = Ext.extend(Ext.TabPanel, {
//	initComponent : function() {
//		// 一些初始化工作
//	JW.webware.MainingPanel.superclass.initComponent.call(this);
//		this._cache = {};
//
//	},
//	loadTab : function(node) {
//		var n = this.getComponent(node.id);
//		if (n) {
//			this.setActiveTab(n);
//		} else {
//			var c = {
//				'id' : node.id,
//				'title' : node.text,
//				 closable : true
//			};
//			var pn = this.findPanel(node.id);
//			n = this.add(pn ? new pn(c) : Ext.apply(c, {
//				html : '你还没有实现该页面！'
//			}))
//
//			n.show().doLayout();
//			//this.setActiveTab(n);
//		}
////		if (n.ds)
////			n.ds.load({params:{start:0, limit:10}});
//	},
//	findPanel : function(name) {
//		var ret = this._cache[name];
//		if (!ret) {
//			var pn = (this.ns ? this.ns : 'JW.webware') + "."
//					+ Ext.util.Format.capitalize(name) + 'Panel'||'GridPanel';
//			var ret = eval(pn);
//		}
//		return ret;
//	},
//	addPanel : function(name, panel) {
//		if (!this._cache)
//			this._cache = {};
//		this._cache[name] = panel;
//	}
//});
