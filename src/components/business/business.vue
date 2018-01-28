<template lang="html">
  <div class="business" ref="scroll">
    <div class="business-wrapper">
      <div class="basic-info">
        <div class="top-info">
          <div>
            <div class="name">{{seller.name}}</div>
            <div class="sale-info">
              <star size="36" :score="seller.score"></star>
              <span class="rating-count">({{seller.ratingCount}})</span>
              <span class="sale-count">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="favorite" @click="favorite_click">
            <div class="icon-favorite" :class="{'active':isFavorite}"></div>
            <div class="favorite-text">{{isFavorite?'已收藏':'未收藏'}}</div>
          </div>
        </div>
        <div class="tag-info">
          <div class="basic-tag">
            <div class="text">起送价</div>
            <div class="content">{{seller.minPrice}}<span class="unit">元</span></div>
          </div>
          <div class="basic-tag">
            <div class="text">商家配送</div>
            <div class="content">{{seller.deliveryPrice}}<span class="unit">元</span></div>
          </div>
          <div class="basic-tag">
            <div class="text">平均配送时间</div>
            <div class="content">{{seller.deliveryTime}}<span class="unit">分钟</span></div>
          </div>
        </div>
      </div>
      <div class="notice-active">
        <div class="title">公告与活动</div>
        <div class="content">{{seller.bulletin}}</div>
        <ul class="supports">
          <li class="support" v-for="support in seller.supports">
            <span class="icon" :class="'type-'+support.type"></span>
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <div class="real-images">
        <div class="title">商家实景</div>
        <div ref="imageScroll">
          <ul class="image-list" ref="imageList">
            <li class="image-item" v-for="url in seller.pics">
              <img :src="url" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="aux-info">
        <div class="title">商家信息</div>
        <ul class="aux-info-list">
          <li class="aux-info-item" v-for="info in seller.infos">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import JSON from '@/../static/data.json'
import star from '@/components/star/star.vue'
import BetterScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart.vue'
export default {
  data: function() {
    return {
      isFavorite: false,
    }
  },
  props: {
    seller: {
      type: Object,
    }
  },
  methods: {
    favorite_click: function() {
      console.log(this.isFavorite);
      this.isFavorite = !this.isFavorite;
    },
    _reloadData: function() {
      this.scroll.refresh();
      if (!this.seller.pics) return;
      let count = this.seller.pics.length;
      let width = count * (120 + 6) - 6;
      this.$refs.imageList.style.width = width + 'px';
      this.imageScroll.refresh();
    }
  },
  components: {
    star,
    shopcart
  },
  mounted: function() {
    console.log('mounted...');
    this.scroll = new BetterScroll(this.$refs.scroll, {
      click: true
    });
    this.imageScroll = new BetterScroll(this.$refs.imageScroll, {
      scrollX: true,
    });
    this._reloadData();
  },
  updated: function() {
    console.log('updated...');
    this._reloadData();
  }
}
</script>

<style lang="less">
@import '../../common/styles/icon.css';
.business {
    height: 100%;
    background: rgb(240, 240, 240);
    font-size: 10px;
    color: red;
    overflow: hidden;
}
.business .business-wrapper {
    padding-bottom: 1px;
}
.business .aux-info,
.business .basic-info,
.business .notice-active,
.business .real-images {
    background: #fff;
    min-height: 40px;
    margin-bottom: 20px;
    border-top: 0.5px solid rgba(7, 17, 27, 0.2);
    border-bottom: 0.5px solid rgba(7, 17, 27, 0.2);
}
.business .basic-info {
    display: flex;
    flex-direction: column;
    border-top: 0;
    padding: 0 18px;
}
.basic-info .top-info {
    display: flex;
    padding: 18px 0;
    width: 100%;
    justify-content: space-between;
    border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
}
.basic-info .top-info .name {
    font-size: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
}
.basic-info .top-info .sale-info {
    display: flex;
    margin-top: 8px;
}
.basic-info .top-info .star-item {
    margin-right: 6px;
}
.basic-info .top-info .star-item:last-child {
    margin-right: 0;
}
.basic-info .top-info .rating-count {
    font-size: 10x;
    display: inline-block;
    color: rgb(77, 85, 93);
    line-height: 18px;
    margin-left: 8px;
}
.basic-info .top-info .sale-count {
    color: rgb(77, 85, 93);
    margin-left: 12px;
    line-height: 18px;
}
.basic-info .top-info .favorite {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.basic-info .top-info .icon-favorite {
    font-size: 24px;
    color: rgb(240, 240, 240);
}
.basic-info .top-info .icon-favorite.active {
    color: rgb(240, 20, 20);
}
.basic-info .top-info .favorite-text {
    margin-top: 4px;
    font-size: 10px;
    color: rgb(77, 85, 93);
}
.basic-info .tag-info {
    display: flex;
    padding: 18px 0;
}
.basic-info .tag-info .basic-tag {
    flex: auto;
    text-align: center;
    border-right: 0.5px solid rgba(7, 17, 27, 0.1);
}
.basic-info .tag-info .basic-tag:last-child {
    border-right: 0;
}
.basic-info .tag-info .basic-tag .text {
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
}
.basic-info .tag-info .basic-tag .content {
    margin-top: 4px;
    font-size: 24px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(7, 17, 27);
}
.basic-info .tag-info .basic-tag .content .unit {
    font-size: 10px;
}

// 公告与活动
.notice-active {
    padding: 18px 18px 0;
    font-size: 0;
}
.notice-active .title {
    font-size: 16px;
    line-height: 16px;
    color: rgb(7, 17, 27);
}
.notice-active .content {
    padding: 8px 12px 16px;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(240, 20, 20);
}
.notice-active .supports {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.notice-active .support {
    padding: 16px 12px;
    border-top: 0.5px solid rgba(7, 17, 27, 0.1);
}
.notice-active .support .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    vertical-align: top;
    background-repeat: no-repeat;
}
.notice-active .support .icon.type-0 {
    background-image: url("decrease_2@2x.png");
}
.notice-active .support .icon.type-1 {
    background-image: url("discount_2@2x.png");
}
.notice-active .support .icon.type-2 {
    background-image: url("guarantee_2@2x.png");
}
.notice-active .support .icon.type-3 {
    background-image: url("invoice_2@2x.png");
}
.notice-active .support .icon.type-4 {
    background-image: url("special_2@2x.png");
}
.notice-active .support .text {
    font-size: 12px;
    line-height: 16px;
    font-weight: 200;
    color: rgb(7, 17, 27);
    margin-left: 6px;
}

// 图片列表
.real-images {
    padding: 18px;
}
.real-images .title {
    font-size: 16px;
    color: rgb(7 ,17, 27);
}
.real-images .image-list {
    list-style-type: none;
    padding: 0;
    margin: 12px 0 0;
    white-space: nowrap;
    // width: 1000px;
}
.real-images .image-item {
    display: inline-block;
    margin-right: 6px;
}
.real-images .image-item:last-child {
    margin-right: 0;
}
.real-images .image-item img {
    width: 120px;
    height: 90px;
}
// 商家信息

.aux-info {
    padding: 18px 18px 0;
}
.aux-info .title {
    font-size: 16px;
    color: rgb(7, 17, 27);
}
.aux-info .aux-info-list {
    margin: 12px 0 0;
    padding: 0;
    list-style-type: none;
}
.aux-info .aux-info-item {
    padding: 16px 12px;
    font-size: 12px;
    font-weight: 200;
    line-height: 16px;
    color: rgb(7, 17, 27);
    border-top: 0.5px solid rgba(7, 17, 27, 0.1);
}
</style>
