(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/work/dispatchUseCarDetail"],{

/***/ 303:
/*!*******************************************************************************************!*\
  !*** /Users/yaoyuan/yy/my/mis-app/main.js?{"page":"pages%2Fwork%2FdispatchUseCarDetail"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _dispatchUseCarDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/work/dispatchUseCarDetail.vue */ 304));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_dispatchUseCarDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 304:
/*!************************************************************************!*\
  !*** /Users/yaoyuan/yy/my/mis-app/pages/work/dispatchUseCarDetail.vue ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dispatchUseCarDetail.vue?vue&type=template&id=883d79a2& */ 305);
/* harmony import */ var _dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dispatchUseCarDetail.vue?vue&type=script&lang=js& */ 307);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs




/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Users/yaoyuan/yy/my/mis-app/pages/work/dispatchUseCarDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 305:
/*!*******************************************************************************************************!*\
  !*** /Users/yaoyuan/yy/my/mis-app/pages/work/dispatchUseCarDetail.vue?vue&type=template&id=883d79a2& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./dispatchUseCarDetail.vue?vue&type=template&id=883d79a2& */ 306);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_template_id_883d79a2___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 306:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/yaoyuan/yy/my/mis-app/pages/work/dispatchUseCarDetail.vue?vue&type=template&id=883d79a2& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.list, function(dispatchOrder, index) {
    var m0 = _vm.getStatusStr(dispatchOrder.status)
    var m1 = _vm.getTitle(dispatchOrder.total_fee)
    return {
      $orig: _vm.__get_orig(dispatchOrder),
      m0: m0,
      m1: m1
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 307:
/*!*************************************************************************************************!*\
  !*** /Users/yaoyuan/yy/my/mis-app/pages/work/dispatchUseCarDetail.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./dispatchUseCarDetail.vue?vue&type=script&lang=js& */ 308);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_dispatchUseCarDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 308:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/yaoyuan/yy/my/mis-app/pages/work/dispatchUseCarDetail.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































































































































































var _misEnum = _interopRequireDefault(__webpack_require__(/*! ../../common/mis-enum.js */ 38));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var uniCollapse = function uniCollapse() {return __webpack_require__.e(/*! import() | colorui/components/uni-collapse */ "colorui/components/uni-collapse").then(__webpack_require__.bind(null, /*! @/colorui/components/uni-collapse.vue */ 593));};var uniCollapseItem = function uniCollapseItem() {return __webpack_require__.e(/*! import() | colorui/components/uni-collapse-item */ "colorui/components/uni-collapse-item").then(__webpack_require__.bind(null, /*! @/colorui/components/uni-collapse-item.vue */ 600));};var _default =
{
  components: {
    uniCollapse: uniCollapse,
    uniCollapseItem: uniCollapseItem },

  data: function data() {
    return {
      stars: [1, 2, 3, 4, 5],
      info: {},
      list: [],
      fillMileage: 0,
      showMileageModal: false,
      orderIndex: 0,
      fillDays: 0,
      showDaysModal: false };

  },
  onLoad: function onLoad(option) {var _this = this;
    var info = JSON.parse(decodeURIComponent(option.para));
    this.info = info;
    //获取派车单
    if (this.info.status >= 2) {
      global.$http.post('/car/dispatch/getListByDispatch', {
        params: {
          order_code: this.info.order_code } }).

      then(function (res) {
        if (res.status === "0") {
          _this.list = res.data;
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none' });

        }
      }).catch(function (err) {
        uni.showToast({
          title: err.message,
          icon: 'none' });

      });
    }
  },
  methods: {
    getCarListData: function getCarListData() {var _this2 = this;
      this.status = 'loading';
      global.$http.post('/car/dispatch/dispatchCarList', {
        params: {
          order_code: this.info.order_code,
          page: this.page,
          pageSize: this.pageSize } }).

      then(function (res) {
        if (res.status === "0") {
          _this2.status = 'noMore';
          _this2.cars = res.data;
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none' });

        }
      }).catch(function (err) {
        uni.showToast({
          title: err.message,
          icon: 'none' });

      });
    },
    getDriverListData: function getDriverListData() {var _this3 = this;
      this.status = 'loading';
      global.$http.post('/car/dispatch/dispatchDriverList', {
        params: {
          order_code: this.info.order_code,
          page: this.page,
          pageSize: this.pageSize } }).

      then(function (res) {
        if (res.status === "0") {
          _this3.status = 'noMore';
          _this3.drivers = res.data;
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none' });

        }
      }).catch(function (err) {
        uni.showToast({
          title: err.message,
          icon: 'none' });

      });
    },
    getTitle: function getTitle(totalFee) {
      return "总费用(元)：" + totalFee;
    },
    getStatusStr: function getStatusStr(status) {
      return _misEnum.default.DispatchRecordEnumMap.get(status);
    },
    sureSettle: function sureSettle(order) {var _this4 = this;
      uni.showModal({
        title: '提示',
        content: '确认结算该派车单？',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function success(res) {
          if (res.cancel) return;
          uni.showLoading({
            title: '提交中',
            mask: false });

          global.$http.post('/car/dispatch/sureAccount', {
            params: {
              dispatch_id: order.id } }).

          then(function (res) {
            uni.hideLoading();
            if (res.status === "0") {
              uni.showToast({
                title: "提交成功",
                icon: 'none' });

              //设置状态
              _this4.list.forEach(function (c) {
                if (c.id == order.id) {
                  c.status = 4;
                  return;
                }
              });
            } else {
              uni.showToast({
                title: res.msg,
                icon: 'none' });

            }
          }).catch(function (err) {
            uni.hideLoading();
            uni.showToast({
              title: err.message,
              icon: 'none' });

          });
        },
        fail: function fail() {},
        complete: function complete() {} });

    },
    hideDaysModal: function hideDaysModal() {
      this.showDaysModal = false;
    },
    fillDaysInput: function fillDaysInput(e) {
      this.fillDays = e.detail.value;
    },
    sureDaysModal: function sureDaysModal() {var _this5 = this;
      if (this.fillDays < 0) {
        uni.showToast({
          title: "用车天数不能小于0",
          icon: 'none' });

        return;
      }
      this.showDaysModal = false;
      uni.showLoading({
        title: '提交中',
        mask: false });

      var order = this.list[this.orderIndex];
      global.$http.post('/car/dispatch/update', {
        params: {
          id: order.id,
          days: this.fillDays,
          stop_num: order.stop_num } }).

      then(function (res) {
        uni.hideLoading();
        if (res.status === "0") {
          order.days = _this5.fillDays;
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none' });

        }
      }).catch(function (err) {
        uni.hideLoading();
        uni.showToast({
          title: err.message,
          icon: 'none' });

      });
    },
    hideMileageModal: function hideMileageModal() {
      this.showMileageModal = false;
    },
    fillMileageInput: function fillMileageInput(e) {
      this.fillMileage = e.detail.value;
    },
    sureMileageModal: function sureMileageModal() {var _this6 = this;
      if (this.fillMileage < 0) {
        uni.showToast({
          title: "里程数不能小于0",
          icon: 'none' });

        return;
      }
      this.showMileageModal = false;
      uni.showLoading({
        title: '提交中',
        mask: false });

      var order = this.list[this.orderIndex];
      global.$http.post('/car/dispatch/update', {
        params: {
          id: order.id,
          days: order.days,
          stop_num: this.fillMileage } }).

      then(function (res) {
        uni.hideLoading();
        if (res.status === "0") {
          order.stop_num = _this6.fillMileage;
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none' });

        }
      }).catch(function (err) {
        uni.hideLoading();
        uni.showToast({
          title: err.message,
          icon: 'none' });

      });
    },
    editMileage: function editMileage(index) {
      this.orderIndex = index;
      this.fillMileage = this.list[index].stop_num;
      this.showMileageModal = true;
    },
    editDays: function editDays(index) {
      this.orderIndex = index;
      this.fillDays = this.list[index].days;
      this.showDaysModal = true;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 1), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[303,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/work/dispatchUseCarDetail.js.map