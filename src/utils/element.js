import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
import {
  Message,
  Slider,
  Popconfirm,
  Pagination,
  Dialog,
  Button,
} from "element-ui"

Vue.use(Message)
Vue.use(Slider)
Vue.use(Popconfirm)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Button)

Vue.prototype.$message = Message

