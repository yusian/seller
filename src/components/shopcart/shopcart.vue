<template lang="html">
  <div class="shopcart">

    <div class="wrapper">
      <div class="left" @click="shopcartClick">
        <span class="icon">
          <div class="icon-shopping_cart" :class="{active:totalCount}"></div>
          <div class="number" v-show="totalCount > 0">{{totalCount}}</div>
        </span>
        <span class="price" :class="{active:totalPrice}">¥{{totalPrice}}</span>
        <span class="description" v-if="seller.deliveryPrice">另需配送费¥{{seller.deliveryPrice}}元</span>
      </div>
      <div class="right" :class="{payEnable:payEnable}" @click="pay">
        <div class="content">{{payEnableStr}}</div>
      </div>
    </div>

    <transition name="fold">
    <div class="shoplist" v-show="showShopList">
      <div class="title">
        <div class="left">购物车</div>
        <div class="right" @click="emptyList">清空</div>
      </div>
      <div class="itemlist-wrapper" ref="listWrapper">
        <ul class="itemlist">
          <li class="item" v-for="food in selectFoods">
            <div class="content">
              <span class="name">{{food.name}}</span>
              <span class="price">¥{{food.price*food.count}}</span>
              <span class="countctrl-wrapper">
                <countctrl :food="food"></countctrl>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <transition>
    <div class="shoplist-mask" v-show="showShopList" @click="shopcartClick"></div>
    </transition>
  </div>
</template>

<script>
import countctrl from '../countctrl/countctrl'
import bscroll from 'better-scroll'
export default {
  data:function(){
    return {
      payEnable:false,
      showShopList:false
    }
  },
  props:{
    seller:{
      Type:Object,
    },
    selectFoods:{
      type:Array,
      default:function(){
        return [];
      }
    },
  },
  components:{
    countctrl,
  },
  computed:{
    totalPrice:{
      get:function(){
        let price = 0;
        this.selectFoods.forEach(food => {
          price += food.price*food.count;
        });
        return price;
      }
    },
    totalCount:{
      get:function(){
        let count = 0;
        this.selectFoods.forEach(food => {
          count += food.count;
        });
        if (count == 0) this.showShopList = false;
        return count;
      }
    },
    payEnableStr:{
      get:function(){
        if (this.totalPrice === 0){
          this.payEnable = false;
          return '¥'+' '+this.seller.minPrice+'起送';
        }else if (this.totalPrice < this.seller.minPrice){
          this.payEnable = false;
          return '还差 ¥'+(this.seller.minPrice-this.totalPrice)+' 起送';
        }else{
          this.payEnable = true;
          return '去结算';
        }
      }
    }
  },
  methods:{
    shopcartClick:function(){
      if (!this.totalCount) return;
      this.showShopList = !this.showShopList;
      if (this.showShopList){
        this.$nextTick(()=>{
          if (!this.listScroll){
            this.listScroll = new bscroll(this.$refs.listWrapper, {
              click: true,
            });
          }else{
            this.listScroll.refresh();
          }
          console.log(this.listScroll);
        });
      }
    },
    emptyList:function(){
      this.selectFoods.forEach(food => {
        food.count = 0;
      })
    },
    pay:function(){
      if (this.payEnable == false) return;
      alert(this.totalPrice+"元已支付完成！");
      this.emptyList();
    }
  }
}
</script>

