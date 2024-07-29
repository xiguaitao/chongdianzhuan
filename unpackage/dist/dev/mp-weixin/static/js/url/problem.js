// 引入 request 文件
import request from '../request'
// 
export const feedbackSave = (params) => {
    return request({
        url: "/feedback/save",
        method: 'post',
        data: params
    })
}
export const feedbackList = (params) => {
    return request({
        url: "/feedback/list",
        method: 'post',
        data: params
    })
}