(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9ef3"],{"26cc":function(t,e,a){},"2fdb":function(t,e,a){"use strict";var s=a("5ca1"),i=a("d2c8"),n="includes";s(s.P+s.F*a("5147")(n),"String",{includes:function(t){return!!~i(this,t,n).indexOf(t,1<arguments.length?arguments[1]:void 0)}})},5147:function(t,e,a){var s=a("2b4c")("match");t.exports=function(e){var a=/./;try{"/./"[e](a)}catch(t){try{return a[s]=!1,!"/./"[e](a)}catch(e){}}return!0}},6762:function(t,e,a){"use strict";var s=a("5ca1"),i=a("c366")(!0);s(s.P,"Array",{includes:function(t){return i(this,t,1<arguments.length?arguments[1]:void 0)}}),a("9c6c")("includes")},"9d42":function(t,e,a){"use strict";var s=a("26cc");a.n(s).a},a96b:function(t,e,a){"use strict";a.r(e);function i(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a("7f7f"),a("ac6a"),a("6762"),a("2fdb");var s=a("2ef0"),n=a.n(s),o={name:"statisticsList",data:function(){return{search:"",selectDate:null,cateType:1,curPage:1,total:0,dataList:[],importing:!1,selectOptions:[],selectOptionsKeys:[],selectOptionsTempKeys:[],optionsList:[]}},created:function(){this.getConfigList(),this.getPageList()},methods:{isIncludes:function(t,e){return n.a.includes(t,e)},getConfigList:function(){var s=this;this.$apis.statistics.getConfigList({}).then(function(t){if("0000"==t.code){s.optionsList=t.data;var e,a=[];t.data.forEach(function(t){a.push(t.name)}),e=a.splice(0,7),s.selectOptionsKeys=e,s.selectOptionsTempKeys=i(e)}else s.$notify({title:"数据异常",message:t.data,type:"warning"})}).catch(function(t){t&&console.log(t)})},getPageList:function(){var e=this,t={page:this.curPage,matchType:this.cateType};this.selectDate&&(t.startDate=this.selectDate[0],t.endDate=this.selectDate[1]),this.$apis.statistics.getPageList(t).then(function(t){"0000"==t.code?(e.total=t.count,e.dataList=t.data):e.$notify({title:"数据异常",message:t.data,position:"top-right",type:"warning"})}).catch(function(t){t&&console.log(t)})},handleCurrentChange:function(t){this.curPage=t,this.getPageList()},doOptionSelect:function(){this.selectOptionsKeys=i(this.selectOptionsTempKeys)},clearTempOptions:function(t){console.log(t),t||(this.selectOptionsTempKeys=i(this.selectOptionsKeys))},doExport:function(){var e=this,t={};if(this.selectDate&&(t.startDate=this.selectDate[0],t.endDate=this.selectDate[1]),this.importing)return!1;this.importing=!0,this.$apis.statistics.doExport(t).then(function(t){"0000"==t.code?e.$common.openDownLoadLink(t.data,!0):e.$notify({title:"数据异常",message:t.data,position:"top-right",type:"warning"}),e.importing=!1}).catch(function(t){e.importing=!1,t&&console.log(t)})}},watch:{selectDate:function(t){this.getPageList()}}},c=(a("9d42"),a("2877")),r=Object(c.a)(o,function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"global-list-container royal-paper royal-paper-1"},[s("div",{staticClass:"search-container"},[s("div",{staticClass:"search-left"},[s("el-radio-group",{attrs:{size:"small"},on:{change:a.getPageList},model:{value:a.cateType,callback:function(t){a.cateType=t},expression:"cateType"}},[s("el-radio-button",{attrs:{label:1}},[a._v("分局")]),s("el-radio-button",{attrs:{label:2}},[a._v("派出所")]),s("el-radio-button",{attrs:{label:3}},[a._v("警务室")])],1),s("el-dropdown",{staticStyle:{float:"right","margin-left":"15px"},attrs:{size:"small","split-button":"",type:"primary",trigger:"click"},on:{"visible-change":a.clearTempOptions}},[a._v("\n            配置数据项\n            "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-scrollbar",{attrs:{"wrap-class":"option-group-wrap"}},[s("el-checkbox-group",{staticClass:"optionGroup",attrs:{size:"small"},model:{value:a.selectOptionsTempKeys,callback:function(t){a.selectOptionsTempKeys=t},expression:"selectOptionsTempKeys"}},a._l(a.optionsList,function(t,e){return s("el-checkbox",{key:t.name,attrs:{label:t.name,disabled:!e}},[a._v(a._s(t.value))])}))],1),s("el-button",{staticClass:"do-option-select",attrs:{type:"text"},on:{click:a.doOptionSelect}},[a._v("确定")])],1)],1),s("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",size:"small",disabled:a.importing},on:{click:a.doExport}},[a._v("导出表格")])],1),s("div",{staticClass:"search-right"},[s("el-date-picker",{staticClass:"statistics-search-date",attrs:{size:"mini",type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"起始时间","end-placeholder":"结束时间"},on:{clear:a.getPageList},model:{value:a.selectDate,callback:function(t){a.selectDate=t},expression:"selectDate"}})],1)]),s("div",{staticClass:"list-wrap"},[s("el-table",{staticClass:"statisticsList-table",staticStyle:{width:"100%"},attrs:{data:a.dataList}},[s("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n                    "+a._s(t.$index+1)+"\n                ")]}}])}),s("el-table-column",{attrs:{label:"组织名称","min-width":"100",align:"center",prop:"org"}}),a._l(a.optionsList,function(t){return a.isIncludes(a.selectOptionsKeys,t.name)?s("el-table-column",{key:t.name,attrs:{label:t.value,align:"center","min-width":"130",sortable:"",prop:t.name}}):a._e()})],2)],1),a.total?s("div",{staticClass:"pagination-wrap"},[s("el-pagination",{attrs:{"current-page":a.curPage,"page-size":10,layout:"total,prev, pager, next, jumper",total:a.total},on:{"current-change":a.handleCurrentChange}})],1):a._e()])},[],!1,null,"3ae357e2",null);r.options.__file="List.vue",e.default=r.exports},d2c8:function(t,e,a){var s=a("aae3"),i=a("be13");t.exports=function(t,e,a){if(s(e))throw TypeError("String#"+a+" doesn't accept regex!");return String(i(t))}}}]);
//# sourceMappingURL=chunk-9ef3.cbbdf262.js.map