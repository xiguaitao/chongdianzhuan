// 引入 request 文件
import request from '../request'
// 余额支付订单保存
export const saveOrder = (params) => {
    return request({
        url: "/charging/order/saveOrder",
        method: 'post',
        data: params
    })
}
// 充电订单详情
export const single = (params) => {
    return request({
        url: "/charging/order/single",
        method: 'post',
        data: params
    })
}
// 微信支付
export const orderwxPay = (params) => {
    return request({
        url: "/charging/order/wxpay",
        method: 'post',
        data: params
    })
}
// 结束充电
export const endCharging = (params) => {
    return request({
        url: "/charging/order/end/charge",
        method: 'post',
        data: params
    })
}

// 订单列表
export const chargOrderList = (params) => {
    return request({
        url: "/charging/order/list",
        method: 'post',
        data: params
    })
}
// 订单日志
export const logList = (params) => {
    return request({
        url: "/order/log/list",
        method: 'post',
        data: params
    })
}
// 使用优惠券
export const useVouchers= (params) => {
    return request({
        url: "/charging/order/use/coupon",
        method: 'post',
        data: params
    })
}
// 未支付订单
export const noPayInfo = (params) => {
    return request({
        url: "/charging/order/nopay",
        method: 'post',
        data: params
    })
}