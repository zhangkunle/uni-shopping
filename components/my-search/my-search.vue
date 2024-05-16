<template>
  <view class="search">
    <view class="search_box" @click="getIntoSearch">
      <uni-icons type="search" size="18"></uni-icons>
      <text>搜索</text>
    </view>
  </view>

</template>

<script>
  export default {
    name: "my-search",
    data() {
      return {

      };
    },
    methods:{
      getIntoSearch(){
        uni.navigateTo({
          url:"/subpkg/goods_search/goods_search"
        })
      }
    }
  }
</script>

<style lang="scss">
  .search {
    position: sticky;
    top:0;
    z-index: 9999;
    height: 35px;
    background-color: #c00000;
  }

  .search_box {
    width: 90%;
    height: 25px;
    line-height: 25px;
    margin: 0 auto;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    border-radius: 15px;
    border: 1px solid #b5cde4;
  }
</style>