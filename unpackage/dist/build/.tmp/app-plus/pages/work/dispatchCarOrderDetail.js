(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/work/dispatchCarOrderDetail"],{"14d3":function(t,n,e){"use strict";var o,a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.getTitle(t.info.total_fee));t.$mp.data=Object.assign({},{$root:{m0:e}})},i=[];e.d(n,"b",function(){return a}),e.d(n,"c",function(){return i}),e.d(n,"a",function(){return o})},"4bc0":function(t,n,e){"use strict";e.r(n);var o=e("551b"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=a.a},"551b":function(t,n,e){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("1bb4"));function i(t){return t&&t.__esModule?t:{default:t}}var s=function(){return Promise.all([e.e("common/vendor"),e.e("colorui/components/uni-collapse")]).then(e.bind(null,"144b"))},u=function(){return Promise.all([e.e("common/vendor"),e.e("colorui/components/uni-collapse-item")]).then(e.bind(null,"52ad"))},c={components:{uniCollapse:s,uniCollapseItem:u},data:function(){return{StatusEnumMap:[],steps:[],color:"",info:{},id:"",order_code:"",applyInfo:{}}},onLoad:function(t){this.id=t.id,this.order_code=t.order_code},onShow:function(){var n=this;t.$http.post("/car/dispatch/dispatchInfo",{params:{dispatch_id:this.id}}).then(function(t){"0"===t.status?(n.info=t.data,n.StatusEnumMap=a.default.DispatchRecordEnumMap,n.showSteps()):o.showToast({title:t.msg,icon:"none"})}).catch(function(t){o.showToast({title:t.message,icon:"none"})}),t.$http.post("/car/apply/getInfoByOrderCode",{params:{order_code:this.order_code}}).then(function(t){"0"===t.status?n.applyInfo=t.data:o.showToast({title:t.msg,icon:"none"})}).catch(function(t){o.showToast({title:t.message,icon:"none"})})},methods:{showSteps:function(){var t=this;this.steps.length=0,a.default.DispatchRecordEnumMap.forEach(function(n,e,o){e<=t.info.status?t.steps.push({name:t.StatusEnumMap.get(e),color:"text-green"}):t.steps.push({name:t.StatusEnumMap.get(e),color:""})})},getTitle:function(t){return"总费用(元)："+t},sureBack:function(t){o.navigateTo({url:"../work/settleDispatchCar?para="+encodeURIComponent(JSON.stringify(this.info))})}}};n.default=c}).call(this,e("c8ba"),e("6e42")["default"])},"62e8":function(t,n,e){"use strict";e.r(n);var o=e("14d3"),a=e("4bc0");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);var s,u=e("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=c.exports},afb5:function(t,n,e){"use strict";(function(t){e("584b"),e("921b");o(e("66fd"));var n=o(e("62e8"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])}},[["afb5","common/runtime","common/vendor"]]]);