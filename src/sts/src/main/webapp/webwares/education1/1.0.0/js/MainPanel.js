//Ext.ns("JW", "JW.webware", "JW.Util", "JW.webware.Department");
JW.webware.MainingPanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		// 一些初始化工作
	JW.webware.MainingPanel.superclass.initComponent.call(this);
		this._cache = {};

	},
	loadTab : function(node) {
		var n = this.getComponent(node.id);
		if (n) {
			this.setActiveTab(n);
		} else {
			this.removeAll(true);
			var c = {
				'id' : node.id,
				'title' : node.text
			};
			var pn = this.findPanel(node.id);
			n = this.add(pn ? new pn(c) : Ext.apply(c, {
				html : '<h1>你还没有实现该页面！</h1>'
			}));

			n.show().doLayout();
			//this.setActiveTab(n);
		}
//		if (n.ds)
//			n.ds.load({params:{start:0, limit:10}});
	},
	findPanel : function(name) {
		var ret = this._cache[name];
		if (!ret) {
			var pn = (this.ns ? this.ns : 'JW.webware') + "."
					+ Ext.util.Format.capitalize(name) + 'Panel';
			var ret = eval(pn);
		}
		return ret;
	},
	addPanel : function(name, panel) {
		if (!this._cache)
			this._cache = {};
		this._cache[name] = panel;
	}
});
