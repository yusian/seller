<template lang="html">
  <div class="food" ref="wrapperscroll">
    <div class="wrapper">
      <div class="header">
        <div class="image">
          <img :src="food.image" alt="">
          <div class="icon-arrow_lift" @click="hidden"></div>
        </div>
        <div class="content">
          <div class="name">{{food.name}}</div>
          <div class="description">
            <span class="sell">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price-wrapper">
            <div class="price-info">
              <span class="price">¥{{food.price}}</span>
              <span class="old-price" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
            </div>
            <div class="buy">
              <div class="button" v-show="!food.count" @click="addfood">加入购物车</div>
              <countctrl :food="food" v-show="food.count > 0"/>
            </div>
          </div>
        </div>
      </div>
      <div class="intro" v-show="food.info">
        <div class="title">商品介绍</div>
        <div class="info">{{food.info}}</div>
      </div>
      <div class="rating-panel">
        <div class="rating-header">
          <div class="title">商品评价</div>
          <ratesel @someonly="someonlyChange" @selType="switchSelType" :preference="preference" :ratings="food.ratings"></ratesel>
        </div>
        <div class="rating-content">
          <ul class="rating-list" v-show="food.ratings.length > 0">
            <li class="rating-item" v-for="rating in food.ratings" v-show="showRateItem(rating)">
              <div class="sub-info">
                <div class="time">{{rating.rateTime | formateDate }}</div>
                <div class="user-info">
                  <span class="username">{{rating.username}}</span>
                  <span class="avatar"><img :src="rating.avatar" alt=""></span>
                </div>
              </div>
              <div class="content">
                <span class="status" :class="(rating.rateType===0)?'icon-thumb_up':'icon-thumb_down'"></span>
                <span class="text">{{rating.text}}</span>
              </div>
            </li>
          </ul>
          <div class="rating-empty" v-show="food.ratings.length === 0">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ALL = 2;
