<template>
<div id="app">
  <v-header :seller="seller"></v-header>
  <div class="tabbar">
    <span class="tabbar-item">
        <router-link to="/goods">商品</router-link>
      </span>
    <span class="tabbar-item">
        <router-link to="/comments">评论</router-link>
      </span>
    <span class="tabbar-item">
        <router-link to="/business">商家</router-link>
      </span>

  </div>
  <keep-alive>
    <router-view :seller="seller"></router-view>
  </keep-alive>
</div>
</template>

<script>
import Header from '@/components/header/header'
import data from '@/../static/data.json'
export default {
  name: 'App',
  data: function() {
    return {
      seller: {},
    }
  },
  components: {
    'v-header': Header,
  },
  created: function() {
    setTimeout(() => { // 默认网络请求数据延时加载
      this.$nextTick(() => {
        this.seller = data.seller;
      });
    }, 700);
    // this.$http.get('./api/seller')
    // .then(response => {
    //   this.seller = response.body.data;
    //   console.log(response);
    // })
    // console.log(data.seller);
  }
}
</script>

<style>
@import './common/styles/icon.css';
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

.header {
  flex: 0 0 134px;
}

.tabbar {
  display: flex;
  line-height: 40px;
  text-align: center;
  border-bottom: 0.5px solid #ddd;
  flex: 0 0 40px;
}

.tabbar .tabbar-item {
  flex: 1;
}

.tabbar-item a {
  display: inline-block;
  width: 100%;
}

.tabbar .tabbar-item .router-link-active {
  color: red;
  text-decoration: none;
}
</style>
