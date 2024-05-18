<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" class="swiper">
      <swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
        <image :src="item.pics_big" class="swiper_img" mode="widthFix" @click="previewImage(i,[item.pics_big])"></image>
      </swiper-item>
    </swiper>
    <view class="goods_message" v-if="goodsInfo.goods_name">
      <view class="goods_price">￥{{goodsInfo.goods_price}}</view>
      <view class="goods_message_middle">
        <view class="goods_text">
          {{goodsInfo.goods_name}}
        </view>
        <view class="collect">
          <uni-icons type="star" size="22" color="gray"></uni-icons>
          <text class="collect_text">收藏</text>
        </view>
      </view>
      <view class="post_message">
        快递：免运费
      </view>
    </view>
  </view>
  <view class="goods_del">
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
  </view>
  <view class="goods-carts">
    <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
      @buttonClick="buttonClick" />
  </view>
</template>

<script>
  import {
    $http
  } from '@escook/request-miniprogram'
  uni.$http = $http
  $http.baseUrl = 'https://api-hmugo-web.itheima.net'
  import showMsg from '../../contant/showMsg.js'
  export default {
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsInfo(goods_id)
    },
    data() {
      return {
        goodsInfo: {},
        options: [
          {
            icon: 'shop',
            text: '店铺',
            info: 0,
            infoBackgroundColor: '#007aff',
            infoColor: "#f5f5f5"
          },
          {
            icon: 'cart',
            text: '购物车',
            info: 0
          },
        ],
        buttonGroup: [
          {
            text: '加入购物车',
            backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
            color: '#fff'
          }
        ]
    }
  },
  methods: {
    async getGoodsInfo(goods_id) {
      const res = await $http.get('/api/public/v1/goods/detail', {
        goods_id
      })
      if (res.data.meta.status !== 200) return showMsg()
      res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g,
        '<img style="display:block;" ').replace(/webp/g, 'jpg')
      this.goodsInfo = res.data.message
    },
    previewImage(index, pic) {
      uni.previewImage({
        urls: this.goodsInfo.pics.map(x => x.pics_big),
        current: index,
        loop: true
      })
    },
    onClick(e) {
      if(e.content.text === '购物车'){
        uni.switchTab({
          url:'/pages/cart/cart'
        })
      }
    },
    buttonClick(e) {
      console.log(e)
      this.options[1].info++
    }
  }
  }
</script>

<style lang="scss">
  .swiper {
    height: 700rpx;

    .swiper_img {
      width: 100%;
      height: 100%;
    }
  }

  .goods_message {
    margin-top: 20rpx;
    margin-left: 25rpx;

    .goods_price {
      font-size: 42rpx;
      color: red;
    }

    .goods_message_middle {
      display: flex;
      justify-content: space-around;
      margin-top: 25rpx;

      .goods_text {
        font-size: 26rpx;
        padding-right: 25rpx;
      }

      .collect {
        width: 240rpx;
        padding-left: 40rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-left: 1px solid #ccc;

        .collect_text {
          font-size: 26rpx;
          color: gray;
        }
      }
    }

    .post_message {
      margin-top: 30rpx;
      color: gray;
      font-size: 26rpx;
    }
  }

  .goods_del {
    margin-top: 20rpx;
  }

  .goods-carts {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    right: 0;
    left: var(--window-left);
    right: var(--window-right);
    bottom: 0;
  }
</style>