/**
 * Music Video相关接口
 */

import http from '@/utils/axios'

/**
 * 获取全部MV
 * 接口说明：通过该接口可以获取全部MV
 * 可选参数：（1）area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 
 * （2）type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * （3）order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * （4）limit: 取出数量 , 默认为 30
 * （5）offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * 接口地址： /mv/all
 * 调用例子 : /mv/all?area=港台
 */
export const getAllMvs = (params) => http('/mv/all', { params })

/**
 * 获取推荐MV
 * 接口说明：调用此接口，可以获取推荐mv
 * 接口地址： /personalized/mv
 * 调用例子： /personalized/mv
 */
export const getReMvs = (params) => http('/personalized/mv', { params })

/**
 * 获取最新MV
 * 接口说明：调用此接口，获取最新MV
 * 可选参数：(1) area:地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * (2) limit: 取出数量
 * 调用接口：/mv/first
 * 调用例子： /mv/first?limit=10
 */
export const getNewMvs = (params) => http('/mv/first', { params })

/**
 * 获取MV数据
 * 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 ,
 *  歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
 * 必选参数 : mvid: mv 的 id
 * 接口地址 : /mv/detail
 * 调用例子 : /mv/detail?mvid=5436712
 */
export const getMvDatas = (params) => http('/mv/detail', { params })

/**
 * 获取 mv 点赞转发评论数数据
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据
 * 必选参数 : mvid: mv 的 id
 * 接口地址 : /mv/detail/info
 * 调用例子 : /mv/detail/info?mvid=5436712
 */
export const getMvInfo = (params) => http('/mv/detail/info', { params })

/**
 * 获取MV地址
 * 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
 * 必选参数 : id: mv id
 * 可选参数 : r: 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表
 * 接口地址 : /mv/url
 * 调用例子： /mv/url?id=5436712 /mv/url?id=10896407&r=1080
 */
export const getMvUrl = (params) => http('/mv/url', { params })

/**
 * 获取相似MV
 * 接口说明：调用此接口，可获取相似视频
 * 必选参数：id :视频的id
 * 接口地址：/simi/mv
 * 调用例子：/simi/mv?id=347230 
 */
export const getSameMv = (params) => http('/simi/mv', { params })