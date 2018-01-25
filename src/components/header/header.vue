<template lang="html">
  <div class="header">
    <div class="main">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="icon"></span>
          <span class="text">{{seller.name}}</span>
        </div>
        <div class="sub">
          <span>{{seller.description+'/'+seller.deliveryTime+'分钟送达'}}</span>
        </div>
        <div class="support" v-if="seller.supports">
          <span :class="support_icon_class" class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="count" v-if="seller.supports" @click="detail_display=true;">
          <span class="text">{{seller.supports.length+'个'}}</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <div class="bulletin" @click="detail_display=true;">
      <span class="icon"></span><span class="text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div class="detail" v-show="detail_display">
      <div class="main">
        <div class="name">{{seller.name}}</div>
        <star size="48" :score="seller.score"></star>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>

        <ul class="support-list" v-if="seller.supports">
          <li class="support-item" v-for="(item,index) in seller.supports">
            <span class="icon" :class="support_icon_class_array[index]"></span>
            <span class="text">
              {{item.description}}
            </span>
          </li>
        </ul>

        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="detail-bulletin">
          {{seller.bulletin}}
        </div>
      </div>
      <div class="close-panel clearfix">
        <i class="icon-close" @click="detail_display=false"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'
export default {
  data:function(){
    return {
      support_icon_class_array:['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      detail_display: false,
    }
  },
  props: ['seller'],
  computed:{
    support_icon_class:{
      get:function(){
        let type = this.seller.supports[0].type;
        return this.support_icon_class_array[type];
      }
    }
  },
  components:{
    star
  }
}
</script>

<style lang="less">
@import '../../common/styles/icon.css';
* {
  box-sizing: border-box;
}
.header {
  position: relative;
  background: rgba(7,17,27,0.5);
  overflow: hidden;
  color: #fff;
}
.main {
  padding: 12px 12px 6px;
  font-size: 0;
  display: flex;
}
.main .avatar {
  padding: 12px;
  display: inline-block;
  vertical-align: top;
}
.main .avatar img {
  width: 64px;
  height: 64px;
  border-radius: 2px;
}

.main .content {
  padding-top: 12px;
  display: inline-block;
  flex: 1;
}
.main .content {
  line-height: 18px;
  padding-left: 4px;
  position: relative;
}
.main .content .title {
  padding-top: 2px;
  font-size: 0;
}
.main .content .title .icon {
  width: 30px;
  height: 18px;
  display: inline-block;
  background-image: url('./brand@2x.png');
  background-size: 30px 18px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.main .content .title .text {
  font-size: 16px;
  padding-left: 6px;
  font-weight: bold;
}

.main .content .sub {
  font-size: 12px;
  line-height: 12px;
  font-weight: 200;
}

.main .content .support {
  margin-top: 10px;
  line-height: 12px;
}
.main .content .support .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.main .content .support .icon.decrease{
  background-image:url('decrease_1@2x.png');
}
.main .content .support .icon.discount {
  background-image:url('discount_1@2x.png');
}
.main .content .support .icon.guarantee {
  background-image:url('guarantee_1@2x.png');
}
.main .content .support .icon.invoice {
  background-image:url('invoice_1@2x.png');
}
.main .content .support .icon.special {
  background-image:url('special_1@2x.png');
}
.main .content .support .text {
  font-size: 10px;
  font-weight: 200;
  line-height: 12px;
  padding-left: 4px;
}

.main .content .count {
  position: absolute;
  font-size: 0;
  padding: 0px 8px;
  background: rgba(0,0,0,0.2);
  bottom: 8px;
  right: 0;
  border-radius: 13px;
}
.main .content .count .text {
  font-size: 10px;
  line-height: 24px;
  font-weight: 200;
  display: inline-block;
}
.main .content .count .icon-keyboard_arrow_right:before {
  font-size: 10px;
  line-height: 24px;
  margin-left: 2px;
  vertical-align: top;
  display: inline-block;
}

.header .bulletin {
  background: rgba(7,17,27,0.2);
  padding: 0 40px 0 12px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}
.header .bulletin .icon {
  height: 12px;
  width: 22px;
  background-size: 22px 12px;
  display: inline-block;
  background-repeat: no-repeat;
  background-image: url('bulletin@2x.png');
}
.header .bulletin .text {
  font-size: 10px;
  font-weight: 200;
  vertical-align: top;
  display: inline-block;
  margin-left: 4px;
}
.header .bulletin .icon-keyboard_arrow_right:before {
  position: absolute;
  bottom: 7px;
  right: 10px;
}

.header .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  overflow: hidden;
}


.detail {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: rgba(7,17,27,0.8);
  transition: all 0.5s;
  z-index: 100;
}
.detail.fade-enter, .detail.fade-leave-active {
  opacity: 0;
}
.detail .main {
  padding: 64px 0;
  min-height: 100%;
  width: 100%;
  font-size: 16px;
  display: block;
}

.detail .main .name {
  text-align: center;
  display: block;
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;
}
.detail .main .star {
  margin-top: 16px;
}

.detail .main .title {
  margin-top: 28px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  padding: 0 36px;
}
.detail .main .title .line {
  flex: 1;
  background: rgba(255,255,255,0.2);
  height: 1px;
}
.detail .main .title .text {
  padding: 0 12px;
}
.support-list {
  display: block;
  margin: 0;
  padding: 0;
}
.detail .main .support-item {
  font-size: 0;
  padding: 0 48px;
  margin-bottom: 12px;
}
.detail .main .support-item:last-child {
  margin-bottom: 0;
}
.detail .main .support-item .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.detail .main .support-item .icon.decrease{
  background-image:url('decrease_2@2x.png');
}
.detail .main .support-item .icon.discount {
  background-image:url('discount_2@2x.png');
}
.detail .main .support-item .icon.guarantee {
  background-image:url('guarantee_2@2x.png');
}
.detail .main .support-item .icon.invoice {
  background-image:url('invoice_2@2x.png');
}
.detail .main .support-item .icon.special {
  background-image:url('special_2@2x.png');
}
.detail .main .support-item .text {
  margin-left: 6px;
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
  text-align: top;
}

.detail .main .detail-bulletin {
  padding: 0 48px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 200;
}

.detail .close-panel {
  margin-top: -64px;
  height: 64px;
  width: 100%;
}
.detail .close-panel .icon-close {
  width: 32px;
  height: 32px;
  margin: 0 auto;
  display: block;
  font-size: 32px;
}
.detail .close-panel .icon-close:active {
  color: rgba(255,255,255,0.5);
}
</style>
