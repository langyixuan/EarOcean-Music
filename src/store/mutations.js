import { currentPlaylist, currentSongId } from "./getters"
import state from "./state"

const mutations = {
  // 存储当前用户Token
  saveUserToken(state, userToken) {
    state.userToken = userToken
  },
  // 保存当前用户信息
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  // 保存用户私人歌单
  saveUserSonglist(state, userSonglist) {
    state.userSonglist = userSonglist
  },
  // 保存当前音乐播放状态
  saveIsPlaying(state, isPlaying) {
    state.isPlaying = isPlaying
  },
  // 保存当前播放的歌曲id
  saveCurrentSongId(state, currentSongId) {
    state.currentSongId = currentSongId
  },
  // 保存当前播放歌曲的详情
  saveCurrentSongDetail(state, currentSongDetail) {
    state.currentSongDetail = currentSongDetail
  },
  // 保存当前歌曲的试听时长
  saveSongAudition(state, audition) {
    state.auditionStart = {}
    state.auditionStart[audition[0]] = ''
    state.auditionStart[audition[1]] = ''
    state.auditionEnd = []
    state.auditionEnd = audition
  },
  // 保存当前歌曲Url
  saveCurrentSongUrl(state, currentSongUrl) {
    state.currentSongUrl = currentSongUrl
  },
  // 添加到当前播放列表
  addCurrentPlaylist(state, currentPlaylist) {
    state.currentPlaylist.push(currentPlaylist)
  },
  // 删除当前播放列表歌曲
  deleteCurrentPlaylist(state, currentSongId) {
    for (let song of state.currentPlaylist) {
      if (song.id === currentSongId) {
        let index = state.currentPlaylist.indexOf(song)
        if (index !== -1) {
          state.currentPlaylist.splice(index, 1)
          break
        }
      }
    }
  },
  // 删除当前播放列表歌曲
  deleteHistoryPlaylist(state, currentSongId) {
    for (let song of state.historyPlaylist) {
      if (song.id === currentSongId) {
        let index = state.historyPlaylist.indexOf(song)
        if (index !== -1) {
          state.historyPlaylist.splice(index, 1)
          break
        }
      }
    }
  },
  // 删除列表中全部歌曲
  deleteAllSong() {
    state.isPlaying = false
    state.currentSongId = ''
    state.currentPlaylist = []
    state.historyPlaylist = []
    state.currentSongUrl = ''
    state.currentSongDetail = {
      al: {
        name: "",
        picUrl: "",
      },
      ar: [""],
      name: "",
    }
  }
  ,

  // 添加歌曲到历史播放列表
  addHistoryPlaylist(state, historyPlaylist) {
    state.historyPlaylist.unshift(historyPlaylist)
  },
  // 保存当前播放模式
  savePlayMode(state, playMode) {
    state.playMode = playMode
  }
}

export default mutations