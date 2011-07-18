/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');

/**
 * 招生工作。
 * @param config
 */
JW.webware.ClassmatesPanel = function(config) {
	Ext.apply(this,config);
	flash=function(){
		Ext.MessageBox.alert("原来就这么简单！");
		
	};
	JW.webware.ClassmatesPanel.superclass.constructor.call(this, {
		id:'classmates-panel',
		width:300,
		height:200,
		html:'<h1>您好先生</h1>',
		tbar:[{text:'点击',handler: flash}],
		bbar:[{text:'退出'}]
	});
};
Ext.extend(JW.webware.ClassmatesPanel, Ext.Panel, {
	
});