/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW');
JW.Webware = function(config){
    Ext.apply(this, config);
    JW.Webware.superclass.constructor.call(this);
    this.init();
}

Ext.extend(JW.Webware, Ext.util.Observable, {
    init : Ext.emptyFn
});