import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/layout/";
import store from "@/store"

Vue.use(VueRouter);

// 解决重复触发同一个路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 侧边导航栏路由
  {
    // 发现音乐页面路由
    path: "/",
    component: Home,
    redirect: "/explore",
    meta: {
      keepAlive: true
    }
  },
  {
    // 发现音乐页面路由
    path: "/explore",
    name: "explore",
    component: () => import("@/views/explore/"),
    meta: {
      keepAlive: true
    }
  },
  {
    // 歌单广场页面路由
    path: "/songlists",
    name: "songlists",
    component: () => import("@/views/songlists/"),
    meta: {
      keepAlive: true
    }
  },
  {
    // 时下流行页面路由
    path: "/popular",
    name: "popular",
    component: () => import("@/views/popular/"),
    meta: {
      keepAlive: true
    }
  },
  {
    // Music Video页面路由
    path: "/mvs",
    name: "mvs",
    component: () => import("@/views/mvs/"),
    meta: {
      keepAlive: true
    }
  },
  {
    // 喜欢的音乐
    path: "/favorite",
    name: "favorite",
    component: () => import("@/views/favorite/"),
    meta: {
      keepAlive: true
    }
  },
  {
    // 用户私人歌单路由
    path: "/mysonglist",
    name: "mysonglist",
    component: () => import("@/views/mysonglist/"),
    meta: {
      keepAlive: true
    }
  },
  {
    // 歌单详情路由
    path: "/songlist/:id",
    name: "songlistDetail",
    component: () => import("@/views/songlistDetail/"),
    props: true
  },
  // mv详情页面
  {
    path: "/mv/:id",
    name: "mvDetail",
    component: () => import("@/views/mvDetail/"),
    props: true,
  },
  // 专辑详情页面
  {
    path: "/album/:id",
    name: 'albumDetail',
    component: () => import("@/views/albumDetail/"),
    props: true,
  },
  // 歌手详情页面
  {
    path: "/singer/:id",
    name: "singerDetail",
    component: () => import("@/views/singerDetail"),
    props: true
  },

  {
    // 登录页面路由
    path: "/login",
    name: "login",
    component: () => import("@/views/login/")
  },

];



// 创建路由对象
const router = new VueRouter({
  routes
});

// 对有用户权限的页面，设置路由拦截
router.beforeEach((to, from, next) => {
  if (to.path == "/mysonglist" || to.path == "/favorite") {
    if (store.state.userToken) {
      next()
    } else {
      alert("没有登录，请先登录")
      next("/login")
    }
  } else {
    next()
  }
})

export default router;
