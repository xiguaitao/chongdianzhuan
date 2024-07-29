// 引入 request 文件
import request from '../request'


// 获取用户信息
export const getUserInfo = (params) => {
    return request({
        url: `/user/info`,
        method: 'post',
        data: params
    })
}

// 修改用户信息
export const updateUserInfo = (params) => {
    return request({
        url: `/user/update`,
        method: 'post',
        data: params
    })
}

// 获取用户余额
export const getUserQueryAccountBalance = (params) => {
    return request({
        url: `/user/queryAccountBalance`,
        method: 'post',
        data: params
    })
}
// 获取优惠券
export const getCouponList = (params) => {
	return request({
	    url: `/coupon/list`,
	    method: 'post',
	    data: params
	})
}

// 常见问题
export const commonProblems = (params) => {
	return request({
	    url: `/faq/list`,
	    method: 'post',
	    data: params
	})
}


// 获取认证
export const accreditation = (params) => {
	return request({
	    url: '/user/auth/info',
	    method: 'post',
	    data: params
	})
}

// 认证
export const approve = (params) => {
	return request({
	    url: '/user/auth/auth',
	    method: 'post',
	    data: params
	})
}

// 积分列表
export const pointsList = (params) => {
	return request({
	    url: '/integral/record/list',
	    method: 'post',
	    data: params
	})
}
// 积分统计
export const pointsStats = (params) => {
	return request({
	    url: '/integral/record/count',
	    method: 'post',
	    data: params
	})
}


// 获取用户收藏
export const userFavorite = (params) => {
	return request({
	    url: '/user/plot/collect/list',
	    method: 'post',
	    data: params
	})
}

// 添加收藏
export const addFavorite = (params) => {
	return request({
	    url: '/user/plot/collect/save',
	    method: 'post',
	    data: params
	})
}
// 取消添加收藏
export const delFavorite = (params) => {
	return request({
	    url: '/user/plot/collect/delete',
	    method: 'post',
	    data: params
	})
}



// 充电桩列表
export const chargingPostList = (params) => {
	return request({
	    url: '/plot/page',
	    method: 'post',
	    data: params
	})
}


// 获取广告
export const announcement = (params) => {
	return request({
	    url: '/advert/list',
	    method: 'post',
	    data: params
	})
}


// 获取可兑换优惠券列表
export const couponsList = (params) => {
	return request({
	    url: '/coupon/list',
	    method: 'post',
	    data: params
	})
}

// 兑换优惠券
export const redeemCoupons = (params) => {
	return request({
	    url: '/coupon/exchange',
	    method: 'post',
	    data: params
	})
}

// 获取车辆列表
export const carLists = (params) => {
	return request({
	    url: '/user/car/list',
	    method: 'post',
	    data: params
	})
}
// 保存车辆信息
export const addCar = (params) => {
	return request({
	    url: '/user/car/save',
	    method: 'post',
	    data: params
	})
}
// 修改车辆信息
export const upCar = (params) => {
	return request({
	    url: '/user/car/update',
	    method: 'post',
	    data: params
	})
}
// 删除车辆信息
export const delCar = (params) => {
	return request({
	    url: '/user/car/delete',
	    method: 'post',
	    data: params
	})
}
// 获取车辆详情
export const getCar = (params) => {
	return request({
	    url: '/user/car/info',
	    method: 'post',
	    data: params
	})
}


