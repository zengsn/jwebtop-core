/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');


JW.webware.Modelpanel = function(config) {
	Ext.apply(this,config);
	flash=function(){
		Ext.MessageBox.alert("原来就这么简单！");
		
	};
	JW.webware.Modelpanel.superclass.constructor.call(this, {
		
		title:"hello",
		width:300,
		height:200,
		html:'<h1>您好先生</h1>',
		tbar:[{text:'点击',handler: flash}],
		bbar:[{text:'退出'}]
		
	});
};


Ext.extend(JW.webware.Modelpanel, Ext.Panel, {
	
});