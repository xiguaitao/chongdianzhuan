// 引入 request 文件
import request from '../request'
import app from '../app.js';
let {appid } = app;

// 登陆接口获取openid
export const getOpenId = (params) => {
    return request({
        url: `/wx/ma/${appid}/login`,
        method: 'get',
        data: params
    })
}
// 获取用户绑定手机号信息
export const getPhone = (params) => {
    return request({
        url: `/wx/ma/${appid}/phone`,
        method: 'get',
        data: params
    })
}
// 获取用户信息接口
export const getInfo = (params) => {
    return request({
        url: `/wx/ma/${appid}/info`,
        method: 'get',
        data: params
    })
}

