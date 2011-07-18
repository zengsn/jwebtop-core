// ========tabPanel
//var tabPanel = new Ext.TabPanel({
//	activeTab : 0, // 默认激活第一个tab页
//	animScroll : true, // 使用动画滚动效果
//	enableTabScroll : true, // tab标签页超宽出现滚动条
//	items : [{
//		title : "欢迎页面",
//		height : 600,
//		closable : false,// 不允许关闭
//		html : '<div style="height:600px;padding-top:200px;text-align:center;"><font size=6>欢迎使用教学管理</font></div>'
//	}],
//	listeners : {
//		"contextmenu" : function(tabPanel, myitem, e) {
//			var menu = new Ext.menu.Menu([{
//						text : "关闭当前选项页",
//						handler : function() {
//							if (myitem !=tabPanel.getItem(0)){
//							tabPanel.remove(myitem)
//						}}
//					}, {
//						text : "关闭其他所有选项页",
//						handler : function() {
//							tabPanel.items.each(function(item) {
//										if (item != myitem && item != tabPanel.getItem(0)) {
//											tabPanel.remove(item);
//										}
//									});
//						}
//					}]);
//			menu.showAt(e.getPoint());
//		}
//	}
//});

// ========tabPanel
Ext.namespace('JW', 'JW.webware');
JW.webware.tabPanel = function(config) {
	
	JW.webware.AdministratorPanel.superclass.constructor.call(this, {
		id:'education-tabpanel',
		activeTab : 0, // 默认激活第一个tab页
		animScroll : true, // 使用动画滚动效果
		enableTabScroll : true, // tab标签页超宽出现滚动条
		items : [{
			title : "欢迎页面",
			height : 600,
			closable : false,// 不允许关闭
			html : '<div style="height:600px;padding-top:200px;text-align:center;"><font size=6>欢迎使用教学管理</font></div>'
		}]
	});
};
Ext.extend(JW.webware.tabPanel, Ext.TabPanel, {
	
});