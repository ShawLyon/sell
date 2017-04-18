// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/stylus/index.styl';  // 全局引用,1px边框才生效

Vue.use(VueRouter);

Vue.config.productionTip = false;

// 1.引入组件(定义组件)

// 2.定义路由
const routes = [
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/seller', component: seller }

];
// 3.创建router实例
const router = new VueRouter({
  linkActiveClass: 'active',
  routes // 相当于routes:routes
});

/* eslint-disable no-new */
// 4.创建和挂载根实例,让整个应用拥有路由功能
const app = new Vue({
  router,
  render: h => h(App) // 注意1
}).$mount('#app');

export default app; // 注意2
// 默认打开goods
router.push('/goods');
