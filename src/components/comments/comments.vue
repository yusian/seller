<template lang="html">
  <div class="comments" ref="scroll">
    <div class="com-wrapper">
      <div class="basic-info">
        <div class="left">
          <div class="total-score">{{seller.score}}</div>
          <div class="total-score-title">综合评分</div>
          <div class="total-score-desc">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="attitude">
            <span class="rate-quota">服务态度</span>
            <star size=36 :score="seller.foodScore"></star>
            <span class="sub-score">{{seller.foodScore}}</span>
          </div>

          <div class="attitude">
            <span class="rate-quota">服务态度</span>
            <span><star size=36 :score="seller.serviceScore"></star></span>
            <span class="sub-score">{{seller.serviceScore}}</span>
          </div>
          <div class="attitude">
            <span class="rate-quota">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="type-ctrl">
          <ratesel :preference="ratePrefe" :ratings="ratings" @someonly="someonly" @selType="switchSelType"></ratesel>
        </div>
        <ul class="rating-list">
          <li class="rating-item" v-for="rating in ratings" v-show="showRateItem(rating)">
              <div class="rating-item-wrapper">
                <div class="avatar"><img :src="rating.avatar" alt="头像"></div>
                <div class="rate-content">
                  <div class="user-info">
                    <div class="username">{{rating.username}}</div>
                    <div class="rating-time">{{rating.rateTime | dateFormate}}</div>
                  </div>
                  <div class="rating-quota">
                    <star size=24 :score="rating.score"></star>
                    <span class="delivery">{{rating.deliveryTime}}分钟送达</span>
                  </div>
                  <div class="rate-text" v-show="rating.text.length > 0">{{rating.text}}</div>
                  <div class="recommond">
                    <span class="icon" :class="(rating.rateType == 0)?'icon-thumb_up':'icon-thumb_down'"></span>
                    <span class="recommond-text" v-for="text in rating.recommend">{{text}}</span>
                  </div>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const ALL = 2;
const POSITIVE = 0;
const NAGETIVE = 1;
import star from '@/components/star/star.vue'
import ratesel from '@/components/ratesel/ratesel.vue'
import jsonData from '@/../data.json'
import BetterScroll from 'better-scroll'
import {
  dateFormate
} from '@/common/js/date.js'
export default {
  data: function() {
    return {
      ratings: null,
      ratePrefe: {
        all: '全部',
        positive: '满意',
        nagetive: '不满意'
      },
      selType: ALL,
      isOnly: false
    }
  },
  props: {
    seller: {
      type: Object,
    }
  },
  filters: {
    dateFormate: function(timestamp) {
      return dateFormate(new Date(timestamp), 'YYYY-MM-dd HH:mm');
    }
  },
  computed: {},
  components: {
    ratesel,
    star,
  },
  methods: {
    someonly: function(isOnly) {
      this.isOnly = isOnly;
    },
    switchSelType: function(type) {
      this.selType = type;
    },
    showRateItem: function(rating) {
      let type_bool = (this.selType === rating.rateType) || this.selType === ALL;
      let hasContent = !this.isOnly || (rating.text.length > 0);
      return type_bool && hasContent;
    }
  },
  created: function() {
    this.ratings = jsonData.ratings;
    this.$nextTick(() => {
      this.scroll = new BetterScroll(this.$refs.scroll, {
        click: true,
      })
    });
  }
}
</script>

<style lang="css">
.comments {
  max-height: 100%;
  font-size: 0;
  background: rgb(240, 240, 240);
  overflow: hidden;
}
.com-wrapper {
  padding-bottom: 20px;
}
.basic-info {
  padding: 18px 0;
  display: flex;
  background: #fff;
  margin-bottom: 18px;
  border-bottom: 0.5px solid rgba(7, 17, 27, 0.2);
}

/* 基本信息左半部分 */
.basic-info .left {
  flex: 1 1 auto;
  text-align: center;
}
.basic-info .total-score {
  font-size: 24px;
  line-height: 28px;
  color: rgb(255, 153, 0);
}
.left .total-score-title {
  font-size: 12px;
  color: rgb(7, 17, 27);
  line-height: 12px;
  margin-top: 6px;
}
.left .total-score-desc {
  font-size: 10px;
  line-height: 10px;
  color: rgb(147, 153, 159);
  margin: 8px 0 6px 0;
}

