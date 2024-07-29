// 引入 request 文件
import request from '../request'
// 获得列表
export const logList = (params) => {
    return request({
        url: "/recharge/record/list",
        method: 'post',
        data: params
    })
}

// 退款
export const refundRechargeRecord = (params) => {
    return request({
        url: "/recharge/record/refund",
        method: 'post',
        data: params
    })
}
