const actions = {
  saveUserToken({ commit }, payload) {
    commit('saveUserToken', payload)
  },
  saveUserInfo({ commit }, payload) {
    commit('saveUserInfo', payload)
  },
  saveUserSonglist({ commit }, payload) {
    commit('saveUserSonglist', payload)
  },
  saveIsPlaying({ commit }, payload) {
    commit('saveIsPlaying', payload)
  },
  saveCurrentSongId({ commit }, payload) {
    commit('saveCurrentSongId', payload)
  },
  saveCurrentSongDetail({ commit }, payload) {
    commit('saveCurrentSongDetail', payload)
  },
  saveSongAudition({ commit }, payload) {
    commit('saveSongAudition', payload)
  },
  saveCurrentSongUrl({ commit }, payload) {
    commit('saveCurrentSongUrl', payload)
  },
  addCurrentPlaylist({ commit }, payload) {
    commit('addCurrentPlaylist', payload)
  },
  deleteCurrentPlaylist({ commit }, payload) {
    commit('deleteCurrentPlaylist', payload)
  },
  deleteHistoryPlaylist({ commit }, payload) {
    commit('deleteHistoryPlaylist', payload)
  },
  deleteAllSong({ commit }, payload) {
    commit('deleteAllSong', payload)
  },
  addHistoryPlaylist({ commit }, payload) {
    commit('addHistoryPlaylist', payload)
  },
  savePlayMode({ commit }, payload) {
    commit('savePlayMode', payload)
  },




}

export default actions