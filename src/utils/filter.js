import Vue from "vue";

// 引入Moment.js时间处理库
import Moment from 'moment'
// 定义时间过滤器
Vue.filter('timeFormat', (data, format) => {
  return Moment(data).format(format)
})

// 过滤艺人对象数组中的name
Vue.filter('artistsFilter', artists => artists.map(artist => artist.name).join(` / `))

// 过滤单曲时间戳为mm:ss格式
// (1) 时间戳需要/1000的
Vue.filter('songTimeFormat', songtime => {
  let min = parseInt(songtime / 1000 / 60);
  if (min < 10) { min = "0" + min }
  let sec = parseInt((songtime / 1000) % 60);
  if (sec < 10) { sec = "0" + sec }
  return `${min} : ${sec}`
})
// （2）时间戳不用/1000的
Vue.filter('songTimeFormat2', songtime => {
  let min = parseInt(songtime / 60);
  if (min < 10) { min = "0" + min }
  let sec = parseInt(songtime % 60);
  if (sec < 10) { sec = "0" + sec }
  return `${min} : ${sec}`
})



// 过滤播放数量大于10万的用万表示
Vue.filter('playCount', count => {
  if (count >= 100000) {
    return parseInt(count / 10000) + "万"
  } else {
    return count
  }
})