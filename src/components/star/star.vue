<!--
  调用时需要传入两个参数：
  1、score
  2、size
 -->
<template lang="html">
  <div class="star">
    <div class="star-item" v-for="itemStyle in itemStyles" :class="itemStyle">
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {

    };
  },
  props: ['size', 'score', 'count'],
  computed: {
    itemStyles: {
      get: function() {
        let count = this.count || 5;
        let score = this.score;
        let size = this.size;
        let styleArray = [];
        while (count-- > 0) {
          if (score >= 1) styleArray.push('star' + size + '_on');
          else if (score >= 0.5) styleArray.push('star' + size + '_half');
          else styleArray.push('star' + size + '_off');
          if (score > 0) score--;
        }
        return styleArray;
      }
    }
  }
}
</script>

<style lang="css">
.star {
  text-align: center;
}

.star .star24_on,
.star .star24_half,
.star .star24_off {
  width: 12px;
  height: 12px;
  background-size:12px 12px;
  margin-right: 12px;
}
.star .star24_on {
  background-image: url('star24_on@2x.png');
}
.star .star24_half {
  background-image: url('star24_half@2x.png');
}
.star .star24_off {
  background-image: url('star24_off@2x.png');
}

.star .star36_on,
.star .star36_half,
.star .star36_off {
  width: 18px;
  height: 18px;
  background-size:18px 18px;
  margin-right: 18px;
}
.star .star36_on {
  background-image: url('star36_on@2x.png');
}
.star .star36_half {
  background-image: url('star36_half@2x.png');
}
.star .star36_off {
  background-image: url('star36_off@2x.png');
}

.star .star48_on,
.star .star48_half,
.star .star48_off {
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
  margin-right: 24px;
}
.star .star48_on {
  background-image: url('star48_on@2x.png');
}
.star .star48_half {
  background-image: url('star48_half@2x.png');
}
.star .star48_off {
  background-image: url('star48_off@2x.png');
}

.star-item {
  display: inline-block;
}
.star-item:last-child {
  margin-right: 0;
}
</style>
