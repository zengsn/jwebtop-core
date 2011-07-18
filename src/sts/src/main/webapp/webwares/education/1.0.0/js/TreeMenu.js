  Ext.namespace('JW', 'JW.webware');
    JW.webware.TreeMenu =function(config){
	  var thisPanel =this;
	  config=config||{};
	  var root=new Ext.tree.AsyncTreeNode( {
					text : "学院管理",
					expanded : true,
					children : [ {
						id : 'college',
						text : "学院管理",
						iconCls:'dept-manager',
						leaf : true
					}, {
						id : "coursemgmt",
						text : "学科管理",
						iconCls:'course-manager',
						leaf : true
					}, {
						id : "deptmgmt",
						text : "系别管理",
						iconCls:'department-manager',
						leaf : true
					},{
						id : "classmgmt",
						text : '班级管理',
						iconCls:'class-manager',
						leaf : true
					}, {
						id : "teachermgmt",
						text : "教师管理",
						iconCls:'teachermgmt',
						leaf : true
					},{
						id : "coursechart",
						text : "选课情况",
						iconCls:'coursechart',
						leaf : true
					}, {
						id : "namebook",
						text : "点名册",
						iconCls:'namebook',
						leaf : true
					}]
				});
	  
	  config=Ext.applyIf(config,{
		  region:'west',
		  border : false,
		  rootVisible : false,
		  //renderTo:'container',
		  root:root,
		  loader:new Ext.tree.TreeLoader(),
		  listeners:{'click':function(node){
		  var id=node.id;
		  //var title=node.text;
		  var mainTab = Ext.getCmp('mainTab');
		  if(id=='namebook'){
		  
		  var tabItem=mainTab.getItem('panel-namebook');
		  if(tabItem==null){
			  tabItem=mainTab.add(new JW.webware.NameBookPanel());
			  mainTab.activate(tabItem);
			  
		  }
		 
		  }else if(id=='college'){
		  	var tabItem=mainTab.getItem('panel-college');
		  if(tabItem==null){
			  tabItem=mainTab.add(new JW.webware.CollegePanel());
			  mainTab.activate(tabItem);
			  
		  }
		  }else if(id=='teachermgmt'){
		  	var tabItem=mainTab.getItem('panel-teachermgmtgroup');
		  if(tabItem==null){
			  tabItem=mainTab.add(new JW.webware.TeacherMgmtPanel());
			  mainTab.activate(tabItem);
			  
		  }
		  }else if(id=='course-manager'){
		  	var tabItem=mainTab.getItem('panel-coursemgmt');
		  if(tabItem==null){
			  tabItem=mainTab.add(new JW.webware.CourseMgmtPanel());
			  mainTab.activate(tabItem);
			  
		  }
		  }
		  else{
			  mainTab.activate(0);
		  }
		  }}
	  });
	  Ext.apply(this,config);
	 JW.webware.TreeMenu.superclass.constructor.apply(this,arguments);
	 
  };
  Ext.extend(JW.webware.TreeMenu,Ext.tree.TreePanel,{});
//  Ext.namespace('JW', 'JW.webware');
//    JW.webware.TreeMenu =function(config){
//	  var thisPanel =this;
//	  config=config||{};
//	  var root=new Ext.tree.AsyncTreeNode( {
//					text : "学院管理",
//					expanded : true,
//					children : [ {
//						id : 'school',
//						text : "学院管理",
//						iconCls:'dept-manager',
//						leaf : true
//					}, {
//						id : "coursemgmt",
//						text : "学科管理",
//						iconCls:'course-manager',
//						leaf : true
//					}, {
//						id : "deptmgmt",
//						text : "系别管理",
//						iconCls:'course-manager',
//						leaf : true
//					},{
//						id : "classmgmt",
//						text : '班级管理',
//						iconCls:'course-manager',
//						leaf : true
//					}, {
//						id : "teachermgmt",
//						text : "教师管理",
//						iconCls:'teachermgmt',
//						leaf : true
//					},{
//						id : "coursechart",
//						text : "选课情况",
//						iconCls:'coursechart',
//						leaf : true
//					}, {
//						id : "namebook",
//						text : "点名册",
//						iconCls:'namebook',
//						leaf : true
//					}]
//				});
//	  
//	  config=Ext.applyIf(config,{
//		  border : false,
//		  rootVisible : false,
//		  root:root,
//		  loader:new Ext.tree.TreeLoader()
////		  ,
////		  listeners:{'click':function(){
////		  var id=node.id;
////		  if(id=='namebooke'){
////		  var mainTab = new JW.webware.MainingPanel();
////		  var tabItem=mainTab.getItem('namebookpanel');
////		  tabItem=mainTab.add(new JW.webware.NameBookPanel());
////		  }
////		  }}
//	  });
//	  Ext.apply(this,config);
//	 JW.webware.TreeMenu.superclass.constructor.apply(this,arguments);
//	 
//  };
//  Ext.extend(JW.webware.TreeMenu,Ext.tree.TreePanel,{});