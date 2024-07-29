// 引入 request 文件
import request from '../request'
// 首页-获取充电站信息
export const plotList = (params) => {
    return request({
        url: "/plot/list",
        method: 'post',
        data: params
    })
}
// 获取充电桩详情信息
export const getChargingPileData = (params) => {
	return request({
	    url: "/chargingPile/getChargingPileData",
	    method: 'post',
	    data: params
	})
}
// 获取汽车充电桩价格
export const getCarPilePrice = (params) => {
	return request({
	    url: "/customPrice/carPilePrice",
	    method: 'post',
	    data: params
	})
}
// 获取余额
export const getBalance = (params) => {
	return request({
	    url: "/user/queryAccountBalance",
	    method: 'post',
	    data: params
	})
}

// 保存预付款订单
export const saveOrder = (params) =>{
	return request({
	    url: "/charging/order/save",
	    method: 'post',
	    data: params
	})
}
// 保存预付款订单
export const chargeing = (params) =>{
	return request({
	    url: "/charging/order/chargeing",
	    method: 'post',
	    data: params
	})
}