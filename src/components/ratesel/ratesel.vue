<!--
  1、外部需要传入参数：
    1.1、ratings:评价数组，计算评价个数
    1.2、preference:个性化标签名称，默认为：All,POSITIVE,NAGETIVE
  2、触发调用外部方法：
    2.1、someonly(Boolean)，只看内容评价，参数为bool值
    2.2、relType(Number)，2为All，0为POSITIVE，1为NAGETIVE
 -->
<template lang="html">
  <div class="ratesel">
    <div class="ratesel-wrapper">
      <ul class="category-panel">
        <li class="cate-item cate-item-all" :class="{'cate-item-active':selType===2}" @click="switchSelType(2)">
          <span class="cate-name">{{preference.all}}</span>
          <span class="cate-count">{{ratings.length}}</span>
        </li>
        <li class="cate-item cate-item-positive" :class="{'cate-item-active':selType===0}" @click="switchSelType(0)">
          <span class="cate-name">{{preference.positive}}</span>
          <span class="cate-count">{{positives.length}}</span>
        </li>
        <li class="cate-item cate-item-nagetive" :class="{'cate-item-active':selType===1}" @click="switchSelType(1)">
          <span class="cate-name">{{preference.nagetive}}</span>
          <span class="cate-count">{{nagetives.length}}</span>
        </li>
      </ul>
      <div class="someonly-panel" @click="someonly_click">
        <span class="icon icon-check_circle" :class="{someonly:someonly}"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>

<script>
// 定义常量
const POSITIVE = 0;
const NAGETIVE = 1;
const ALL = 2;

export default {
  data: function() {
    return {
      someonly: false,
      selType: ALL,
    }
  },
  props: {
    preference: {
      type: Object,
      default: function() {
        return {
          all: 'All',
          positive: 'POS',
          nagetive: 'NAG',
        };
      }
    },
    ratings: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    positives: function() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      })
    },
    nagetives: function() {
      return this.ratings.filter(rating => {
        return rating.rateType === NAGETIVE;
      })
    }
  },
  methods: {
    someonly_click: function() {
      this.someonly = !this.someonly;
      this.$emit('someonly', this.someonly);
    },
    selItemClass: function(index) {
      let last = this.selectItems.length - 1;
      if (index === 0) return 'category-item-class_first';
      if (index === last) return 'category-item-class_last';
      return 'category-item-class_normal';
    },
    switchSelType: function(index) {
      if (this.selType === index) return;
      switch (index) {
        case 0:
          this.selType = POSITIVE;
          break;
        case 1:
          this.selType = NAGETIVE;
          break;
        case 2:
          this.selType = ALL;
          break;
        default:
          break;
      }
      this.$emit('selType', index);
    }
  }
}
</script>

<style lang="css">
.ratesel .category-panel {
  margin: 0;
  padding: 18px 0;
  list-style-type: none;
  font-size: 0;
}

.ratesel .category-panel .cate-item {
  margin: 0 8px 0 0;
  padding: 8px 12px;
  display: inline-block;
  font-size:0;
  color:#666;
}
.ratesel .category-panel .cate-item.cate-item-active {
  color: #fff;
}
.ratesel .category-panel .cate-item-all,
.ratesel .category-panel .cate-item-positive {
  background: rgba(0,160,220,0.3);
}
.ratesel .category-panel .cate-item-all.cate-item-active,
.ratesel .category-panel .cate-item-positive.cate-item-active{
  background: rgba(0,160,220,1);
}
.ratesel .category-panel .cate-item-nagetive {
  background: rgba(0,0,0,0.2);
}
.ratesel .category-panel .cate-item-nagetive.cate-item-active {
  background: rgba(0,0,0,0.5);
}

.ratesel .category-panel .cate-item:last-child {
  margin-right:0;
}
.ratesel .category-panel .cate-item .cate-name {
  font-size: 12px;
}
.ratesel .category-panel .cate-item .cate-count {
  font-size: 8px;
  margin-left: 4px;
}

.ratesel .someonly-panel {
  font-size: 0;
  padding: 12px 0;
  border-top: 0.5px solid rgba(7,17,27,0.1);
}
.ratesel .someonly-panel .icon,
.ratesel .someonly-panel .text {
  display: inline-block;
}
.ratesel .someonly-panel .icon {
  margin-right: 4px;
  font-size: 24px;
  color: rgb(147,153,159);
  vertical-align: top;
}
.ratesel .someonly-panel .icon.someonly {
  color: rgb(0,160,220);
}
.ratesel .someonly-panel .text {
  font-size: 12px;
  line-height: 24px;
  color: rgb(147,153,159);
}
</style>
