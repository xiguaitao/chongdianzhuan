// 引入 request 文件
import request from '../request'
// 获得优惠券列表
export const getVouchersList = (params) => {
    return request({
        url: "/couponRecord/list",
        method: 'post',
        data: params
    })
}

