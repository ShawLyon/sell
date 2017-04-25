<template>
  <div>
    <div class="goods">
      <div class="menu-wrap" ref="menuWrap">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current-item': index === currentIndex}" @click="selectMenu(index,$event)">
            <span class="text">
              <span v-show="goods[index].type>0" class="icon" :class="supportsMap[goods[index].type]"></span>{{goods[index].name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrap" ref="foodsWrap">
        <ul>
          <li v-for="(item, index) in goods" class="food-list foot-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item">
                <span class="icon">
                  <img :src="food.icon">
                </span>
                <span class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <div class="description" v-show="food.description">{{food.description}}</div>
                  <div class="extra">
                    <span class="sellCount">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <div class="left">
                      <span class="currentPrice">￥<strong>{{food.price}}</strong></span>
                      <span class="oldPrice" v-show="food.oldPrice">￥<strong>{{food.oldPrice}}</strong></span>
                    </div>
                    <div class="right">
                      <controlbtn :food="food"></controlbtn>
                    </div>
                  </div>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import data from '../../../data.json';
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import controlbtn from '../controlbtn/controlbtn.vue';
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  methods: {
    // 定义一个初始化scroll方法
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrap, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
        click: true,
        probeType: 3
      });
      // 实时监听当前foodsScroll滚动的距离(调用的better-scroll的接口)
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // 计算每个foodlist高度在视口中的位置
    _calulateHeight () {
      let foodList = this.$refs.foodsWrap.getElementsByClassName('foot-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu (index, event) {
      // 兼容pc两次点击问题，自定义派发事件
      // event._constructed表示自定义派发的事件触发
      if (!event._constructed) return;
      let foodList = this.$refs.foodsWrap.getElementsByClassName('foot-list-hook');
      let el = foodList[index];
      // better-scroll当中的方法,滚动到el DOM元素
      this.foodsScroll.scrollToElement(el, 300);
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        // 起始高度
        let height = this.listHeight[i];
        // 结束高度
        let height2 = this.listHeight[i + 1];

        if (!height2 || this.scrollY >= height && this.scrollY < height2) {
          return i;
        }
      }
      // 没滚动的情况下,初始值为0
      return 0;
    },
    selectFoods () {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    shopcart,
    controlbtn
  },
  created () {
    this.goods = data.goods;
    this.supportsMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$nextTick(() => { this._initScroll(); this._calulateHeight(); }); // 等待DOM更新,执行回调函数
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    // padding-bottom 46px
    width 100%
    overflow hidden
    .menu-wrap
      flex 0 0 80px // 固定宽度
      width 80px // 兼容安卓
      background #f3f5f7
      .menu-item
        display table
        padding 0 12px
        width 56px
        height 54px
        &.current-item
          position relative
          z-index 20
          margin-top -1px
          background #fff
          .text
            font-weight 700
            border-none()
        .text
          display table-cell
          vertical-align middle 
          font-size 12px
          font-weight 200
          line-height 14px
          border-1px(rgba(7,17,27,.1))
          .icon
            display inline-block
            vertical-align top
            margin 0 2px 2px 0
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('./decrease_3')
            &.discount
              bg-image('./discount_3')
            &.guarantee
              bg-image('./guarantee_3')
            &.invoice
              bg-image('./invoice_3')
            &.special
              bg-image('./special_3')
    .foods-wrap
      flex 1
      .food-list
        .title
          padding-left 14px
          height 26px
          line-height 26px
          border-left 2px solid #d9dde1
          font-size 12px
          color rgb(147, 153, 159)
          background #f3f5f7
        .food-item
          display flex
          margin 18px
          border-1px(rgba(7,17,27,.1))
          font-size 0
          &:last-child
            border-none()
          .icon
            flex 0 0 54px
            vertical-align top
            img
              width 54px
              height 54px
          .content
            flex 1
            margin 2px 0 0 10px
            .name
              font-size 14px
              font-weight 700
              line-height 14px
              color rgb(7,17,27)
            .extra,.description
              margin-top 8px
              font-size 0
              line-height 10px
              color rgb(147, 153, 159)
              .sellCount
                margin-right 12px
                font-size 10px
              .rating
                font-size 10px
            .description
              font-size 10px
              line-height: 14px
            .price
              font-size 0
              line-height 24px
              overflow hidden
              .left
                float left
                .currentPrice
                  font-size 10px
                  font-weight normal
                  color rgb(240,20,20)
                  strong
                    font-size 14px
                    font-weight 700
                .oldPrice
                  margin-left: 8px
                  font-size 10px
                  text-decoration line-through
                  color rgb(147, 153, 159)
                  strong
                    font-weight 700
              .right
                float right            
</style>
