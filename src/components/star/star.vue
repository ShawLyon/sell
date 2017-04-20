<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      // 接口/参数1 size
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    // 计算拼接class
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        // 1.过滤评分
        let score = Math.floor(this.score * 2) / 2;
        // 2.过滤小数
        let hasDecimal = score % 1 !== 0;
        // 3.过滤整数
        let hasInteger = Math.floor(score);
        // 4.添加全星（整数），整数是几就push几颗星到数组
        for (let i = 0; i < hasInteger; i++) {
          result.push(CLS_ON);
        }
        // 5.添加半星（小数）
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        // 6.用空星补全够5颗星
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }

  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
    .star
      font-size 0
      margin-top 16px
      text-align center
      .star-item
        display inline-block
        background-repeat no-repeat
      &.star-24
        .star-item
          width 10px
          height 10px
          margin-right 8px
          background-size 10px 10px
          &:last-child
            margin-right 0
          &.on
            bg-image('star24_on')
          &.half
            bg-image('star24_half')
          &.off
            bg-image('star24_off')
      &.star-36
        .star-item
          width 15px
          height 15px
          margin-right 12px
          background-size 15px
          &:last-child
            margin-right 0
          &.on
            bg-image('star36_on')
          &.half
            bg-image('star36_half')
          &.off
            bg-image('star36_off')
      &.star-48
        .star-item
          width 20px
          height 20px
          margin-right 20px
          background-size 20px 20px
          &:last-child
            margin-right 0
          &.on
            bg-image('star48_on')
          &.half
            bg-image('star48_half')
          &.off
            bg-image('star48_off')
</style>
