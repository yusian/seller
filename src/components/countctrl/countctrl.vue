<template lang="html">
  <div class="countctrl">
    <transition name="fade">
      <div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCount"></div>
    </transition>
    <transition name="fade">
      <div class="count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="add icon-add_circle" @click.stop="addCount"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props:{
    food:{
      type:Object
    }
  },
  created:function(){

  },
  methods:{
    addCount:function(){
      if (!this.food.count){
        Vue.set(this.food, 'count', 1);
      }else{
      this.food.count++;
      }
    },
    decreaseCount:function(){
      this.food.count--;
    }
  }
}
</script>

<style lang="css">
.countctrl {
  display: flex;
}
.countctrl .decrease,
.countctrl .count,
.countctrl .add {
  display: inline-block;
  padding: 6px;
  vertical-align: top;
}
.countctrl .decrease,
.countctrl .count{
  transition: all 0.4s;
}
.countctrl .count.fade-enter,
.countctrl .count.fade-leave-active,
.countctrl .decrease.fade-enter,
.countctrl .decrease.fade-leave-active {
  opacity: 0;
}
.countctrl .count.fade-enter-active，
.countctrl .decreate.fade-enter-active {
  opacity: 1;
}

.countctrl .decrease.fade-enter,
.countctrl .decrease.fade-leave-active {
  transform: translate3d(24px, 0, 0);
}
.countctrl .count {
  font-size: 10px;
  min-width: 12px;
  color: rgb(147,153,159);
  text-align: center;
}
</style>
