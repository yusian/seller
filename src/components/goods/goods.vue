<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="good-list" v-if="goods.length > 0">
        <li v-for="(good,index) in goods" class="good-item" :class="{active:index===currentIndex}">
          <div class="good-wrapper" @click="goodItemClick(index)">
            <div class="content">
              <span :class="classArray[good.type]" class="icon"></span>
              <span class="text">{{good.name}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul class="good-list">
        <li v-for="(good,index) in goods" class="good-item food-list-hook">
          <h2 class="good-name">{{good.name}}</h2>
          <ul class="food-list ">
            <li v-for="food in good.foods" class="food-item" @click="foodDetail(food)">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h3 class="food-name">{{food.name}}</h3>
                <p class="description" v-if="food.description">{{food.description}}</p>
                <p class="seller"><span>{{'月售'+food.sellCount+'份'}}</span><span>{{'好评率'+food.rating+'%'}}</span></p>
                <p class="price">
                  <span class="value">¥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="old-price">{{'¥'+food.oldPrice}}</span>
                </p>
                <div class="countctrl-wrapper">
                  <countctrl :food="food"></countctrl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :seller="seller" :selectFoods="selectFoods"/>
    <transition>
    <fooddetail class="fooddetail" v-if="selectedFood" :food="selectedFood" @hidden="hiddenDetail"/>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue'
import countctrl from '../countctrl/countctrl.vue'
import data from '../../../data.json'
import fooddetail from '../food/food.vue'
export default {
  data:function(){
    return {
      goods:[],
      sel_good:{},
      foodOffsetArray:[],
      foodListOffsetY:0,
      selectedFood:null,
    };
  },
  props: ['seller'],
  created:function(){
    this.goods = data.goods;
    this.$nextTick(()=>{
      this._initScroll();
      this._calcScrollHeight();
    });
    // this.$http.get('./api/goods')
    // .then(response => {
    //   this.goods = response.body.data;
    //   this.sel_good = this.goods[0];
    //   this.$nextTick(()=>{
    //     this._initScroll();
    //     this._calcScrollHeight();
    //   });
    //   console.log(response);
    // });
  },
  components: {
    shopcart,
    countctrl,
    fooddetail,
  },
  computed:{
    classArray:{
      get:function(){
        return ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      }
    },
    currentIndex:{
      get:function(){
        let array = this.foodOffsetArray;
        let count = array.length;
        for(let i = 0; i < count; i++){
          let offsetY = array[i];
          if (this.foodListOffsetY < offsetY) return i;
        }
        return count;
      }
    },
    selectFoods:{
      get:function(){
        let foods = [];
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count > 0) foods.push(food);
          });
        });
        return foods;
      }
    }
  },
  methods:{
    _initScroll:function (){
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        click: true,
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        probeType: 3,
        click: true,
      });
      this.foodsScroll.on('scroll', offset => {
        let offsetY = offset.y;
        if (offsetY > 0) offsetY = 0;
        if (offsetY < 0) offsetY = -offsetY;
        this.foodListOffsetY = offsetY;
      })
    },
    _calcScrollHeight:function(){
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      for(let i = 0; i < foodList.length; i++){
        height += foodList[i].clientHeight;
        this.foodOffsetArray.push(height);
      }
    },
    goodItemClick:function(index){
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    foodDetail:function(food){
      this.selectedFood = food;
      console.log(this.selectedFood);
      this.showDetail = true;
    },
    hiddenDetail:function(){
      if (this.selectedFood){
        this.showDetail = false;
        this.selectedFood = null;
      }
    }
  }
}
</script>

<style lang="less">
.goods {
  position: absolute;
  top: 174.5px;
  left: 0;
  right: 0;
  bottom: 49px;
  display: flex;
  overflow: hidden;
}
.goods .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
  // overflow: auto;
}
.goods .menu-wrapper .good-list {
  margin: 0;
  padding: 0;
  list-style-type: none;

}
.goods .menu-wrapper .good-list .good-item.active {
  background: #fff;
  font-weight: 700;
  margin-top: -1px;
}
.goods .menu-wrapper .good-list .good-item .good-wrapper {
  margin: 0 12px;
  border-bottom: 1px solid rgba(7,17,27,0.1);

  height: 54px;
  display: flex;
  align-items: center;
}
.goods .menu-wrapper .good-list .good-item.active .good-wrapper,
.goods .menu-wrapper .good-list .good-item:last-child .good-wrapper
{
  border-bottom: 0;
}

