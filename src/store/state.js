const state = {
  // 用户是否登录
  loginStatus: null,
  // 用户Token
  userToken: sessionStorage.getItem('userToken') ? JSON.parse(sessionStorage.getItem('userToken')) : null,
  // 用户信息
  userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
  // 用户私人歌单(需要登录传入用户id)
  userSonglist: sessionStorage.getItem('userSonglist') ? JSON.parse(sessionStorage.getItem('userSonglist')) : [],
  // 音乐播放状态
  isPlaying: false,
  // 当前播放的音乐id
  currentSongId: sessionStorage.getItem('currentSongId') ? JSON.parse(sessionStorage.getItem('currentSongId')) : "",
  // 当前播放歌曲详情
  currentSongDetail: sessionStorage.getItem('currentSongDetail') ? JSON.parse(sessionStorage.getItem('currentSongDetail')) : {
    al: {
      name: "",
      picUrl: "",
    },
    ar: [""],
    name: "",
  },
  // 当前歌曲的试听时间
  auditionStart: sessionStorage.getItem('auditionStart') ? JSON.parse(sessionStorage.getItem('auditionStart')) : {},
  auditionEnd: sessionStorage.getItem('auditionEnd') ? JSON.parse(sessionStorage.getItem('auditionEnd')) : {},
  // 当前歌曲Url
  currentSongUrl: sessionStorage.getItem('currentSongUrl') ? JSON.parse(sessionStorage.getItem('currentSongUrl')) : "",
  // 当前播放列表
  currentPlaylist: sessionStorage.getItem('currentPlaylist') ? JSON.parse(sessionStorage.getItem('currentPlaylist')) : [],
  // 历史播放列表
  historyPlaylist: sessionStorage.getItem('historyPlaylist') ? JSON.parse(sessionStorage.getItem('historyPlaylist')) : [],
  /**
   * 当前播放模式
   * 0： 顺序播放
   * 1： 随机播放
   * 2： 单曲循环
   */
  playMode: sessionStorage.getItem('playMode') ? JSON.parse(sessionStorage.getItem('playMode')) : 0,

}

export default state