<template>
  <div class="shopcart">
      <div class="shopcart-left">
        <div class="logo">
          <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
        </div>
        <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
        <div class="count" v-show="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="shopcart-right" :class="{'highlight': totalPrice>=minPrice}">
        <div class="pay">{{payPrice}}</div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props: {
        selectFoods: {
          type: Array,
          default () {
            return [{ price: 10, count: 0 }];
          }
        },
        // 接收属性
        deliveryPrice: {
          type: Number
        },
        minPrice: {
          type: Number
        }
      },
      // 计算属性
      computed: {
        totalCount () {
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          });
          return count;
        },
        totalPrice () {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        payPrice () {
          if (this.totalPrice <= 0) {
            return `￥${this.minPrice}元起送`;
          } else if (this.totalPrice < this.minPrice) {
            return `还差￥${this.minPrice - this.totalPrice}元`;
          } else {
            return '去结算';
          }
        }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .shopcart
      display flex
      position fixed
      left 0
      bottom 0
      z-index 50
      width 100%
      height 46px
      .shopcart-left
        flex 1
        position relative
        background #141d27
        .logo
          display inline-block
          position relative
          top -12px
          left 12px
          padding 6px
          width 56px
          height 56px
          border-radius 50%
          box-sizing border-box
          font-size 24px
          line-height 24px
          background rgba(20,29,39,.9)
          .icon-shopping_cart
            display inline-block
            position relative
            width 44px
            height 44px
            border-radius 50%
            text-align center
            line-height 44px
            color rgba(255,255,255,.4)
            background rgba(0,0,0,.9)
            &.highlight
              color rgb(255,255,255)
              background rgb(0,160,220)
        .price
          display inline-block
          vertical-align top
          margin 12px 12px 12px 18px
          padding-right 12px
          border-right 1px solid rgba(255,255,255,.1)
          font-size 16px
          font-weight 700
          line-height 24px
          color rgba(255,255,255,.4)
          &.highlight
            color rgb(255,255,255)
        .desc
          display inline-block
          vertical-align top
          margin-top 12px
          font-size 10px
          line-height 24px
          color rgba(255, 255, 255, .4)
        .count
          position absolute
          left 44px
          top -10px
          padding 0 6px
          width 24px
          border-radius 8px
          box-sizing border-box
          font-size 10px
          font-weight 700
          line-height 16px
          text-align center
          color #fff
          background rgb(240,20,20)
      .shopcart-right
        flex 0 0 106px
        padding 0 8px
        background #2b333b
        text-align center
        box-sizing border-box
        color rgba(255, 255, 255, .4)
        &.highlight
          background #0d7aff
          color #fff
        .pay
          font-size 12px
          font-weight 700
          line-height 46px
          
</style>
