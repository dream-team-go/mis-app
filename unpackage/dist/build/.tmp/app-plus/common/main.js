(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"13bd":function(e,t,n){"use strict";n.r(t);var o=n("45ac");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("6e4a");var r,u,l,c,i=n("f0c5"),f=Object(i["a"])(o["default"],r,u,!1,null,null,null,!1,l,c);t["default"]=f.exports},"45ac":function(e,t,n){"use strict";n.r(t);var o=n("d071"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=a.a},"6ae0":function(e,t,n){"use strict";(function(e,t){n("584b"),n("921b");var o=l(n("66fd")),a=l(n("13bd")),r=l(n("52eb")),u=l(n("c949"));function l(e){return e&&e.__esModule?e:{default:e}}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){i(e,t,n[t])})}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(){return n.e("colorui/components/cu-custom").then(n.bind(null,"75a4"))};o.default.component("cu-custom",f);var d=function(){return n.e("pages/car/index").then(n.bind(null,"8384"))};o.default.component("car",d);var p=function(){return n.e("pages/meeting/index").then(n.bind(null,"1261"))};o.default.component("meeting",p);var s=function(){return n.e("pages/food/index").then(n.bind(null,"87c4"))};o.default.component("food",s);var m=function(){return n.e("pages/work/index").then(n.bind(null,"df6f"))};o.default.component("work",m);var b=function(){return n.e("pages/user/index").then(n.bind(null,"073d"))};o.default.component("user",b),e.$http=(0,u.default)(),o.default.prototype.$store=r.default,o.default.config.productionTip=!1,a.default.mpType="app";var g=new o.default(c({store:r.default},a.default));t(g).$mount()}).call(this,n("c8ba"),n("6e42")["createApp"])},"6e4a":function(e,t,n){"use strict";var o=n("a481"),a=n.n(o);a.a},a481:function(e,t,n){},d071:function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("66fd"));function r(e){return e&&e.__esModule?e:{default:e}}var u={onLaunch:function(){e.getSystemInfo({success:function(e){a.default.prototype.ScreenHeight=e.screenHeight,a.default.prototype.StatusBar=e.statusBarHeight,"android"==e.platform?a.default.prototype.CustomBar=e.statusBarHeight+50:a.default.prototype.CustomBar=e.statusBarHeight+45}}),a.default.prototype.ColorList=[{title:"嫣红",name:"red",color:"#e54d42"},{title:"桔橙",name:"orange",color:"#f37b1d"},{title:"明黄",name:"yellow",color:"#fbbd08"},{title:"橄榄",name:"olive",color:"#8dc63f"},{title:"森绿",name:"green",color:"#39b54a"},{title:"天青",name:"cyan",color:"#1cbbb4"},{title:"海蓝",name:"blue",color:"#0081ff"},{title:"姹紫",name:"purple",color:"#6739b6"},{title:"木槿",name:"mauve",color:"#9c26b0"},{title:"桃粉",name:"pink",color:"#e03997"},{title:"棕褐",name:"brown",color:"#a5673f"},{title:"玄灰",name:"grey",color:"#8799a3"},{title:"草灰",name:"gray",color:"#aaaaaa"},{title:"墨黑",name:"black",color:"#333333"},{title:"雅白",name:"white",color:"#ffffff"}]},onShow:function(){console.log(o("App Show"," at App.vue:109"))},onHide:function(){console.log(o("App Hide"," at App.vue:112"))}};t.default=u}).call(this,n("6e42")["default"],n("0de9")["default"])}},[["6ae0","common/runtime","common/vendor"]]]);