(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/work/wxcRepairRecordList"],{"2f0b":function(t,a,e){"use strict";(function(t){e("584b"),e("921b");n(e("66fd"));var a=n(e("d1de"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("6e42")["createPage"])},"42b6":function(t,a,e){"use strict";var n=e("f414"),r=e.n(n);r.a},"9b20":function(t,a,e){"use strict";var n,r=function(){var t=this,a=t.$createElement,e=(t._self._c,Array.from(t.StatusEnumMap.values())),n=Array.from(t.StatusEnumMap.keys()),r=t.__map(t.records,function(a,e){var n=t.getStatusStr(a.status);return{$orig:t.__get_orig(a),m0:n}});t.$mp.data=Object.assign({},{$root:{g0:e,g1:n,l0:r}})},o=[];e.d(a,"b",function(){return r}),e.d(a,"c",function(){return o}),e.d(a,"a",function(){return n})},d1de:function(t,a,e){"use strict";e.r(a);var n=e("9b20"),r=e("f8cb");for(var o in r)"default"!==o&&function(t){e.d(a,t,function(){return r[t]})}(o);e("42b6");var u,s=e("f0c5"),i=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"27a19c8a",null,!1,n["a"],u);a["default"]=i.exports},d7f3:function(t,a,e){"use strict";(function(t,n){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=o(e("1bb4"));function o(t){return t&&t.__esModule?t:{default:t}}var u=function(){return e.e("colorui/components/uni-load-more").then(e.bind(null,"45d9"))},s={components:{uniLoadMore:u},onLoad:function(t){var a=this;if(r.default.RepairRecordEnumMap.forEach(function(t,e,n){if(2==e||3==e){var r=t;r=3==e?"已出单":"待出单",a.StatusEnumMap.set(e,r)}}),t.status){var e=0;r.default.RepairRecordEnumMap.forEach(function(n,r,o){r!=t.status?e++:a.TabCur=e}),this.recordStatus=t.status}else this.recordStatus=Array.from(this.StatusEnumMap.keys())[0]},onShow:function(){this.recordStatusTab(this.TabCur)},data:function(){return{page:1,pageSize:10,recordStatus:"",status:"more",StatusEnumMap:new Map,TabCur:0,contentText:{contentdown:"上拉加载更多",contentrefresh:"加载中",contentnomore:"没有更多"},records:[]}},onReachBottom:function(){"noMore"!==this.status&&(this.status="more",this.loadData())},methods:{loadData:function(){var a=this;this.status="loading",t.$http.post("/car/repair/wxcList",{params:{status:this.recordStatus,page:this.page,pageSize:this.pageSize}}).then(function(t){"0"===t.status?(t.data.totlePage<=a.page?a.status="noMore":a.status="more",1===a.page?a.records=t.data.list:t.data.list.forEach(function(t){a.records.push(t)}),a.page++):n.showToast({title:t.msg,icon:"none"})}).catch(function(t){n.showToast({title:t.message,icon:"none"})})},getStatusStr:function(t){return r.default.RepairRecordEnumMap.get(t)},recordStatusTab:function(t){this.TabCur=t,this.recordStatus=Array.from(this.StatusEnumMap.keys())[t],this.page=1,this.records=[],this.loadData()},recordDetail:function(t){n.navigateTo({url:"../work/wxcRepairRecordDetail?id="+t.id})}}};a.default=s}).call(this,e("c8ba"),e("6e42")["default"])},f414:function(t,a,e){},f8cb:function(t,a,e){"use strict";e.r(a);var n=e("d7f3"),r=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);a["default"]=r.a}},[["2f0b","common/runtime","common/vendor"]]]);