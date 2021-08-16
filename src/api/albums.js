/**
 * album / 专辑相关接口
 */

import http from '@/utils/axios'

/**
 * 获取全部新碟
 * 可选参数 :
 * 1. limit : 返回数量 , 默认为 30
 * 2. offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * 3. area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * 接口地址 : /album/new
 * 调用例子 : /album/new?area=KR&limit=10
 */
export const getNewAlbums = (params) => http('/album/new', { params })

/**
 * 获取专辑内容
 * 说明：调用此接口 , 传入专辑 id, 可获得专辑内容
 * 必选参数 : id: 专辑 id
 * 接口地址 : /album
 * 调用例子 : /album?id=32311
 */
export const getAlbumDetail = (params) => http('/album', { params })

/**
 * 获取专家歌手相关专辑
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 * 必选参数 : id: 歌手 id
 * 可选参数 : limit: 取出数量 , 默认为 50，offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * 接口地址 : /artist/album
 * 调用例子 : /artist/album?id=6452&limit=30 ( 周杰伦 )
 */
export const getSameAlbums = (params) => http('/artist/album', { params })