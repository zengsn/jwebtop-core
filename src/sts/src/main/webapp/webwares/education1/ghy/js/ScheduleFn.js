function scheduleFn() {
	if(!scheduleIsOpen  ){
	var tabPage = innerTabPanel.add({
				title : "个人课表",
				height : 600,
				closable : true,
				listeners : {
					beforedestroy : function() {
						scheduleIsOpen  = false;
					}
				}
			});
	innerTabPanel.setActiveTab(tabPage);
	//设置页面已经打开
	scheduleIsOpen  =true;
	
	}
}