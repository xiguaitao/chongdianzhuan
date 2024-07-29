// 引入 request 文件
import request from '../request'

// 获取id
export const rechargeRecordSave = (params) => {
    return request({
        url: "/recharge/record/save",
        method: 'post',
        data: params
    })
}
// 充值
export const rechargeRecordWxpay = (params) => {
    return request({
        url: "/recharge/record/wxpay",
        method: 'post',
        data: params
    })
}
// 获取指定金额优惠
export const getPromotionByAmout = (params) => {
    return request({
        url: "/promotion/getPromotionByAmout",
        method: 'post',
        data: params
    })
}