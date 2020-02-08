(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{1948:function(t,n,a){"use strict";var u,e=function(){var t=this,n=t.$createElement;t._self._c},c=[];a.d(n,"b",function(){return e}),a.d(n,"c",function(){return c}),a.d(n,"a",function(){return u})},7040:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,a=this.bgImage,u="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(a,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};n.default=a}).call(this,a("6e42")["default"])},"75a4":function(t,n,a){"use strict";a.r(n);var u=a("1948"),e=a("d288");for(var c in e)"default"!==c&&function(t){a.d(n,t,function(){return e[t]})}(c);var r,o=a("f0c5"),i=Object(o["a"])(e["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);n["default"]=i.exports},d288:function(t,n,a){"use strict";a.r(n);var u=a("7040"),e=a.n(u);for(var c in u)"default"!==c&&function(t){a.d(n,t,function(){return u[t]})}(c);n["default"]=e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("75a4"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
