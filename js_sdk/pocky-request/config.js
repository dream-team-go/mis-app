import Interceptor from "./core/interceptor";
import Request from "./index";

export const globalInterceptor = {
	request: new Interceptor(),
	response: new Interceptor()
};

/**
 * 全局配置
 * 只能配置 静态数据
 * `content-type` 默认为 application/json
 * `header` 中`content-type`设置特殊参数 或 配置其他会导致触发 跨域 问题，出现跨域会直接进入响应拦截器的catch函数中
 */
export const config = {
	//正式环境
	baseURL: "http://106.58.186.238:8081/mis",
	//测试环境
	//baseURL: "http://39.99.216.182:8080/mis",
	//baseURL: "http://3812c9q764.wicp.vip/mis",
	header: {
		// 'X-Auth-Token': 'xxxx',
		contentType: "application/x-www-form-urlencoded"
		// 'Content-Type': 'application/json'
	},
	request: 'POST'
};

/**
 * 全局 请求拦截器, 支持添加多个拦截器
 * 例如: 配置token、添加一些默认的参数
 *
 * `return config` 继续发送请求
 * `return false` 会停止发送请求，不会进入错误数据拦截，也不会进入请求对象中的catch函数中
 * `return Promise.reject('xxxxx')` 停止发送请求, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} config 发送请求的配置数据
 */
globalInterceptor.request.use(
	config => {
		if(getToken()){
			config.header.cookie = getToken();
		}
		return config;
	},
	err => {
		console.error("is global fail request interceptor: ", err);
		return false;
	}
);

/**
 * 全局 响应拦截器, 支持添加多个拦截器
 * 例如: 根据状态码选择性拦截、过滤转换数据
 *
 * `return res` 继续返回数据
 * `return false` 停止返回数据，不会进入错误数据拦截，也不会进入catch函数中
 * `return Promise.reject('xxxxx')` 返回错误信息, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} res 请求返回的数据
 * @param {Object} config 发送请求的配置数据
 * @return {Object|Boolean|Promise<reject>}
 */
globalInterceptor.response.use(
	(res, config) => {
		// if(res.header && res.header["Set-Cookie"] && res.header["Set-Cookie"].indexOf("JSESSIONID") != -1){
		// 	uni.setStorageSync("cookie", res.header["Set-Cookie"]);
		// }
		// 跳过 `request().download()` 这个拦截
		if (typeof res.tempFilePath !== 'undefined') {
		    return res;
		}
		const {
		    data,
		    statusCode
		} = res;
		try {
		    return handleCode({ data, statusCode, config });
		} catch (err) {
		    return Promise.reject(err);
		}
		return res;
	},
	(err, config) => {
		return Promise.reject(err);
	}
);

/**
 * 获取本地cookie
 */
function getToken() {
	return uni.getStorageSync('cookie');
}

/**
 * 获取本地cookie
 */
function clearToken() {
	return uni.removeStorage({
		key:'cookie'
	});
}

/**
 * 处理 http状态码
 * @param {object} o
 * @param {object} o.data 请求返回的数据
 * @param {object} o.config 本次请求的config数据
 * @param {string|number} o.statusCode http状态码
 * @return {object|Promise<reject>}
 */
function handleCode({ data, statusCode, config }) {
    const STATUS = {
        '200'() {
			if(data.code){
				if(data.code === "401")
				{
					// if(getToken()){
					// 	clearToken();
					// 	uni.reLaunch({
					// 		url: "../index/index"
					// 	});
					// 	return Promise.reject({ statusCode, message: '身份过期' });
					// }
					uni.reLaunch({
						url: "../index/index"
					});
					return Promise.reject({ statusCode, message: '重新授权中' });
				}else if(data.code === "403"){
					return Promise.reject({ statusCode, message: '未授权' });
				}
			}else{
				return data;
			}
        },
        '400'() {
            // return { statusCode, msg: '请求错误' };
            return Promise.reject({ statusCode, message: '请求错误' });
        },
        '403'() {
            return Promise.reject({ statusCode, message: '拒绝请求' });
        },
		'404'() {
		    return Promise.reject({ statusCode, message: '路径错误' });
		},
        '500'() {
            return Promise.reject({ statusCode, message: '服务器错误' });
        }
    };

    return STATUS[statusCode] ? STATUS[statusCode]() : Promise.reject(data, config); // 有状态码但不在这个封装的配置里，就直接进入 `fail`
}