/* 基本信息右半部分 */
.basic-info .right {
  flex: 0 0 auto;
  padding: 0 24px;
  border-left: 0.5px solid rgba(7, 17, 27, 0.2);
}
.basic-info .right .attitude {
  padding: 4px 0;
  display: flex;
  align-items: center;
}
.basic-info .right .rate-quota {
  display: inline-block;
  font-size: 12px;
  line-height: 18px;
  color: rgb(7, 17, 27);
}
.basic-info .right .star,
.basic-info .right .delivery {
  display: inline-block;
  padding: 0 12px;
}
.basic-info .right .star .star-item {
  margin-right: 4px;
}
.basic-info .right .star .star-item:last-child {
  margin-right: 0;
}
.basic-info .right .sub-score {
  font-size: 12px;
  line-height: 18px;
  color: rgb(255, 153, 0);
  display: inline-block;
}
.basic-info .right .delivery {
  font-size: 12px;
  line-height: 18px;
  color: rgb(147, 153, 159);
}

.comments .content {
  background: #fff;
  border-top: 0.5px solid rgba(7, 17, 27, 0.2);
  border-bottom: 0.5px solid rgba(7, 17, 27, 0.2);
}
.comments .content .type-ctrl {
  padding: 0 18px;
  border-bottom: 0.5px solid rgba(7, 17, 27, 0.2);
}
.comments .content .rating-list {
  /* font-size: 10px; */
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
.comments .content .rating-list .rating-item {
  padding: 18px 18px 0 18px;
}
.rating-list .rating-item:last-child .rating-item-wrapper{
  border-bottom: 0;
}
.rating-list .rating-item .rating-item-wrapper {
  border-bottom: 0.5px solid rgba(7, 17, 27, 0.2);
  padding-bottom: 18px;
  display: flex;
  flex-direction: row;
}
.rating-list .rating-item .avatar {
  flex: 0 0 28px;
  margin-right: 12px;
}
.rating-list .rating-item .avatar img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.rating-list .rating-item .rate-content {
  flex: auto;
}
.rating-list .rating-item .rate-content .user-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.rating-item .rate-content .user-info .username {
  font-size: 10px;
  line-height: 12px;
  color: rgb(7, 17, 27);
}
.rating-item .rate-content .user-info .rating-time {
  font-size: 10px;
  font-weight: 200;
  line-height: 12px;
  color: rgb(147, 153, 159);

}

.rating-item .rate-content .rating-quota {
  font-size: 0;
  margin-top: 4px;
}
.rating-item .rate-content .rating-quota .star {
  display: inline-block;
}
.rating-item .rate-content .rating-quota .star .star-item {
  margin-right: 2px;
}
.rating-item .rate-content .rating-quota .star .star-item:last-child {
  margin-right: 0;
}
.rating-item .rate-content .rating-quota .delivery {
  font-size: 10px;
  margin-left: 6px;
  display: inline-block;
  color: rgb(147, 153, 159);
}

.rating-item .rate-content .rate-text {
  font-size: 12px;
  line-height: 18px;
  margin-top: 6px;
  color: rgb(7, 17, 27);
}

.rating-item .rate-content .recommond {
  margin-top: 8px;
}
.rating-item .rate-content .recommond .icon {
  font-size: 12px;
  line-height: 16px;
  display: inline-block;
}
.rating-item .rate-content .recommond .icon-thumb_up {
  color: rgb(0, 160, 220);
}
.rating-item .rate-content .recommond .icon-thumb_down {
  color: rgb(183, 187, 191);
}
.rating-item .rate-content .recommond .recommond-text {
  font-size: 9px;
  color: rgb(147, 153, 159);
  display: inline-block;
  padding: 0 6px;
  margin: 0 0 8px 8px;
  border: 1px solid rgba(7, 17, 27, 0.1);
}
</style>
