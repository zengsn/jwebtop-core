/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW');

JW.Message = function(config) {
	JW.Message.superclass.constructor.call(this, 
    {
        id: 'message-win',
        applyTo:'message-win',
        title:'Grid Window',
        //header: false,
        width:160,
        height:100,
        iconCls: 'icon-message',
        closeAction:'hide',
        plain: true,

        layout: 'fit',
        items: new Ext.Panel({
        	html: 'ok'
        })
	});
};
Ext.extend(JW.Message, Ext.Window, {});