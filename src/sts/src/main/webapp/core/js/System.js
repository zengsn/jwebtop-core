/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */

var WEBWARES = []; // Holding webwares

JW.System = function(cfg){
    Ext.apply(this, cfg);
    this.addEvents({
        'ready' : true,
        'beforeunload' : true
    });

    Ext.onReady(this.initSystem, this);
};

Ext.extend(JW.System, Ext.util.Observable, {
    isReady: false,
    startMenu: null,
    webwares: null,

    getStartConfig : function(){

    },

    initSystem : function(){
    	this.startConfig = this.startConfig || this.getStartConfig();

        this.webtop = new JW.Webtop(this);

		this.launcher = this.webtop.taskbar.startMenu;

		this.webwares = this.getWebwares();
        if(this.webwares){
            this.initWebwares(this.webwares);
        }
        
        // init quick lunch buttons
		this.quickButtons = this.getQuickButtons();
        if (this.quickButtons) {
        	this.initQuickButtons(this.quickButtons);
        }
        
        // init tray icons
        this.trayButtons = this.getTrayButtons();
        if (this.trayButtons) {
        	this.initTrayButtons(this.trayButtons);
        }

        this.init();

        Ext.EventManager.on(window, 'beforeunload', this.onUnload, this);
		this.fireEvent('ready', this);
        this.isReady = true;
    },

    getQuickButtons: Ext.emptyFn,
    getTrayButtons: Ext.emptyFn,
    getWebwares : Ext.emptyFn,
    addWebware : function(webware) {
    	if (!(this.webwares)) {
    		this.webwares = [];
    	}
    	var length = this.webwares.length;
    	this.webwares[length] = webware;
    },
    init : Ext.emptyFn,
    
    initQuickButtons : function(bs) {
    	for(var i = 0, len = bs.length; i < len; i++){
    		var btn = bs[i];
    		var webware = this.getWebware(btn);
    		//var win = webware.createWithoutShow();
    		if (webware) {
    			this.webtop.taskbar.addQuickButton(webware);
    		}
    	}
    },
    
    initTrayButtons : function(wins) {
    	for(var i = 0, len = wins.length; i < len; i++){
    		//var webware = this.getWebware(btn);
    		this.webtop.taskbar.addTrayButton(wins[i]);
    	}
    },

    initWebwares : function(ms){
		for(var i = 0, len = ms.length; i < len; i++){
            var m = ms[i];
            this.launcher.add(m.launcher);
            m.system = this;
        }
    },

    getWebware : function(name){
    	var ms = this.webwares;
    	for(var i = 0, len = ms.length; i < len; i++){
    		if(ms[i].id == name || ms[i].appType == name){
    			return ms[i];
			}
        }
        return '';
    },

    onReady : function(fn, scope){
        if(!this.isReady){
            this.on('ready', fn, scope);
        }else{
            fn.call(scope, this);
        }
    },

    getWebtop : function(){
        return this.webtop;
    },

    onUnload : function(e){
        if(this.fireEvent('beforeunload', this) === false){
            e.stopEvent();
        }
    }
});