
DepartmentInfoFormPanel =Ext.extend(Ext.form.FormPanel,{
    constructor:function(){
	 
	DepartmentInfoFormPanel.superclass.constructor.call(this,{
         labelWidth:60,
         defaultType:"textfield",
         defaults:{anchor:"98%"},
         baseCls:"x-plain",
         items:[{
         fieldLabel:"院系代码",
         name:"departmentID"
         },{
         fieldLabel:"系名",
         name:"departmentName"
         
         },{
         fieldLabel:"辅导员",
         name:"assistant"
         },{
         fieldLabel:"联系电话",
         name:"telephone"
         },{
         xtype:"combo",
         fieldLabel:"性别",
         hiddenName:"sex",
         mode:"local",
         displayField:"sex",
         typeAhead:true,
         triggerAction:"all",
         value:"男",
         store:new Ext.data.SimpleStore({
                   fields:["sex"],
                   data:[["男"],["女"]]    
           })
         }]     
     });
    
    
    },
    getValues:function(){
       return Ext.data.Record(this.getForm().getValues());
    },
    setValues:function(_r){
       this.getForm().loadRecord(_r)
    },
    reset:function(){
       this.getForm().reset();
    }
    });
    //***********************
DepartmentInfoWindow =Ext.extend(Ext.Window,{
       form:new DepartmentInfoFormPanel(),
       constructor:function(){
	   DepartmentInfoWindow.superclass.constructor.call(this,{
       plain:true,
       width:300,
       items:this.form,
       modal:true,
       closeAction:"hide",
       buttons:[{
       text:"确 定",
       handler:this.onSubmitClick,
       scope:this
       },{
       text:"取 消",
       handler:this.onCancleClick,
       scope:this
       }]
       }); 
	   //this.addEvents("submit");
	  
        },
       close:function(){
       this.form.reset();
       this.hide();	 
        },
       onSubmitClick:function(){
//       this.fireEvent("submit",this,this.form.getForm().getValues());
//       this.close();
       this.form.getForm().submit({url:'webware/education/dept.jxp', params: {action: 'insert'}, waitMsg:'Saving Data...', submitEmptyText: false});
        } ,
       onCancleClick:function(){
       this.close();
       }
       
    });