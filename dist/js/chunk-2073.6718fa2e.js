(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2073"],{"9f06":function(e,l,a){},a890:function(e,l,a){"use strict";a.r(l);var t=[[{name:"违法犯罪事实",value:null,filed:"WFFZSS"},{name:"复吸次数",value:null,filed:"FXCS"},{name:"查获地址",value:null,filed:"CHDZ"},{name:"吸毒人员编号",value:null,filed:"XDRYBH"},{name:"初次查获时间",value:null,filed:"CCCHSJ"},{name:"复吸时间",value:null,filed:"FXSJ"},{name:"查获次数",value:null,filed:"CHCS"},{name:"初次吸毒时间",value:null,filed:"CCXDSJ"}],[{name:"服务处所",value:null,filed:"FWCS"},{name:"诊断日期",value:null,filed:"ZDRQ"},{name:"监护人单位",value:null,filed:"JHRDW"},{name:"评估日期",value:null,filed:"PGRQ"},{name:"监护人电话",value:null,filed:"JHRDH"},{name:"监护人姓名",value:null,filed:"JHRXM"},{name:"监护人地址",value:null,filed:"JHRDZ"}],[{name:"案由名称",value:null,filed:"AYMC"},{name:"归案时间",value:null,filed:"GASJ"},{name:"前科情况",value:null,filed:"QKQK"},{name:"同步时间",value:null,filed:"TBSJ"},{name:"填表人",value:null,filed:"TBR"},{name:"入库时间",value:null,filed:"RKSJ"},{name:"填表单位",value:null,filed:"TBDW"},{name:"录入单位",value:null,filed:"LRDW"},{name:"别名",value:null,filed:"XB"},{name:"录入人",value:null,filed:"LRR"},{name:"录入时间",value:null,filed:"LRSJ"}],[{name:"案由名称",value:null,filed:"AYMC"},{name:"归案时间",value:null,filed:"GASJ"},{name:"前科情况",value:null,filed:"QKQK"},{name:"同步时间",value:null,filed:"TBSJ"},{name:"填表人",value:null,filed:"TBR"},{name:"入库时间",value:null,filed:"RKSJ"},{name:"填表单位",value:null,filed:"TBDW"},{name:"录入单位",value:null,filed:"LRDW"},{name:"别名",value:null,filed:"XB"},{name:"录入人",value:null,filed:"LRR"},{name:"录入时间",value:null,filed:"LRSJ"}],[{name:"拘留天数",value:null,filed:"JLTS"},{name:"入所日期",value:null,filed:"RSRQ"},{name:"入所原因",value:null,filed:"RSYY"},{name:"入所次数",value:null,filed:"RSCS"},{name:"拘留截止日期",value:null,filed:"JLJZRQ"},{name:"简要案情",value:null,filed:"JYAQ"},{name:"入所时间",value:null,filed:"RSSJ"},{name:"出所原因",value:null,filed:"CSYY"}],[{name:"拘留天数",value:null,filed:"JLTS"},{name:"入所日期",value:null,filed:"RSRQ"},{name:"入所原因",value:null,filed:"RSYY"},{name:"入所次数",value:null,filed:"RSCS"},{name:"拘留截止日期",value:null,filed:"JLJZRQ"},{name:"简要案情",value:null,filed:"JYAQ"},{name:"入所时间",value:null,filed:"RSSJ"},{name:"出所原因",value:null,filed:"CSYY"}]],n={name:"warningDetail",data:function(){return{info:{name:"",photo:"",idCard:"",phone:"",homeArea:"",homeAddress:"",nowArea:"",nowAddress:""},curPage:1,total:0,trackList:[],matchType:"",matchTypeString:"",historyList:[],colors:["#FA9857","#6BB7F3","#01A292","#E95F45","#23B6AE","#4A9BFD"]}},created:function(){this.getBaseDetail(),this.getDetailHistory(),this.getDetailTrack()},methods:{getBaseDetail:function(){var l=this,e=this.$route.params.id;if(!e)return!1;this.$apis.warning.getBaseDetail(e).then(function(e){"0000"==e.code?(l.matchType=e.data.matchType,l.matchTypeString=e.data.matchTypeString,l.info=e.data.base):l.$alert(e.data,{confirmButtonText:"确定"})}).catch(function(e){e&&console.log(e)})},getDetailHistory:function(){var l=this,e=this.$route.params.id;if(!e)return!1;this.$apis.warning.getDetailHistory(e).then(function(e){"0000"==e.code?(console.log(e),l.handleHistoryData(e.data)):l.$notify({title:"数据异常",message:e.data,type:"warning"})}).catch(function(e){e&&console.log(e)})},handleHistoryData:function(e){var l=t[e.matchType-1],a=e.history;this.historyList=l.map(function(e){return e.value=a[e.filed],e})},getDetailTrack:function(){var l=this,e={page:this.curPage,id:this.$route.params.id};this.$apis.warning.getDetailTrack(e).then(function(e){"0000"==e.code?(l.total=e.data.trackCount,l.trackList=e.data.track):l.$notify({title:"数据异常",message:e.data,position:"top-right",type:"warning"})}).catch(function(e){e&&console.log(e)})},handleCurrentChange:function(e){this.curPage=e,this.getDetailTrack()}}},i=(a("db36"),a("2877")),s=Object(i.a)(n,function(){var l=this,e=l.$createElement,a=l._self._c||e;return a("div",[a("div",{staticClass:"people-detail-box global-list-container royal-paper royal-paper-1"},[a("div",{staticClass:"detail-box-title"},[l._v("人员信息详情")]),a("div",{staticClass:"people-detail-avator"},[l.info.photo?a("img",{attrs:{src:l.info.photo,alt:""}}):l._e()]),a("div",{staticClass:"people-detail-item-box"},[a("el-form",{staticClass:"detail-info-form",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"姓名："}},[a("span",[l._v(l._s(l.info.name))])]),a("el-form-item",{attrs:{label:"身份证号："}},[a("span",[l._v("\n                        "+l._s(l.info.idCard)+"\n                    ")])]),a("el-form-item",{attrs:{label:"手机号码："}},[a("span",[l._v(l._s(l.info.phone))])]),a("el-form-item",{attrs:{label:"户籍所在地："}},[a("span",[l._v(l._s(l.info.homeArea))])]),a("el-form-item",{attrs:{label:"户籍地址："}},[a("span",[l._v(l._s(l.info.homeAddress))])]),a("el-form-item",{attrs:{label:"现居住地："}},[a("span",[l._v(l._s(l.info.nowArea))])]),a("el-form-item",{attrs:{label:"现居住地址："}},[a("span",[l._v(l._s(l.info.nowAddress))])])],1)],1),a("div",{staticClass:"clear"}),a("div",{staticClass:"detail-box-subtitle matchType"},[a("span",[l._v("比中预警")]),a("span",{staticClass:"patch-type",style:{color:l.colors[l.matchType-1]}},[l._v(l._s(l.matchTypeString))])]),l._m(0),a("div",[a("el-form",{staticClass:"detail-info-form",attrs:{"label-position":"left",inline:""}},l._l(l.historyList,function(e){return a("el-form-item",{key:e.filed,attrs:{label:e.name+"："}},[a("span",[l._v(l._s(e.value))])])}))],1)]),a("div",{staticClass:"global-list-container royal-paper royal-paper-1"},[a("div",{staticClass:"detail-box-title"},[l._v("轨迹记录")]),a("div",{staticClass:"list-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:l.trackList}},[a("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:l._u([{key:"default",fn:function(e){return[l._v("\n                "+l._s(e.$index+1)+"\n            ")]}}])}),a("el-table-column",{attrs:{label:"地址",align:"center",prop:"address"}}),a("el-table-column",{attrs:{label:"数据来源",align:"center",prop:"dataSource"}}),a("el-table-column",{attrs:{label:"时间",prop:"time"}})],1)],1),l.total?a("div",{staticClass:"pagination-wrap"},[a("el-pagination",{attrs:{"current-page":l.curPage,"page-size":10,layout:"total,prev, pager, next, jumper",total:l.total},on:{"current-change":l.handleCurrentChange}})],1):l._e()])])},[function(){var e=this,l=e.$createElement,a=e._self._c||l;return a("div",{staticClass:"detail-box-subtitle"},[a("span",[e._v("历史记录")])])}],!1,null,"0cc1c8c0",null);s.options.__file="Detail.vue",l.default=s.exports},db36:function(e,l,a){"use strict";var t=a("9f06");a.n(t).a}}]);
//# sourceMappingURL=chunk-2073.6718fa2e.js.map