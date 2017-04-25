<template>
  <div class="controlbtn">
    <transition name="move">
      <i class="sub " v-show="food.count>0" @click="subFood($event)">
        <transition name="inner">
          <span class="inner icon-remove_circle_outline"></span>
        </transition>  
      </i>
    </transition>
    <strong class="count" v-show="food.count>0">{{food.count}}</strong>
    <i class="add icon-add_circle" @click="addFood($event)"></i>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
      console.log(this.food);
    },
    methods: {
      addFood (event) {
        // pc端两次点击兼容处理
        if (!event._constructed) {
          return;
        }
        console.log('click1');
        if (!this.food.count) {
          // 利用vue的set方法设置food对象的属性
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      subFood (event) {
        if (!event._constructed) {
          return;
        }
        console.log('click2');
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .controlbtn
    font-size 0
    // vertical-align top
    .add
      vertical-align top
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
    .sub
      display inline-block
      padding 6px 6px 4px 6px
      &.move-leave-active, &.move-enter-active
        transition all .4s linear
      &.move-enter, &.move-leave-active
        opacity 0
        transform transilate3D(24px, 0, 0)
       .inner
         display inline-block
         vertical-align top
         font-size 24px
         line-height 24px
         color rgb(0, 160, 220)
         &.inner-leave-active, &.inner-enter-active
           transition all .4s linear
           transform rotate(0deg)
         &.inner-enter, &.inner-leave-active
           opacity 0
           transform rotate(180deg)
    .count
      display inline-block
      vertical-align top
      padding-top 6px
      width 12px
      font-size 10px
      line-height 24px
      text-align center
      color rgb(147, 153, 159)
</style>
