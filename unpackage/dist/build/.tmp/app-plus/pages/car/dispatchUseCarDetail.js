(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/car/dispatchUseCarDetail"],{"632b":function(t,a,e){"use strict";(function(t,n){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=o(e("1bb4"));function o(t){return t&&t.__esModule?t:{default:t}}var s=function(){return Promise.all([e.e("common/vendor"),e.e("colorui/components/uni-collapse")]).then(e.bind(null,"144b"))},r=function(){return Promise.all([e.e("common/vendor"),e.e("colorui/components/uni-collapse-item")]).then(e.bind(null,"52ad"))},c={components:{uniCollapse:s,uniCollapseItem:r},data:function(){return{info:{},list:[],showModal:!1,stars:[1,2,3,4,5],para:{dispatch_id:0,appraise_grade:0,appraise_contnet:""}}},onLoad:function(a){var e=this,i=JSON.parse(decodeURIComponent(a.para));this.info=i,this.info.status>=2&&t.$http.post("/car/dispatch/getListByDispatch",{params:{order_code:this.info.order_code}}).then(function(t){"0"===t.status?e.list=t.data:n.showToast({title:t.msg,icon:"none"})}).catch(function(t){n.showToast({title:t.message,icon:"none"})})},methods:{getCarListData:function(){var a=this;this.status="loading",t.$http.post("/car/dispatch/dispatchCarList",{params:{order_code:this.info.order_code,page:this.page,pageSize:this.pageSize}}).then(function(t){"0"===t.status?(a.status="noMore",a.cars=t.data):n.showToast({title:t.msg,icon:"none"})}).catch(function(t){n.showToast({title:t.message,icon:"none"})})},getDriverListData:function(){var a=this;this.status="loading",t.$http.post("/car/dispatch/dispatchDriverList",{params:{order_code:this.info.order_code,page:this.page,pageSize:this.pageSize}}).then(function(t){"0"===t.status?(a.status="noMore",a.drivers=t.data):n.showToast({title:t.msg,icon:"none"})}).catch(function(t){n.showToast({title:t.message,icon:"none"})})},getTitle:function(t){return"总费用(元)："+t},getStatusStr:function(t){return i.default.DispatchRecordEnumMap.get(t)},appraise:function(t){this.para.dispatch_id=t.id,this.para.appraise_grade=0,this.para.appraise_contnet="",this.showModal=!0},hideModal:function(){this.showModal=!1},fillAppraise:function(t){this.para.appraise_contnet=t.detail.value},chooseStar:function(t){this.para.appraise_grade=t},sureModal:function(){var a=this;this.para.appraise_grade<=0?n.showToast({title:"请评分",icon:"none"}):(this.showModal=!1,n.showLoading({title:"提交中",mask:!1}),t.$http.post("/car/dispatch/saveAppraise",{params:this.para}).then(function(t){n.hideLoading(),"0"===t.status?(n.showToast({icon:"none",title:"提交成功"}),a.list.forEach(function(t){t.id==a.para.dispatch_id&&(t.is_appraise=1,t.appraise_grade=a.para.appraise_grade,t.appraise_contnet=a.para.appraise_contnet)})):n.showToast({title:t.msg,icon:"none"})}).catch(function(t){n.hideLoading(),n.showToast({title:t.message,icon:"none"})}))}}};a.default=c}).call(this,e("c8ba"),e("6e42")["default"])},8670:function(t,a,e){"use strict";e.r(a);var n=e("632b"),i=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);a["default"]=i.a},a967:function(t,a,e){"use strict";(function(t){e("584b"),e("921b");n(e("66fd"));var a=n(e("d9fa"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("6e42")["createPage"])},ada8:function(t,a,e){"use strict";var n,i=function(){var t=this,a=t.$createElement,e=(t._self._c,t.__map(t.list,function(a,e){var n=t.getStatusStr(a.status),i=t.getTitle(a.total_fee);return{$orig:t.__get_orig(a),m0:n,m1:i}}));t.$mp.data=Object.assign({},{$root:{l0:e}})},o=[];e.d(a,"b",function(){return i}),e.d(a,"c",function(){return o}),e.d(a,"a",function(){return n})},d9fa:function(t,a,e){"use strict";e.r(a);var n=e("ada8"),i=e("8670");for(var o in i)"default"!==o&&function(t){e.d(a,t,function(){return i[t]})}(o);var s,r=e("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);a["default"]=c.exports}},[["a967","common/runtime","common/vendor"]]]);