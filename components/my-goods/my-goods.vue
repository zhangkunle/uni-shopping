<template>
  <view class="goods_item" @click="getGoodDetails(goods.goods_id)">
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo || defaultImg" class="goods_img"></image>
    </view>
    <view class="goods_content">
      <view class="goods_title">
        {{goods.goods_name}}
      </view>
      <view class="goods_price">
        ￥{{Number(goods.goods_price).toFixed(2)}}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    methods:{
      getGoodDetails(id){
        uni.navigateTo({
          url:'/subpkg/goods_details/goods_details?goods_id=' + id
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .goods_item {
    display: flex;
    width: 100%;
    margin-top: 20rpx;

    .goods-item-left {
      margin-right: 10rpx;

      .goods_img {
        width: 200rpx;
        height: 200rpx;
        display: block;
      }
    }

    .goods_content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods_title {
        font-size: 30rpx;
      }

      .goods_price {
        font-size: 32rpx;
        color: red;
      }
    }
  }
</style>