JW.webware.ShowPanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
	JW.webware.ShowPanel.superclass.initComponent.call(this);
		this._cache = {};
	},
	loadTab : function(btn) {
		var n = this.getComponent(btn.id);
		if (n) {
			this.setActiveTab(n);
		} else {
			this.removeAll(true);
			var c = {
				'id' : btn.id,
				'title' : btn.text
			};
			var pn = this.findPanel(btn.id);
			n = this.add(pn ? new pn(c) : Ext.apply(c, {
				html : '<h1>你还没有实现该页面！</h1>'
			}));
			n.show().doLayout();
		}

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
