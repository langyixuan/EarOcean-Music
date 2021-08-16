/**
 * 音乐相关接口
 */
import http from '@/utils/axios'

/**
 * 获取歌曲详情
 * 说明：通过歌单详情返回的数据可以拿到trackIds，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
 * 必选参数：trackIds
 * 接口地址：/song/detail
 */
export const getSongDetail = (params) => http('song/detail', { params })

/**
 * 获取音乐url
 * 说明：使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ),
 *  可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
 * 必选参数：id : 音乐 id
 * 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * 接口地址 : /song/url
 * 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
 */
export const getSongUrl = (params) => http('/song/url', { params })

/**
 * 获取喜欢的音乐列表
 * 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
 * 必选参数 : uid: 用户 id
 * 接口地址 : /likelist
 * 调用例子 : /likelist?uid=32953014
 */
export const getLikelist = (params) => http('/likelist', { params })

/**
 * 获取歌词
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * 必选参数 : id: 音乐 id
 * 接口地址 : /lyric
 * 调用例子 : /lyric?id=33894312
 */
export const getLyric = (params) => http('/lyric', { params })