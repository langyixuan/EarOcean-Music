import state from "./state"

// 用户Token
export const userToken = state => state.userToken
// 用户信息
export const userInfo = state => state.userInfo
// 用户私人歌单
export const userSonglist = state => state.userSonglist
// 当前音乐播放状态
export const isPlaying = state => state.isPlaying
// 当前播放音乐ID
export const currentSongId = state => state.currentSongId
// 当前播放音乐详情
export const currentSongDetail = state => state.currentSongDetail
// 当前歌曲试听时间
export const auditionStart = state => state.auditionStart
export const auditionEnd = state => state.auditionEnd
// 当前歌曲Url
export const currentSongUrl = state => state.currentSongUrl
// 当前播放列表
export const currentPlaylist = state => state.currentPlaylist
// 历史播放列表
export const historyPlaylist = state => state.historyPlaylist
// 当前播放模式
export const playMode = state => state.playMode




