(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/account/register"],{2964:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",function(){return n}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return a})},"2aad":function(t,e,i){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{sysIndex:0,sysOrganizations:[],oIndex:0,organizations:[{org_name:"请选择",org_id:""}],dIndex:0,departments:[{name:"请选择",id:0}],sIndex:0,sections:[{name:"请选择",id:0}],para:{system_org_id:"",org_id:"",department_id:0,section_id:0,username:"",password:"",rPassword:"",code:"",is_driver:0,sex:2,drive_age:0,id_card:"",license_type:0},authCode:"",disabled:!1,isDriver:!1,driverSex:!1,ageIndex:0,driveAges:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],dtIndex:0,driverTypes:["请选择"]}},onLoad:function(){var e=this;t.$http.post("/core/orgRole/getOrgList",{params:{}}).then(function(t){"0"===t.status?(e.sysOrganizations=t.data,e.sysOrganizations.length>0&&(e.para.system_org_id=e.sysOrganizations[0].org_id)):i.showToast({title:t.msg,icon:"none"})}).catch(function(t){i.hideLoading(),i.showToast({title:t.message,icon:"none"})}),t.$http.post("/core/organization/organizationPage",{params:{page:1,size:1e4}}).then(function(t){if("0"===t.status)for(var a=0;a<t.data.list.length;a++)e.organizations.push(t.data.list[a]);else i.showToast({title:t.msg,icon:"none"})}).catch(function(t){i.hideLoading(),i.showToast({title:t.message,icon:"none"})}),t.$http.post("/car/driver/getLicenseType",{params:{}}).then(function(t){if("0"===t.status)for(var a=0;a<t.data.length;a++)e.driverTypes.push(t.data[a].name);else i.showToast({title:t.msg,icon:"none"})}).catch(function(t){i.hideLoading(),i.showToast({title:t.message,icon:"none"})})},methods:{SysOrganizationChange:function(t){this.para.system_org_id=this.sysOrganizations[t.detail.value].org_id},OrganizationChange:function(e){var a=this;this.para.org_id=this.organizations[e.detail.value].org_id,this.oIndex!=e.detail.value&&(this.para.department_id=0,this.para.section_id=0,this.oIndex=e.detail.value,this.departments=[{name:"请选择",id:0}],this.dIndex=0,e.detail.value>0&&t.$http.post("/core/department/departmentPage",{params:{page:1,size:1e4,pid:0,orgId:this.para.org_id}}).then(function(t){if("0"===t.status)for(var e=0;e<t.data.list.length;e++)a.departments.push(t.data.list[e]);else i.showToast({title:t.msg,icon:"none"})}).catch(function(t){i.hideLoading(),i.showToast({title:t.message,icon:"none"})}))},DepartmentChange:function(e){var a=this;this.para.department_id=this.departments[e.detail.value].id,this.dIndex!=e.detail.value&&(this.dIndex=e.detail.value,this.para.section_id=0,this.sections=[{name:"请选择",id:0}],this.sIndex=0,e.detail.value>0&&t.$http.post("/core/department/departmentPage",{params:{page:1,size:1e4,pid:this.para.department_id}}).then(function(t){if("0"===t.status)for(var e=0;e<t.data.list.length;e++)a.sections.push(t.data.list[e]);else i.showToast({title:t.msg,icon:"none"})}).catch(function(t){i.hideLoading(),i.showToast({title:t.message,icon:"none"})}))},SectionChange:function(t){this.para.section_id=this.sections[t.detail.value].id,this.sIndex=t.detail.value},SendCode:function(e){var a=this;if(this.disabled=!0,this.para.username.length<=0)return i.showModal({content:"请填写手机号",showCancel:!1}),void(this.disabled=!1);t.$http.post("/core/login/sendRegSms",{params:{tel:this.para.username}}).then(function(t){if("0"===t.status){a.authCode=60;var e=setInterval(a.SetAuthCode,1e3);setTimeout(function(){clearInterval(e)},6e4)}else a.disabled=!1,i.showToast({title:t.msg,icon:"none"})}).catch(function(t){a.disabled=!1,i.hideLoading(),i.showToast({title:t.message,icon:"none"})})},SetAuthCode:function(){this.authCode-=1,0==this.authCode&&(this.authCode="",this.disabled=!1)},ChangeDriveAge:function(t){this.para.drive_age=t.detail.value},ChangeIsDriver:function(t){this.isDriver=t.detail.value,this.para.is_driver=t.detail.value?1:0},ChangeDriverSex:function(t){this.driverSex=t.detail.value,this.para.sex=t.detail.value?1:2},ChangeDriverType:function(t){this.dtIndex=t.detail.value,this.para.license_type=this.driverTypes[t.detail.value]},Submit:function(e){if(this.para.system_org_id.length<=0)i.showToast({icon:"none",title:"请选择机关事务局"});else if(this.para.org_id.length<=0)i.showToast({icon:"none",title:"请选择所属单位"});else if(this.para.department_id<=0)i.showToast({icon:"none",title:"请选择所属部门"});else if(this.para.section_id<=0)i.showToast({icon:"none",title:"请选择所属科室"});else{if(this.isDriver){if(this.dtIndex<=0)return void i.showToast({icon:"none",title:"请选择驾照类型"});if(this.para.drive_age<=0)return void i.showToast({icon:"none",title:"请选择驾龄"});if(this.para.id_card.length<=0)return void i.showToast({icon:"none",title:"请填写身份证号"})}this.para.username.length<=0?i.showToast({icon:"none",title:"请填写手机号"}):this.para.password.length<6?i.showToast({icon:"none",title:"密码最短为 6 个字符"}):this.para.password===this.para.rPassword?this.para.code.length<=0?i.showToast({icon:"none",title:"请填写验证码"}):(i.showLoading({title:"提交中",mask:!1}),t.$http.post("/core/login/registe",{params:this.para}).then(function(t){i.hideLoading(),"0"===t.status?(i.showToast({icon:"none",title:"提交成功"}),i.navigateBack()):i.showToast({title:t.msg,icon:"none"})}).catch(function(t){i.hideLoading(),i.showToast({title:t.message,icon:"none"})})):i.showToast({icon:"none",title:"重复密码不一致"})}}}};e.default=a}).call(this,i("c8ba"),i("6e42")["default"])},"583a":function(t,e,i){"use strict";var a=i("ce4f"),n=i.n(a);n.a},7152:function(t,e,i){"use strict";i.r(e);var a=i("2aad"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},"9d75":function(t,e,i){"use strict";(function(t){i("584b"),i("921b");a(i("66fd"));var e=a(i("c419"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},c419:function(t,e,i){"use strict";i.r(e);var a=i("2964"),n=i("7152");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("583a");var o,r=i("f0c5"),d=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"6df1f3c2",null,!1,a["a"],o);e["default"]=d.exports},ce4f:function(t,e,i){}},[["9d75","common/runtime","common/vendor"]]]);