/**
 * login / 用户登录相关接口
 */
import http from '@/utils/axios'

/**
 * 手机登录接口
 * 参数说明： 
 * 1. 必选参数： phone:手机号码  password: 密码
 * 2. 可选参数： countrycode: 国家码  md5_password:md5加密后的密码
 * 接口地址： /login/cellphone
 * 调用例子：/login/cellphone?phone=xxx&password=yyy
 */
export const loginWithPhone = (params) => http({
  url: "/login/cellphone",
  method: "post",
  params
})

/**
 * 刷新登录
 * 说明：调用该接口，可刷新邓论状态
 * 调用例子：/login/refresh
 */
export const refresh = () => http({
  url: "/login/refresh",
  method: "post",
})

/**
 * 退出登录接口
 * 说明：调用此接口，可以推出了登录
 * 调用例子：/logout
 */
export const logout = () => http({
  url: "/logout",
  method: "post"
})