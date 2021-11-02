# EarOcean音乐项目



> 开发目的：“EarOcean音乐播放器”旨在通过Vue全家桶等主流前端技术开发一款高性能、优用户体验的播放应用。让用户能通过该应用体验在音乐海洋中畅游的感受。
>
> 演示地址：暂无上线
>
> 后端接口： 后端应用来自民间大神的 node 版本：https://binaryify.github.io/NeteaseCloudMusicApi/



## 使用技术栈

- Vue2.x：采用Vue2.x的语法
- Vuex：管理公共组件状态量
- vue-router：管理单页面应用路由
- axios：发起http请求
- scss：css预处理语言
- Webpack：自动化构建工具，主要配置vue-cli脚手架提供。
- ES6：采用ES6语法。
- Element-UI：UI组件样式库
- Quasar：UI组件样式库



## 功能介绍

- [x] 音乐播放、暂停、上一曲、下一曲
- [x] 播放列表、添加到播放列表、做为下一首播放
- [x] 历史播放列表，记录历史播放记录
- [x] 搜索单曲、歌手、专辑、MV
- [x] 切换播放模式
- [x] 歌词显示，歌词同步高亮
- [x] 歌曲进度条拖拽
- [x] 歌手，专辑，歌单，用户，视频等详情展示
- [x] 用户登录、退出
- [x] 歌曲MV、及视频等详情及播放



## 项目部分截图

### 发现音乐

![发现音乐](C:\Users\郎艺璇\Desktop\发现音乐.png)



###  歌单广场

![歌单广场](C:\Users\郎艺璇\Desktop\歌单广场.png)



### 歌单详情

![歌单详情](https://i.loli.net/2021/11/02/sFkwopN6SPRBMdG.png)

### 

### 歌手详情

![歌手详情](https://i.loli.net/2021/11/02/6cBlYiE2OamUQzb.png)



### 歌词

![歌词](https://i.loli.net/2021/11/02/7IpPHgfQaCGlWcn.png)



### 登录

![登录](https://i.loli.net/2021/11/02/z7lhuSmiAG9sVgU.png)



### 私人歌单

![我的歌单](https://i.loli.net/2021/11/02/rWzvIhgTA3uVQm5.png)



### 音乐视频

![音乐视频](https://i.loli.net/2021/11/02/H1iLqP2e8YlA9aK.png)



## 项目目录说明

```
EarOcean_music                  
├── api                         // 网络请求/接口
│       └── NavHeader           // 头部标题组件
├── assets                      // 静态资源文件
│       └── albumDetail         // 专辑详情页
│       └── index               // 首页
│       └── login               // 登录页             
├── base                        // 公共组件
│       └── config.js           // 配置服务器相关信息
│       └── filter.wxs          // 对数据进行过滤处理
│       └── request.js          // 请求封装体
│       └── util.js             // 功能函数
├── components                  // 抽离的各种组件
├── layout                      // 基本布局
├── router                      // 路由
├── store                       // Vuex状态存储
├── styles                      // 样式
├── utils                       // 功能封装
├── views                       // 页面视图组件（路由组件）
├── App.vue                     // 项目根组件
├── main.js                     // 项目入口文件
```

## 

## 项目使用

### 项目安装

```
npm install
```

### 项目启动

```
npm run serve
```



该项目还会继续完善并更新功能中........
