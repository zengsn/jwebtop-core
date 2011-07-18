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
JW.webware.MedicalTreatmentPanel = function(config) {
	Ext.apply(this,config);
	  var xd = Ext.data;

	    var store = new Ext.data.JsonStore({
	        url: 'get-images.php',
	        root: 'images',
	        fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
	    });
	    store.load();

	    var tpl = new Ext.XTemplate(
			'<tpl for=".">',
	            '<div class="thumb-wrap" id="{name}">',
			    '<div class="thumb"><img src="{url}" title="{name}"></div>',
			    '<span class="x-editable">{shortName}</span></div>',
	        '</tpl>',
	        '<div class="x-clear"></div>'
		);
	JW.webware.MedicalTreatmentPanel.superclass.constructor.call(this, {
		id:'medicaltreatment-panel',
		frame:true,
        width:535,
        autoHeight:true,
        collapsible:true,
        layout:'fit',
        title:'Simple DataView (0 items selected)',

        items: new Ext.DataView({
            store: store,
            tpl: tpl,
            autoHeight:true,
            multiSelect: true,
            overClass:'x-view-over',
            itemSelector:'div.thumb-wrap',
            emptyText: 'No images to display',

            plugins: [
                new Ext.DataView.DragSelector(),
                new Ext.DataView.LabelEditor({dataIndex: 'name'})
            ],

            prepareData: function(data){
                data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                data.sizeString = Ext.util.Format.fileSize(data.size);
                data.dateString = data.lastmod.format("m/d/Y g:i a");
                return data;
            },
            
            listeners: {
            	selectionchange: {
            		fn: function(dv,nodes){
            			var l = nodes.length;
            			var s = l != 1 ? 's' : '';
            			panel.setTitle('Simple DataView ('+l+' item'+s+' selected)');
            		}
            	}
            }
        })
	});
};
Ext.extend(JW.webware.MedicalTreatmentPanel, Ext.Panel, {
	
});