Ext.namespace('JW', 'JW.webware');
JW.webware.CourseChartPanel=function(config){
	thisGrid = this;
	config = config || {};
		   var store = new Ext.data.JsonStore({
        fields:['name', 'number'],
        data: [
            {name:'Java程序设计', number: 245000},
            {name:'数据库概论', number: 240000},
            {name:'数据结构', number: 355000},
            {name:'UML建模语言', number: 375000},
            {name:'C#程序设计', number: 490000},
            {name:'Ext Js', number: 495000},
            {name:'PHP动态网页设计', number: 520000},
            {name:'JavaScript', number: 620000}
        ]
    });
	config = Ext.applyIf(config, {
	   title:"选课情况",
	   width:660,
	   autoheight:true,
	   layout:'fit',
	   items: {
            xtype: 'columnchart',
            store: store,
            url:'../../../resources/charts.swf',
            xField: 'name',
            yAxis: new Ext.chart.NumericAxis({
                displayName: 'number',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),
            tipRenderer : function(chart, record, index, series){
                if(series.yField == 'number'){
                    return Ext.util.Format.number(record.data.number, '0,0') + ' visits in ' + record.data.name;
                }
            },
            chartStyle: {
                padding: 10,
                animationEnabled: true,
                font: {
                    name: 'Tahoma',
                    color: 0x444444,
                    size: 11
                },
                dataTip: {
                    padding: 5,
                    border: {
                        color: 0x99bbe8,
                        size:1
                    },
                    background: {
                        color: 0xDAE7F6,
                        alpha: .9
                    },
                    font: {
                        name: 'Tahoma',
                        color: 0x15428B,
                        size: 10,
                        bold: true
                    }
                },
                xAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xeeeeee}
                },
                yAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xdfe8f6}
                }, series: [{
                type: 'column',
                displayName: '选课人数',
                yField: 'number',
                style: {
                    image:'bar.gif',
                    mode: 'stretch',
                    color:0x99BBE8
                }
            }]
            }
        }
	   
   });
	Ext.apply(this, config);
	JW.webware.CourseChartPanel.superclass.constructor.call(this,arguments);
};
Ext.extend(JW.webware.CourseChartPanel,Ext.Panel,{});
//**************************************************************

//JW.webware.ChartPanel=function(config){
//	thisGrid = this;
//	config = config || {};
//
//	config = Ext.applyIf(config, 
//	  {
//      
//        items: {
//            xtype: 'columnchart',
//            store: store,
//            url:'../../../resources/charts.swf',
//            xField: 'name',
//            yAxis: new Ext.chart.NumericAxis({
//                displayName: 'number',
//                labelRenderer : Ext.util.Format.numberRenderer('0,0')
//            }),
//            tipRenderer : function(chart, record, index, series){
//                if(series.yField == 'number'){
//                    return Ext.util.Format.number(record.data.number, '0,0') + ' visits in ' + record.data.name;
//                }
//            },
//            chartStyle: {
//                padding: 10,
//                animationEnabled: true,
//                font: {
//                    name: 'Tahoma',
//                    color: 0x444444,
//                    size: 11
//                },
//                dataTip: {
//                    padding: 5,
//                    border: {
//                        color: 0x99bbe8,
//                        size:1
//                    },
//                    background: {
//                        color: 0xDAE7F6,
//                        alpha: .9
//                    },
//                    font: {
//                        name: 'Tahoma',
//                        color: 0x15428B,
//                        size: 10,
//                        bold: true
//                    }
//                },
//                xAxis: {
//                    color: 0x69aBc8,
//                    majorTicks: {color: 0x69aBc8, length: 4},
//                    minorTicks: {color: 0x69aBc8, length: 2},
//                    majorGridLines: {size: 1, color: 0xeeeeee}
//                },
//                yAxis: {
//                    color: 0x69aBc8,
//                    majorTicks: {color: 0x69aBc8, length: 4},
//                    minorTicks: {color: 0x69aBc8, length: 2},
//                    majorGridLines: {size: 1, color: 0xdfe8f6}
//                }, series: [{
//                type: 'column',
//                displayName: '选课人数',
//                yField: 'number',
//                style: {
//                    image:'bar.gif',
//                    mode: 'stretch',
//                    color:0x99BBE8
//                }
//            }]
//            }
//        }
//    }
//   );
//	Ext.apply(this, config);
//	JW.webware.ChartPanel.superclass.constructor.call(this,arguments);
//};
//Ext.extend(JW.webware.ChartPanel,Ext.Panel,{});
//

