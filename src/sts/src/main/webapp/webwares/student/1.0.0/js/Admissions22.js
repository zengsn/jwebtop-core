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
JW.webware.AdmissionsPanel = function(config) {
	Ext.apply(this,config);
	var tabpanel = new Ext.TabPanel({
        enableTabScroll : true,
        deferredRender : false,    
        margins : '5 0 0 0',
       
        activeTab : 0
    });
	var addPanel = function(btn, event) {
        var n;
        var innerPanel = {};
        n = tabpanel.getComponent(btn.id);
        if(n) {
        	    tabpanel.setActiveTab(n);
        	    return;
               }
        if (btn.id) {			
			if (btn.id == 'regulation') {
				innerPanel = new JW.webware.RecordsPanel({ id : btn.id});
			}else if(btn.id == 'sign-up') {
				innerPanel = new JW.webware.SignupPanel({ id : btn.id});
			}else if(btn.id == 'enroll') {
				innerPanel = new JW.webware.EnrollPanel({ id : btn.id});
			}else if(btn.id == 'enrolled') {
				innerPanel = new JW.webware.EnrolledPanel({ id : btn.id});
			}
			}
         n = tabpanel.add( {
        	                title : btn.text,
        	                items:innerPanel
            });
        tabpanel.setActiveTab(n);
    };
	JW.webware.AdmissionsPanel.superclass.constructor.call(this, {
		id:'admissions-panel',
		layout: 'border',
		defaults: {
        collapsible: true,
        split: true
        },
        items: [{
        	title:'菜单栏',
            region: 'west',
            collapseMode: 'mini',
            margins: '0 0 0 5',
            width: 120,
            defaultType:"button",
            defaults:{width:'90%',style: {  
            marginTop: '5px',
            marginBottom: '5px',
		    marginLeft:'5px',
		    marginRight:'5px'
            },scale: 'medium',
            listeners : {click : addPanel }},
            items:[{
            	text:'招生简章',
            	id:'regulation'       
            },{
            	text:'学生报名',
            	id:'sign-up'
            
            },{
            	text:'录取工作',
                id:'enroll'
               
            },{
            	text:'已录取学生',
            	id:'enrolled'
               
            }]
        },{

            region: 'center',
            collapsible: false,
            items:[tabpanel]
        }]
	});
};
Ext.extend(JW.webware.AdmissionsPanel, Ext.Panel, {
	
});