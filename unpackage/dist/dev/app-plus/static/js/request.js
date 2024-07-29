// 全局请求封装
// const base_url = 'http://192.168.2.181:3000'
// const base_url_1 = 'http://192.168.2.94:8081/car-charge-app-api/'
import request from './app.js'
let { base_url } = request;
// 需要修改token，和根据实际修改请求头
export default (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {}
	if (method == "post") {
		header = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
	}
	// 获取本地token
	if (uni.getStorageSync("token")) {
		header['Authorization'] = 'Bearer ' + uni.getStorageSync("token");
		header['token'] = uni.getStorageSync("token");
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
			success(response) {
				const res = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				if (res.statusCode == 200) {
					resolve(res.data);
					if (res.data.code == 401) {
						// uni.clearStorageSync()
						uni.showToast({
							title: "登陆失效...",
							duration: 2000,
							icon: "none",
							success(res) {
								let pages = getCurrentPages();
								if (pages[0].route != "pages/index/index") {
									uni.clearStorageSync()
									setTimeout(() => {
										uni.reLaunch({
											url: "/pages/index/index",
										})
									}, 2000);
								}
							},
						});
					}
				} else {
					// uni.clearStorageSync()
					switch (res.statusCode) {
						case 401:
							uni.showModal({
								title: "提示",
								content: "请登录",
								showCancel: false,
								success(res) {
									let pages = getCurrentPages();
									if (pages[0].route != "pages/index/index") {
										uni.clearStorageSync()
										setTimeout(() => {
											uni.reLaunch({
												url: "/pages/index/index",
											})
										}, 2000);
									} 
								},
							});
							break;
						case 404:
							uni.showToast({
								title: '请求地址不存在...',
								duration: 2000,
							})
							break;
						default:
							uni.showToast({
								title: '请重试...',
								duration: 2000,
							})
							break;
					}
				}
			},
			fail(err) {
				if (err.errMsg.indexOf('request:fail') !== -1) {
					wx.showToast({
						title: '网络异常',
						icon: "error",
						duration: 2000
					})
				} else {
					wx.showToast({
						title: '未知异常',
						duration: 2000
					})
				}
				reject(err);

			},
			complete() {
				// 不管成功还是失败都会执行
				uni.hideLoading();
				// uni.hideToast();
			}
		});
	}).catch((e) => { });
};




