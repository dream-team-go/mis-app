(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/car/carRecordDetail"],{"29b4":function(t,e,s){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];s.d(e,"b",function(){return a}),s.d(e,"c",function(){return o}),s.d(e,"a",function(){return n})},"304d":function(t,e,s){"use strict";(function(t){s("584b"),s("921b");n(s("66fd"));var e=n(s("ea55"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("6e42")["createPage"])},"9cbf":function(t,e,s){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(s("1bb4"));function o(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{StatusEnumMap:[],steps:[],color:"",info:{},id:""}},onLoad:function(t){this.id=t.id},onShow:function(){var e=this;t.$http.post("/car/apply/getInfo",{params:{apply_id:this.id}}).then(function(t){"0"===t.status?(e.info=t.data,e.StatusEnumMap=a.default.UseCarRecordEnumMap,e.showSteps()):n.showToast({title:t.msg,icon:"none"})}).catch(function(t){n.showToast({title:t.message,icon:"none"})})},methods:{showSteps:function(){switch(this.steps.length=0,this.info.status){case 0:this.steps.push({name:this.StatusEnumMap.get(0),color:"text-green"}),this.steps.push({name:"审批",color:""}),this.steps.push({name:"调度",color:""}),this.steps.push({name:"订单进行中",color:""}),this.steps.push({name:"订单完成",color:""});break;case 1:this.steps.push({name:this.StatusEnumMap.get(0),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(1),color:"text-green"}),this.steps.push({name:"调度",color:""}),this.steps.push({name:"订单进行中",color:""}),this.steps.push({name:"订单完成",color:""});break;case-1:this.steps.push({name:this.StatusEnumMap.get(0),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(-1),color:"text-red"}),this.steps.push({name:"调度",color:""}),this.steps.push({name:"订单进行中",color:""}),this.steps.push({name:"订单完成",color:""});break;case 2:this.steps.push({name:this.StatusEnumMap.get(0),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(1),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(2),color:"text-green"}),this.steps.push({name:"订单进行中",color:""}),this.steps.push({name:"订单完成",color:""});break;case-2:this.steps.push({name:this.StatusEnumMap.get(0),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(1),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(-2),color:"text-red"}),this.steps.push({name:"订单进行中",color:""}),this.steps.push({name:"订单完成",color:""});break;case 3:this.steps.push({name:this.StatusEnumMap.get(0),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(1),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(2),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(3),color:"text-green"}),this.steps.push({name:"订单完成",color:""});break;case-3:this.steps.push({name:this.StatusEnumMap.get(0),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(-3),color:"text-red"});break;case 4:this.steps.push({name:this.StatusEnumMap.get(0),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(1),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(2),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(3),color:"text-green"}),this.steps.push({name:this.StatusEnumMap.get(4),color:"text-green"});break}},cancleBook:function(){var e=this;n.showModal({title:"提示",content:"确定取消预定？",showCancel:!0,cancelText:"取消",confirmText:"确定",success:function(s){s.cancel||(n.showLoading({title:"提交中",mask:!1}),t.$http.post("/car/apply/myCancel",{params:{apply_id:e.info.id}}).then(function(t){n.hideLoading(),"0"===t.status?(e.info.status=-3,n.showToast({title:"取消成功",icon:"none"}),e.showSteps()):n.showToast({title:t.msg,icon:"none"})}).catch(function(t){n.hideLoading(),n.showToast({title:t.message,icon:"none"})}))},fail:function(){},complete:function(){}})},toEdit:function(t){n.navigateTo({url:"../car/bookCar?para="+encodeURIComponent(JSON.stringify(this.info))})},toDispatch:function(t){n.navigateTo({url:"../car/dispatchUseCarDetail?para="+encodeURIComponent(JSON.stringify(this.info))})}}};e.default=u}).call(this,s("c8ba"),s("6e42")["default"])},ea55:function(t,e,s){"use strict";s.r(e);var n=s("29b4"),a=s("fde2");for(var o in a)"default"!==o&&function(t){s.d(e,t,function(){return a[t]})}(o);var u,i=s("f0c5"),c=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=c.exports},fde2:function(t,e,s){"use strict";s.r(e);var n=s("9cbf"),a=s.n(n);for(var o in n)"default"!==o&&function(t){s.d(e,t,function(){return n[t]})}(o);e["default"]=a.a}},[["304d","common/runtime","common/vendor"]]]);