.goods .menu-wrapper .good-list .good-item .content {
  font-size: 0px;
}
.goods .menu-wrapper .good-list .good-item .content .icon {
  display: inline-block;
  vertical-align: top;
}
.goods .menu-wrapper .good-list .good-item .content .decrease {
  margin-right: 2px;
  width: 12px;
  height: 12px;
  background-image: url('decrease_1@2x.png');
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.goods .menu-wrapper .good-list .good-item .content .discount {
  margin-right: 2px;
  width: 12px;
  height: 12px;
  background-image: url('discount_1@2x.png');
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.goods .menu-wrapper .good-list .good-item .content .guarantee {
  margin-right: 2px;
  width: 12px;
  height: 12px;
  background-image: url('guarantee_1@2x.png');
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.goods .menu-wrapper .good-list .good-item .content .invoice {
  margin-right: 2px;
  width: 12px;
  height: 12px;
  background-image: url('invoice_1@2x.png');
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.goods .menu-wrapper .good-list .good-item .content .special {
  margin-right: 2px;
  width: 12px;
  height: 12px;
  background-image: url('special_1@2x.png');
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.goods .menu-wrapper .good-list .good-item .content .text {
  line-height: 14px;
  font-size: 12px;
  display: inline;
}

.good-list,
.food-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.good-list .good-item.active {
  // background: #fff;
}
.good-list .good-item .good-name {
  background: #f3f5f7;
  margin: 0;
  height: 26px;
  font-size: 12px;
  color: rgb(147,153,159);
  border-left:2px solid #d9dde1;
  line-height: 26px;
  padding-left: 14px;
}

.food-list .food-item {
  margin: 18px 18px 0 18px;
  padding-bottom: 18px;
  display: flex;
  position: relative;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food-list .food-item:last-child {
  border-bottom: 0;
}
.food-list .food-item .icon {
  width: 57px;
  height: 57px;
  flex: 0 0 57px;
  display: inline-block;
}
.food-list .food-item .icon img {
  width: 100%;
  height: 100%;
}
.food-list .food-item .content {
  display: inline-block;
  padding-top: 2px;
  padding-left: 10px;
  flex: auto;
  overflow: hidden;
}
.food-list .food-item .food-name {
  margin: 0px;
  font-size: 14px;
  line-height: 14px;
  color: rgb(7,17,27);
}
.food-list .food-item .description,
.food-list .food-item .seller {
  font-size: 10px;
  line-height: 10px;
  margin: 8px 0 0 0;
  color: rgb(147,153,159);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.food-list .food-item .seller span:first-child{
  margin-right: 12px;
  display: inline-block;
}
.food-list .food-item .price {
  font-size: 0;
  margin: 0;
  display: inline-block;
}
.food-list .food-item .price .value {
  font-size: 14px;
  color: red;
  font-weight: 700;
  line-height: 24px;
  display: inline-block;
}
.food-list .food-item .price .value:first-letter {
  font-size: 12px;
}
.food-list .food-item .price .old-price {
  font-size: 10px;
  display: inline-block;
  margin-left: 8px;
  line-height: 24px;
  vertical-align: top;
  color: rgb(147,153,159);
  text-decoration: line-through;
}
.food-list .food-item .countctrl-wrapper {
  position: absolute;
  bottom:10;
  right:0px;
  font-size: 24px;
  display: inline-block;
  line-height: 24px;
  color: rgb(0,160,220);
}
.goods .foods-wrapper {
  flex: auto;
  overflow: hidden;
}

.fooddetail {
  transition: all 0.4s;
}
.fooddetail.v-enter,
.fooddetail.v-leave-to {
  transform: translate3d(100%,0,0);
}
.fooddetail.v-enter-to {
  transform: translate3d(0,0,0);
}
</style>
