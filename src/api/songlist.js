/**
 * songlist / 歌单相关接口
 */

import http from '@/utils/axios'

/**
 * 获取推荐歌单
 * 可选参数：imit: 取出数量 , 默认为 30 (不支持 offset)
 * 调用例子 : /personalized?limit=1
 */
export const getReSonglist = (params) => http('/personalized', { params })

/**
 * 获取用户歌单
 * 说明：登陆后调用此接口，传入用户id，可以获取用户歌单
 * 必选参数： uid: 用户id
 * 可以选参数： limit: 返回数量，默认30   offset:偏移数量，用于分页
 * 接口地址： /user/playlist
 * 调用例子/user/playlist?uid=xxxxxx
 */
export const getUserSonglist = (params) => http('/user/playlist', { params })

/**
 * 获取所有歌单分类
 * 说明：调用该接口，可以获取所有歌单分类，包含category信息
 * 接口地址：/playlist/catlist
 */
export const getSonglistAllTags = () => http('/playlist/catlist')

/**
 * 获取热门歌单分类
 * 说明：调用此接口，可以获取热门歌单分类
 * 接口地址：playlist/hot
 */
export const getSonglistHotTags = () => http('/playlist/hot')

/**
 * 获取相应歌单
 * 说明：可以通过传入相应的分类，获取网友精选的歌单数据
 * 可选参数：（1）order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * (2) cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * (3) limit: 取出歌单数量 , 默认为 50
 * (4) offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * 接口地址 : /top/playlist
 * 调用例子 : /top/playlist?limit=10&order=new
 */
export const getSonglist = (params) => http('/top/playlist', { params })

/**
 * 获取歌单详情
 * 必选参数 : id : 歌单 id
 * 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
 * 接口地址 : /playlist/detail
 * 调用例子 : /playlist/detail?id=24381616
 */
export const getSonglistDetial = (params) => http('/playlist/detail', { params })