<template>
  <view class="search_box">
    <input type="text" value="搜索" class="search_input" />
  </view>
  <swiper :indicator-dots="true" :autoplay="true">
    <swiper-item v-for="item in swiperList" :key="item.goods_id">
      <navigator :url="'/subpkg/goods_details/goods_details?goods_id=' + item.goods_id">
        <image :src="item.image_src" class="swiper_img" mode="widthFix"></image>
      </navigator>
    </swiper-item>
  </swiper>
  <view class="cate_simple">
    <view class="cate_item" v-for="(cate,index) in cateList" :key="index" @click="getCateDetails(cate)">
      <image :src="cate.image_src" mode="widthFix"></image>
    </view>
  </view>
  <view class="floor-list">
    <view class="floor-item" v-for="(item, i) in floorData" :key="i">
      <image :src="item.floor_title.image_src" class="floor-title"></image>
      <view class="floor-img-box">
        <navigator class="left-img-box" :url="item.product_list[0].navigator_url">
          <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
            mode="widthFix"></image>
        </navigator>
        <view class="right-img-box">
          <navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" :url="item2.navigator_url">
            <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix" v-if="i2!==0">
            </image>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import showMsg from '../../contant/showMsg'
  import {
    $http
  } from '@escook/request-miniprogram'
  uni.$http = $http
  $http.baseUrl = 'https://api-hmugo-web.itheima.net'
  export default {
    data() {
      return {
        swiperList: [],
        cateList: [],
        floorData: []
      }
    },
    onLoad() {
      this.getSlideList()
      this.getCateSimple()
      this.getFloorData()
    },
    methods: {
      async getSlideList() {
        const res = await $http.get('/api/public/v1/home/swiperdata')
        if (res.statusCode !== 200) {
          showMsg()
        }
        this.swiperList = res.data.message
        showMsg("数据请求成功！")
      },
      async getCateSimple() {
        const res_cate = await $http.get('/api/public/v1/home/catitems')
        if (res_cate.statusCode !== 200) {
          showMsg()
        }
        this.cateList = res_cate.data.message
      },
      getCateDetails(item) {
        if (item.name === "分类") {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      async getFloorData() {
        const res = await $http.get('/api/public/v1/home/floordata')
        if (res.statusCode !== 200) showMsg()
        res.data.message.forEach((item)=>{
           item.product_list.forEach((prod)=>{
             prod.navigator_url='/subpkg/goods_list/goods_list?' +prod.navigator_url.split('?')[1]
           })
        })
        this.floorData = res.data.message
      }
    }
  }
</script>

<style lang="scss">
  .swiper_img {
    width: 100%;
  }

  .search_box {
    height: 30px;
    background-color: #b5cde4;
  }

  .search_input {
    width: 90%;
    height: 20px;
    line-height: 30px;
    margin: 0 auto;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #b5cde4;
  }

  .cate_simple {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
  }

  .cate_item image {
    width: 50px;
  }

  .floor-list {
    margin-top: 20rpx;
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
</style>