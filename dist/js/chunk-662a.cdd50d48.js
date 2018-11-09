(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-662a"],{"4fd7":function(t,e,a){"use strict";a.r(e);var i=(a("7f7f"),a("ac6a"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{class:t.itemClasses},[a("div",{class:t.tailClasses}),a("div",{ref:"dot",class:t.headClasses,style:t.customColor},[t._t("dot")],2),a("div",{class:t.contentClasses},[t._t("default")],2)])}),s=a("a322"),n="ivu-timeline",o={name:"TimelineItem",props:{color:{type:String,default:"blue"}},data:function(){return{dot:!1}},mounted:function(){this.dot=!!this.$refs.dot.innerHTML.length},computed:{itemClasses:function(){return"".concat(n,"-item")},tailClasses:function(){return"".concat(n,"-item-tail")},headClasses:function(){var t;return["".concat(n,"-item-head"),(t={},Object(s.a)(t,"".concat(n,"-item-head-custom"),this.dot),Object(s.a)(t,"".concat(n,"-item-head-").concat(this.color),this.headColorShow),t)]},headColorShow:function(){return"blue"==this.color||"red"==this.color||"green"==this.color},customColor:function(){var t={};return this.color&&(this.headColorShow||(t={color:this.color,"border-color":this.color})),t},contentClasses:function(){return"".concat(n,"-item-content")}}},l=a("2877"),r=Object(l.a)(o,i,[],!1,null,null,null);r.options.__file="timeline-item.vue";var c=r.exports,h=c,p="ivu-timeline",m={name:"Timeline",props:{pending:{type:Boolean,default:!1}},computed:{classes:function(){return["".concat(p),Object(s.a)({},"".concat(p,"-pending"),this.pending)]}}},d=Object(l.a)(m,function(){var t=this,e=t.$createElement;return(t._self._c||e)("ul",{class:t.classes},[t._t("default")],2)},[],!1,null,null,null);d.options.__file="timeline.vue";var u=d.exports;u.Item=c;var C=u,v=a("164e"),f=a.n(v),y=(a("de72"),{name:"home",data:function(){return{lineChart:{date:"",type:0,instance:null},typeList:[{value:0,label:"比中预警"},{value:1,label:"人员信息"}],barChart:{date:"",type:0,instance:null},warningList:[],peopleList:[]}},components:{Timeline:C,TimelineItem:h},created:function(){this.getPageData()},mounted:function(){this.$nextTick(function(){var t=this;setTimeout(function(){t.getLineChartData(),t.getBarChartData()},100)})},methods:{watchWindow:function(t){var e=this;window.onresize=function(){setTimeout(function(){e.lineChart.instance&&e.barChart.instance&&(e.lineChart.instance.resize(),e.barChart.instance.resize())},100)}},getPageData:function(){this.getWarningData(),this.getPeopleData()},getLineChartData:function(){var e=this,t={};t.type=this.lineChart.type,this.lineChart.date&&(t.startDate=this.lineChart.date[0],t.endDate=this.lineChart.date[1]),this.$apis.home.getLineChartData(t).then(function(t){"0000"==t.code?e.showTopChart(t.data):e.$notify({title:"数据异常",message:t.data,position:"top-right",type:"warning"})}).catch(function(t){t&&console.log(t)})},getBarChartData:function(){var e=this,t={};t.type=this.barChart.type,this.$apis.home.getBarChartData(t).then(function(t){"0000"==t.code?e.showBottomChart(t.data):e.$notify({title:"数据异常",message:t.data,position:"top-right",type:"warning"})}).catch(function(t){t&&console.log(t)})},getWarningData:function(){var e=this;this.$apis.home.getWarningData({}).then(function(t){"0000"==t.code?e.warningList=t.data:e.$notify({title:"数据异常",message:t.data,position:"top-right",type:"warning"})}).catch(function(t){t&&console.log(t)})},getPeopleData:function(){var e=this;this.$apis.home.getPeopleData({}).then(function(t){"0000"==t.code?e.peopleList=t.data:e.$notify({title:"数据异常",message:t.data,position:"top-right",type:"warning"})}).catch(function(t){t&&console.log(t)})},drawLineChart:function(t,e){var a=f.a.init(this.$refs[t]);a.setOption(e),"home-chart-top"==t?this.lineChart.instance=a:this.barChart.instance=a,this.watchWindow()},showTopChart:function(t){if(!t)return!1;var e=["#4A9BFD","#E95F45","#01A292","#FA9857","#6BB7F3","#23B6AE"],a=t.key,i=t.value,s=[];i[0].forEach(function(t){var e={name:t.name,type:"line",smooth:!0,symbolSize:6,data:[]};s.push(e)}),t.value.forEach(function(t){for(var e=0;e<t.length;e++){var a=t[e];s[e].data.push(a.value)}});var n={backgroundColor:"#fff",color:this.lineChart.type?e.splice(0,3):e,tooltip:{trigger:"axis",axisPointer:{type:"line"},backgroundColor:"#fff",textStyle:{color:"#666"},extraCssText:"box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.1);"},grid:{top:"5%",left:"1%",right:"40px",bottom:"1%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,axisLine:{lineStyle:{color:"#999"}},axisLabel:{interval:"auto"},data:a},yAxis:{type:"value",axisLine:{lineStyle:{color:"#999"}}},series:s};this.lineChart.instance&&this.lineChart.instance.clear(),this.drawLineChart("home-chart-top",n)},showBottomChart:function(t){if(!t)return!1;var e=["#4A9BFD","#E95F45","#01A292","#FA9857","#6BB7F3","#23B6AE"],a=t.key.map(function(t){return t.substring(-1,3)}),i=t.value,s=[];i[0].forEach(function(t){var e={name:t.name,type:"bar",barWidth:5,data:[]};s.push(e)}),t.value.forEach(function(t){for(var e=0;e<t.length;e++){var a=t[e];s[e].data.push(a.value)}});var n={color:this.barChart.type?e.splice(0,3):e,tooltip:{trigger:"axis",backgroundColor:"#fff",textStyle:{color:"#666"},extraCssText:"box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.1);"},grid:{top:10,right:10,bottom:10,left:0,containLabel:!0},xAxis:[{type:"category",data:a,axisLine:{lineStyle:{color:"#999"}},axisLabel:{interval:0}}],yAxis:[{type:"value",axisLine:{lineStyle:{color:"#999"}}}],series:s};this.barChart.instance&&this.barChart.instance.clear(),this.drawLineChart("home-chart-bottom",n)}}}),g=(a("adc5"),Object(l.a)(y,function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"home-container"},[i("div",{staticClass:"home-container-item"},[i("div",{staticClass:"home-item-left royal-paper royal-paper-1 "},[i("div",[i("div",{staticClass:"home-item-title home-chart-title"},[a._v("\n                  比中数据数量\n              ")]),i("div",{staticClass:"home-item-search"},[i("el-date-picker",{staticClass:"home-search-date",attrs:{size:"mini",type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"起始时间","end-placeholder":"结束时间"},on:{change:a.getLineChartData},model:{value:a.lineChart.date,callback:function(t){a.$set(a.lineChart,"date",t)},expression:"lineChart.date"}}),i("el-select",{staticClass:"home-search-select",attrs:{size:"mini",placeholder:"请选择分类"},on:{change:a.getLineChartData},model:{value:a.lineChart.type,callback:function(t){a.$set(a.lineChart,"type",t)},expression:"lineChart.type"}},a._l(a.typeList,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),i("div",{staticClass:"clear"})]),i("div",{staticClass:"home-chart-box"},[i("div",{ref:"home-chart-top",staticClass:"home-chart-wrap"})])]),i("div",{staticClass:"home-item-right royal-paper royal-paper-1"},[i("div",{staticClass:"home-item-title"},[a._v("\n                最新预警\n            ")]),a.warningList.length?i("Timeline",[a._l(a.warningList,function(t,e){return[i("TimelineItem",{key:t.id},e<1?[i("p",{staticClass:"timeline-content timeline-active"},[i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.matchTypeString))]),i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personName))]),i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personIdCard))])]),i("p",{staticClass:"timeline-time timeline-active"},[a._v(a._s(t.time))])]:[i("i",{staticClass:"material-icons timeline-icon",attrs:{slot:"dot"},slot:"dot"},[a._v("fiber_manual_record")]),i("p",{staticClass:"timeline-content"},[i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.matchTypeString))]),i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personName))]),i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personIdCard))])]),i("p",{staticClass:"timeline-time"},[a._v(a._s(t.time))])])]})],2):i("div",{staticClass:"home-item-nodata"},[a._v("\n                      暂无数据\n              ")])],1)]),i("div",{staticClass:"home-container-item"},[i("div",{staticClass:"home-item-left royal-paper royal-paper-1 "},[i("div",[i("div",{staticClass:"home-item-title home-chart-title"},[a._v("\n                  派出所辖区比中数据数量/派出所\n              ")]),i("div",{staticClass:"home-item-search"},[i("el-select",{staticClass:"home-search-select",attrs:{size:"mini",placeholder:"请选择分类"},on:{change:a.getBarChartData},model:{value:a.barChart.type,callback:function(t){a.$set(a.barChart,"type",t)},expression:"barChart.type"}},a._l(a.typeList,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),i("div",{staticClass:"clear"})]),i("div",{staticClass:"home-chart-box"},[i("div",{ref:"home-chart-bottom",staticClass:"home-chart-wrap"})])]),i("div",{staticClass:"home-item-right royal-paper royal-paper-1"},[i("div",{staticClass:"home-item-title"},[a._v("\n                最新人员信息\n            ")]),a.peopleList.length?i("Timeline",[a._l(a.peopleList,function(t,e){return[i("TimelineItem",{key:t.id},e<1?[i("p",{staticClass:"timeline-content timeline-active"},[i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.matchTypeString))]),3==t.matchType?i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personAddress))]):a._e(),3!=t.matchType?i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personName))]):a._e(),3!=t.matchType?i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personIdCard))]):a._e()]),i("p",{staticClass:"timeline-time timeline-active"},[a._v(a._s(t.time))])]:[i("i",{staticClass:"material-icons timeline-icon",attrs:{slot:"dot"},slot:"dot"},[a._v("fiber_manual_record")]),i("p",{staticClass:"timeline-content"},[i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.matchTypeString))]),3==t.matchType?i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personAddress))]):a._e(),3!=t.matchType?i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personName))]):a._e(),3!=t.matchType?i("span",{staticClass:"titmeline-span"},[a._v(a._s(t.personIdCard))]):a._e()]),i("p",{staticClass:"timeline-time"},[a._v(a._s(t.time))])])]})],2):i("div",{staticClass:"home-item-nodata"},[a._v("\n                  暂无数据\n              ")])],1)])])},[],!1,null,"17e8edb1",null));g.options.__file="Home.vue",e.default=g.exports},adc5:function(t,e,a){"use strict";var i=a("da57");a.n(i).a},da57:function(t,e,a){},de72:function(t,e,a){}}]);
//# sourceMappingURL=chunk-662a.cdd50d48.js.map