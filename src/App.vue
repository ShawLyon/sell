<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
    </div>  
    <router-view :seller="seller"> 
    </router-view>
  </div>
</template>
<script type="text/ecmascript-6">
// 引用
import header from './components/header/header.vue';
import data from '../data.json';
// errno状态
// const ERR_OK = 0;
// 出口
export default {
  // name: 'app',
  data () {
    return {
      // 创建对象
      seller: {}
    };
  },
  // 钩子
  created () {
    // this.$http.get('/api/seller').then(response => {
    //   response = response.body;
    //   console.log(response);
    //   if (response.erron === ERR_OK) { // errorn状态匹配
    //     this.seller = response.data;
    //     console.log(this.seller);
    //   }
    // },
    // response => {
    //   // error callback
    // });
    this.seller = data.seller;
  },
  // 注册 v-header
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl';
    .tab 
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex 1
        text-align center
        & > a
          display block
          font-size 14px
          color rgb(77, 85, 93)
          &.active
            color rgb(240, 20, 20)
</style>