const POSITIVE = 0;
const NAGETIVE = 1;
import Vue from 'vue'
import countctrl from '../countctrl/countctrl.vue'
import ratesel from '@/components/ratesel/ratesel.vue'
import BetterScroll from 'better-scroll'
import {
  dateFormate
} from '../../common/js/date.js'
export default {
  data: function() {
    return {
      preference: {
        all: "全部",
        positive: "推荐",
        nagetive: "吐槽"
      },
      selType: ALL,
      contentOnly: false,
    }
  },
  props: {
    food: {
      type: Object,
    }
  },
  computed: {},
  filters: {
    formateDate: function(timestamp) {
      return dateFormate(new Date(timestamp), 'YYYY-MM-dd HH:mm');
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDay();
      let hour = date.getHours();
      let mini = date.getMinutes();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + mini;
    },
  },
  methods: {
    hidden: function() {
      this.$emit('hidden');
    },
    addfood: function() {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    switchSelType: function(index) {
      this.selType = index;
    },
    someonlyChange: function(change) {
      this.contentOnly = change;
    },
    showRateItem: function(rating) {
      let type_bool = (this.selType === rating.rateType) || this.selType === ALL;
      let hasContent = !this.contentOnly || (rating.text.length > 0);
      return type_bool && hasContent;
    }
  },
  components: {
    countctrl,
    ratesel,
  },
  created: function() {
    this.$nextTick(() => {
      this.scroll = new BetterScroll(this.$refs.wrapperscroll, {
        click: true,
      })
    });
  }
}
</script>

<style lang="less">
@import "../../common/styles/icon.css";
.food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 45px;
    width: 100%;
    font-size: 18px;
    background: #f3f5f7;
    overflow: hidden;
}
.food .wrapper {
    padding-bottom: 16px;
}
.food .header .image {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
}
.food .header .image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.food .header .image .icon-arrow_lift {
    position: absolute;
    background: rgba(255,255,255,0.5);
    top: 10px;
    left: 10px;
    padding: 10px;
    border-radius: 50%;
}
.food .header .image .icon-arrow_lift:active {
    background: rgba(0,0,0,0.5);
}
.food .header .content {
    padding: 18px;
    background: #fff;
    font-size: 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food .header .content .name {
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    color: rgb(7,17,27);
}
.food .header .content .description {
    color: rgb(147,153,159);
    padding: 8px 0;
}
.food .header .content .description .rating,
.food .header .content .description .sell {
    font-size: 10px;
}
.food .header .content .description .sell {
    margin-right: 12px;
}
.food .header .content .price-wrapper {
    font-size: 0;
    display: flex;
    justify-content: space-between;
}
.food .header .content .price-wrapper .price-info {
    }
.food .header .content .price-wrapper .price {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    color: red;
    vertical-align: top;
}
.food .header .content .price-wrapper .price:first-letter {
    font-size: 10px;
    font-weight: normal;
}
.food .header .content .price-wrapper .old-price {
    display: inline-block;
    margin-left: 8px;
    font-size: 10px;
    font-weight: 700;
    line-height: 24px;
    color: rgb(147,153,159);
    text-decoration: line-through;
}
.food .header .content .price-wrapper .old-price:first-letter {
    font-weight: normal;
}
.food .header .content .price-wrapper .buy {
    }
.food .header .content .price-wrapper .button {
    // float: right;
    font-size: 10px;
    line-height: 12px;
    padding: 6px 12px;
    background: rgb(0,160,220);
    border-radius: 12px;
}
.food .header .content .price-wrapper .button:active {
    background: rgba(0,160,220,0.5);
}
.food .header .content .price-wrapper .countctrl {
    // float: right;
    font-size: 12px;
    display: inline-block;
    line-height: 12px;
    color: rgb(0,160,220);
}
.food .header .content .price-wrapper .countctrl .add,
.food .header .content .price-wrapper .countctrl .decrease {
    font-size: 24px;
    padding: 0 4px;
}
// 商品介绍
.food .intro {
    margin: 16px 0;
    padding: 18px;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background: #fff;
}
.food .intro .info {
    padding: 6px 8px;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
}

// 商品评价
.food .rating-panel {
    margin: 16px 0;
    background: #fff;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food .rating-panel .rating-header {
    padding: 18px 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food .rating-panel .title {
    }

// 评价列表
.food .rating-content {
    padding: 0 18px;
}
.food .rating-panel .rating-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.food .rating-panel .rating-list .rating-item {
    padding: 16px 0;
    font-size: 0;
    border-bottom: 0.5px solid rgba(7,17,27,0.1);
}
.food .rating-panel .rating-list .rating-item:last-child {
    border-bottom: 0;
}
.rating-list .rating-item .sub-info {
    line-height: 12px;
    display: flex;
    justify-content: space-between;
}
.rating-list .rating-item .sub-info .time {
    font-size: 10px;
    line-height: 12px;
    color: rgb(147,153,159);
    display: inline-block;
}
.rating-list .rating-item .sub-info .user-info {
    display: inline-block;
    font-size: 0;
    line-height: 12px;
}
.rating-list .rating-item .sub-info .user-info .username {
    font-size: 10px;
    line-height: 12px;
    color: rgb(147,153,159);
    vertical-align: top;
}
.rating-list .rating-item .avatar {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-left: 6px;
    vertical-align: top;
}
.rating-list .rating-item .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.rating-list .rating-item .content {
    font-size: 0;
    margin-top: 6px;
}
.rating-list .rating-item .content .icon-thumb_down,
.rating-list .rating-item .content .icon-thumb_up {
    font-size: 12px;
    line-height: 12px;
    padding-right: 4px;
}
.rating-list .rating-item .content .icon-thumb_up {
    color: rgb(0,160,220);
}
.rating-list .rating-item .content .icon-thumb_down {
    color: rgb(147,153,159);
}
.rating-list .rating-item .content .text {
    font-size: 12px;
    color: rgb(7,17,27);
}

.food .rating-content .rating-empty {
    padding: 12px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
}
</style>