<style lang="css">
.shopcart {
  position: fixed;
  width: 100%;
  height: 45px;
  left: 0;
  bottom: 0;
  z-index: 10;
}
.shopcart .wrapper {
  display: flex;
  height: 100%;
  background: #141d27;
  z-index: 50;
}
.shopcart .wrapper .left {
  display: flex;
  align-items: center;
  flex: auto;
  z-index: 50;
  background: #141d27;
}
.shopcart .wrapper .left .icon {
  background: #141c27;
  width: 56px;
  height: 56px;
  margin: 0 12px;
  border-radius: 50%;
  padding: 6px;
  display: inline-block;
  position: relative;
  top: -6px;
  vertical-align: top;
}
.shopcart .wrapper .left .icon .icon-shopping_cart {
  width: 100%;
  height: 100%;
  line-height: 44px;
  border-radius: 50%;
  font-size: 24px;
  text-align: center;
  display: inline-block;
  color: rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.2);
}
.shopcart .wrapper .left .icon .icon-shopping_cart.active {
  color: #fff;
  background: rgb(0,160,260);
}
.shopcart .wrapper .left .icon .number {
  padding: 4px 8px;
  font-size: 12px;
  line-height: 12px;
  border-radius: 10px;
  color: white;
  background: red;
  position: absolute;
  top:0;
  right: 0;
}

.shopcart .wrapper .left .price {
  display: inline-block;
  font-size: 16px;
  color: rgba(255,255,255,0.4);
  padding: 12px;
}
.shopcart .wrapper .left .price.active {
  color: #fff;
}
.shopcart .wrapper .left .description {
  color: rgba(255,255,255,0.4);
  font-size: 10px;
  line-height: 10px;
  display: inline-block;
  border-left: 1px solid rgba(255,255,255,0.2);
  margin: 12px 0;
  padding: 6px 12px;
  font-weight: 200;
}
.shopcart .wrapper .right {
  width: 105px;
  flex: 0 0 105px;
  color: rgba(255,255,255,0.4);
  background: #32373e;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.shopcart .wrapper .right .content {
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
}
.shopcart .wrapper .right.payEnable {
  color: #fff;
  background:#00b43c;
}



/* shoplist */
.shopcart .shoplist {
  background: rgba(255,255,255,0.95);
  transform: translate3d(0,-100%,0);
  transition: all 0.5s ease;
  padding-bottom: 45px;
}
/* shoplist transiton */
.shopcart .shoplist.fold-enter {
  transform: translate3d(0,0,0);
}
.shopcart .shoplist.fold-leave-active {
  transform: translate3d(0,0,0);
}

.shopcart .shoplist .title {
  width: 100%;
  height: 40px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcart .shoplist .title .left {
  float: left;
  line-height: 40px;
  font-size: 14px;
  color: rgba(7,17,27,0.7);
  padding: 0 18px;
}
.shopcart .shoplist .title .right {
  float: right;
  line-height: 40px;
  color: rgb(0,160,220);
  padding: 0 18px;
}

.shopcart .itemlist-wrapper {
  max-height: 200px;
  overflow: hidden;
}
.shopcart .shoplist .itemlist {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.shopcart .shoplist .itemlist .item {
  padding: 0;
  margin: 0;
  padding: 0 18px;
}
.shopcart .shoplist .itemlist .item .content {
  display: flex;
  align-items: center;
  height: 48px;
  border-bottom: 0.5px solid rgba(7,17,27,0.2);
}
.shopcart .shoplist .itemlist .item:last-child .content{
  border-bottom: 0;
}
.shopcart .shoplist .itemlist .item .name,
.shopcart .shoplist .itemlist .item .price,
.shopcart .shoplist .itemlist .item .countctrl-wrapper {
  display: inline-block;
  flex: auto;
}
.shopcart .shoplist .itemlist .item .name {
  font-size: 14px;
  line-height: 24px;
}
.shopcart .shoplist .itemlist .item .price {
  flex-grow: 0;
  color: red;
  padding: 0 12px 0 18px;
  font-size: 14px;
  font-weight: 700;
}
.shopcart .shoplist .itemlist .item .price:first-letter {
  font-size: 12px;
  font-weight: normal;
}
.shopcart .shoplist .itemlist .item .countctrl-wrapper{
  flex-grow: 0;
  text-align:center;
  line-height: 24px;
  color: rgb(0,160,220);
  font-size: 24px;
}

.shopcart .shoplist-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}
.shopcart .shoplist-mask.v-enter,
.shopcart .shoplist-mask.v-leave-active {
  opacity: 0;
}
.shopcart .shoplist-mask.v-enter-to {
  opacity: 1;
}
</style>
