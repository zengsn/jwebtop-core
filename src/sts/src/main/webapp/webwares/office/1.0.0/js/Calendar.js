/*!
 * JWebtop.org
 * Copyright(c) 2010 JWebtop.org
 * licensing@jwebtop.org
 * http://www.jwebtop.org/license
 */
Ext.namespace('JW', 'JW.webware');
JW.webware.CalendarPanel = function(config) {	
	this.id = config.id;	
	var addEvent = [];
	var deleteEvent = [];
	var updateEvent = [];
    var calendarStore = new Ext.data.JsonStore({
        root: 'calendars',
        idProperty: 'id',
        proxy: new Ext.data.HttpProxy({
			method:'POST',
			prettyUrls: false,
			url:"./calendar.jxp?action=calendars"
		}),
        autoLoad: true,
        fields: [
            {name:'CalendarId', mapping: 'id', type: 'int'},
            {name:'Title', mapping: 'title', type: 'string'}
        ],
        sortInfo: {
            field: 'CalendarId',            
            direction: 'ASC'
        },
        listeners:{
        	datachanged:function(store){
alert(0);
        		
			}
        }
    });  
    var eventBindStore = new Ext.data.JsonStore({
        root: 'evts',
        autoLoad: true,
		proxy: new Ext.data.HttpProxy({
			method:'POST',
			prettyUrls: false,
			url:"./calendar.jxp?action=events"
		}),		
        fields: Ext.calendar.EventRecord.prototype.fields.getRange(),
        listeners:{
        	datachanged:function(store){
				var recordData=[];
				Ext.each(store.getRange(),function(record){
				    recordData.push(record.data);
				});
				//var jsonData=Ext.encode(recordData);
//alert("{\"evts\":"+jsonData+"}");

				Ext.getCmp('app-calendar').eventStore.loadData({'evts':recordData});
//alert(Ext.getCmp('app-calendar').eventStore.getCount());
			}
        }
    });
    
    var eventStore = new Ext.data.JsonStore({
    	bindStore: eventBindStore,
        root: 'evts',
        proxy: new Ext.data.MemoryProxy(),
        fields: Ext.calendar.EventRecord.prototype.fields.getRange(),
        sortInfo: {
            field: 'StartDate',
            direction: 'ASC'
        },
        listeners:{
        	datachanged:function(store){
			}
        }
    });

   var calendar = new Ext.Panel({
	   id:'app-center',
       title: '...', // will be updated to view date range
       layout: 'border',
       boxMinHeight:400,
       items: [{
           region: 'west',
           id:'app-west',
           width: 176,
           bodyStyle:{
        	   'background':'#dfe8f7'
           },
           buttonAlign: 'center',
           items: [{
               xtype: 'datepicker',
               id: 'app-nav-picker',
               width:175,
               listeners: {
                   'select': function(dp, dt){
                	     Ext.getCmp('app-calendar').setStartDate(dt);
                       }
               }
           },{
        	   xtype : 'button',
        	   text : '保&nbsp;&nbsp;&nbsp;存',
        	   height : 30,
        	   width : 170,
        	   handler : function(){
        	   	   
//alert(addEvent.length+"  "+updateEvent.length+"  "+deleteEvent.length);
        		   if(addEvent.length > 0 ){
//alert('add:'+Ext.encode(addEvent));        		   	   
        			   sumbit("addEvent", addEvent);
        			   addEvent = [];
        		   }
        		   if(updateEvent.length > 0){
//alert('update:'+Ext.encode(updateEvent));
        			   sumbit("updateEvent", updateEvent);        			   
	                   updateEvent = [];
        		   }
        		   if(deleteEvent.length > 0){
//alert('delete:'+Ext.encode(deleteEvent));
        			   sumbit("deleteEvent", deleteEvent);
        			   deleteEvent = [];
        		   }        		   
        	  } 
           }]
       },{
           xtype: 'calendarpanel',
           eventStore: eventStore,
           id:'app-calendar',
           calendarStore: calendarStore,
           border: false,
           region: 'center',
           showDayView: true,    //按日查看
           showWeekView: true,   //按周查看
           monthViewCfg: {
               showHeader: true,
               showWeekLinks: true,
               showWeekNumbers: true
           },
           listeners: {
               'eventclick': {
                   fn: function(vw, rec, el){
                       showEditWindow(rec, el);
                   },
                   scope: this
               },
               'eventadd':{ 
            	   fn : function(cp, rec){
//alert(addEvent.length);
                       addEvent.push(rec.data);
                   },
                   scope : this
               },
               'eventupdate': {
                   fn: function(cp, rec){
                	  if(addEvent.length > 0){
                		  for(var i = 0; i < addEvent.length; i++){
                			  if(addEvent[i].EventId == rec.get('EventId')){
                				  return;
                			  }
                		  }
                	  }
                      updateEvent.push(rec.data);
                   },
                   scope: this
               },
               'eventdelete': {
                   fn: function(cp, rec){
                	   if(addEvent.length > 0){
                 		  for(var i = 0; i < addEvent.length; i++){
                 			  if(addEvent[i].EventId == rec.get('EventId')){
                 				  addEvent.splice(i,1);
                 				  return;
                 			  }
                 		  }
                 	  }
                	  if(updateEvent.length > 0){
                  		  for(var i = 0; i < updateEvent.length; i++){
                  			  if(updateEvent[i].EventId == rec.get('EventId')){
                  				updateEvent.splice(i,1);
                  				  break;
                  			  }
                  		  }
                  	  }
                       deleteEvent.push(rec.get('EventId'));
                   },
                   scope: this
               },
               'viewchange': {
                   fn: function(p, vw, dateInfo){
                       if(dateInfo !== null){
                           calendar.findByType('datepicker')[0].setValue(dateInfo.activeDate);
                           updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                       }
                   },
                   scope: this
               },
               'dayclick': {
                   fn: function(vw, dt, ad, el){
                       showEditWindow({
                           StartDate: dt,
                           IsAllDay: ad
                       }, el);
                   },
                   scope: this
               },
               'rangeselect': {
                   fn: function(win, dates, onComplete){
                       showEditWindow(dates);
                   },
                   scope: this
               },
               'eventmove': {
                   fn: function(vw, rec){
                       rec.commit();
                       updateEvent.push(rec.data);
                   },
                   scope: this
               },
               'eventresize': {
                   fn: function(vw, rec){
                       rec.commit();
                       updateEvent.push(rec.data);
                   },
                   scope: this
               },
               'eventdelete': {
                   fn: function(win, rec){
                       eventStore.remove(rec);
                       deleteEvent.push(rec.get('EventId'));
                   },
                   scope: this
               },
               'render':{
            	   fn : function(panel){
alert("aa:" +panel.eventStore.getCount());            
            	   //eventStore.removeAll();
                   }
               }
           }
       }]
    });
   
   var sumbit = function(method, event){
   	   Ext.Msg.wait("正在保存，请稍候...","提示");
       Ext.Ajax.request({
           url : './calendar.jxp?action='+method,
           params : {
                  event : Ext.encode(event)
           },
           method : 'POST',           
           success : function(resp,opts) {			                                	
                     //msgTip.hide();
                      var respText = Ext.util.JSON.decode(resp.responseText);
//alert(respText);
		                if (respText.success == true) {
			            // 服务器端数据成功删除后，同步删除客户端列表中的数据
//alert(respText.info);         
		                	   event = [];
					           showMsg(respText.msg);
				         } else {
					           showMsg(respText.msg);
				        }
           }
       });
   }
   
   var showMsg = function(msg){
	   Ext.Msg.alert('提示', msg);
   }
   var updateTitle =  function(startDt, endDt){
       var p = calendar;
       
       if(startDt.clearTime().getTime() == endDt.clearTime().getTime()){
           p.setTitle(startDt.format('F j, Y'));
       }
       else if(startDt.getFullYear() == endDt.getFullYear()){
           if(startDt.getMonth() == endDt.getMonth()){
               p.setTitle(startDt.format('F j') + ' - ' + endDt.format('j, Y'));
           }
           else{
               p.setTitle(startDt.format('F j') + ' - ' + endDt.format('F j, Y'));
           }
       }
       else{
           p.setTitle(startDt.format('F j, Y') + ' - ' + endDt.format('F j, Y'));
       }
   };
   var showEditWindow = function(rec, animateTarget){
//alert(this.editWin); 
	   //var panel = Ext.getCmp();
       if(!this.editWin){
           this.editWin = new Ext.calendar.EventEditWindow({
               calendarStore: calendarStore,
				listeners: {
					'eventadd': {
						fn: function(win, rec){
							//alert(addEvent);
							win.hide();
							rec.data.IsNew = false;
//alert(eventStore.getCount());
//alert(calendar.getId());
                            Ext.getCmp('app-calendar').eventStore.add(rec);
                            Ext.getCmp('app-calendar').fireEvent('eventadd', Ext.getCmp('app-calendar'), rec);
							//addEvent.push(rec.data);
						},
						scope: this
					},
					'eventupdate': {
						fn: function(win, rec){
							win.hide();
							rec.commit();
							Ext.getCmp('app-calendar').fireEvent('eventupdate', Ext.getCmp('app-calendar'), rec);
		                    //updateEvent.push(rec.data);
						},
						scope: this
					},
					'eventdelete': {
						fn: function(win, rec){
							win.hide();
							Ext.getCmp('app-calendar').fireEvent('eventdelete', Ext.getCmp('app-calendar'), rec);
							Ext.getCmp('app-calendar').eventStore.remove(rec);
						},
						scope: this
					},
                   'editdetails': {
                       fn: function(win, rec){
                           win.hide();
                           Ext.getCmp('app-calendar').showEditForm(rec);
                       }
                   }
				}
           });
       }
       this.editWin.show(rec, animateTarget);
	};

     
     JW.webware.CalendarPanel.superclass.constructor.call(this, {
	   	items: [{       	
	   		border: false,
            layout:'fit',
            items:[calendar]
        }]
	});
};
Ext.extend(JW.webware.CalendarPanel, Ext.Panel, {
	
});