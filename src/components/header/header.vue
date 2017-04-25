<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img width="64px" height="64px" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{seller.name}}</div>
        </div>
        <div class="description">
          <span>{{seller.description}} /</span>
          <span>{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="sell-supports">
          <span class="icon" :class="supportsMap[seller.supports[0].type]"></span><span class="text" >{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-on:click="detailOpen">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrap">
      <div class="bulletin-icon"></div>
      <div class="bulletin-text">{{seller.bulletin}}</div>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 模糊层 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <!-- 弹出层 -->
      <div class="detail" v-show="detailShow" @click="detailClose">
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <!-- 标题 -->
            <h1 class="name">{{seller.name}}</h1>
            <!-- 星星 -->
            <star :size="48" :score="seller.score"></star>
            <!-- 优惠信息 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="item-support" v-if="seller.supports">
              <li v-for="(item,index) in seller.supports">
                <span class="icon" :class="supportsMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
        <!-- 关闭x -->
        <div class="detail-close">
          <i class="icon-close" v-on:click="detailClose"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star.vue';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    };
  },
  methods: {
    detailOpen () {
      this.detailShow = true;
    },
    detailClose () {
      this.detailShow = false;
    }
  },
  created () {
    this.supportsMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import '../../common/stylus/mixin.styl'
  html,body,.detail-wrap
    height 100%
  .header
    position relative
    overflow hidden
    color rgb(255,255,255)
    background-color rgba(7, 17, 27, .5)
    .content-wrap
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        &>img
          border-radius 2px
      .content   
        display inline-block
        vertical-align top
        margin-left 16px
        font-size 12px
        font-weight 200
        line-height 12px
        .title
          margin 2px 6px 8px 0
          .brand
            bg-image('./brand')
            vertical-align top
            background-size 30px 18px
            background-repeat no-repeat
            display inline-block
            width 30px
            height 18px
          .name
            display inline-block
            font-size 16px
            font-weight bold       
            line-height 18px
        .description
          font-size 10px
        .sell-supports
          margin 10px 0 2px 0
          .icon
            background-size 12px
            background-repeat no-repeat
            display inline-block
            vertical-align top
            width 12px
            height 12px
            &.decrease
              bg-image('./decrease_1')
            &.discount
              bg-image('./discount_1')
            &.guarantee
              bg-image('./guarantee_1')
            &.invoice
              bg-image('./invoice_1')
            &.special
              bg-image('./special_1')
          .text
            margin-left 4px
            font-size 10px
      .supports-count
        position absolute
        right 12px
        bottom 18px
        padding 0 8px
        heigth 24px
        font-size 0
        background-color rgba(0,0,0,.2)
        border-radius 16px
        text-align center
        .count
          margin-right 2px
          vertical-align top
          font-size 10px
          line-height 24px
        .icon-keyboard_arrow_right
          line-height 24px
          font-size 10px
    .bulletin-wrap
      position relative
      padding 0 22px 0 12px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      height 28px
      line-height 28px
      font-size 0
      background-color rgba(7, 17, 27, .3)
      .bulletin-icon
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image('./bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        display inline-block
        vertical-align top
        margin-left 4px
        font-size 10px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      left 0
      top 0
      z-index 100     
      overflow auto
      width 100%
      height 100%
      background rgba(7, 17, 27, .8)
      -webkit-backdrop-filter blur(10px)
      transition all .5s
      /*过度动画*/
      &.fade-enter-active {
        animation: fade-in .5s;
      }
      &.fade-leave-active {
        animation: fade-out .5s;
      }
      @keyframes fade-in {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(1);
        }
      }
      @keyframes fade-out {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(0);
        }
      }
      /* stacike footers 布局 start */
      .detail-wrap
        width 100%
        height auto
        min-height 100%
        .detail-main
          margin-top 64px
          padding 0 36px
          padding-bottom 64px
          .name
            text-align center
            font-size 16px
            font-weight 700
            line-height 16px
            color rgb(255, 255, 255)
          .title
            display flex
            margin 28px 0 24px
            width 100%
            .text
              display inline-block
              flex 1
              padding 0 12px 
              text-align center
              font-size 14px
              line-height 14px
              font-weight 700
              color rgb(255, 255, 255)
            .line
              display inline-block
              flex 1
              margin-top 7px
              border-top 1px solid rgba(255, 255, 255, .2)
          .item-support
            .text
              vertical-align top
              font-size 12px
              font-weight 200
              line-height 16px
              color rgb(255, 255, 255)
            .icon
              display inline-block
              vertical-align top
              margin-bottom 12px
              margin-left 12px
              width 16px
              height 16px
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                bg-image('./decrease_2')
              &.discount
                bg-image('./discount_2')
              &.special
                bg-image('./special_2')
              &.invoice
                bg-image('./invoice_2')
              &.guarantee
                bg-image('./guarantee_2')
          .bulletin
            margin 24px 12px 0
            font-size 12px
            font-weight 200
            line-height 24px
            color rgb(255,255,255)
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
        color rgba(255, 255, 255, .5)
      // stacike footers 布局 end
</style>
