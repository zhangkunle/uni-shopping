<template>
  <view class="goods_list_box">
    <block v-for="(item,i) in goodsList" :key="i">
      <my-goods :goods="item"></my-goods>
    </block>
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
      this.requestQuery.query = options.query || ''
      this.requestQuery.cid = options.cid || ''
      this.getGoodsList()
    },
    data() {
      return {
        requestQuery: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      }
    },
    methods: {
      async getGoodsList(cb) {
        this.isLoading = true
        const res = await $http.get('/api/public/v1/goods/search', this.requestQuery)
        this.isLoading = false
        cb && cb()
        if (res.data.meta.status === 200) {
          this.goodsList = [...this.goodsList, ...res.data.message.goods]
          this.total = res.data.message.total
        }
      }
    },
    onReachBottom() {
      if (this.requestQuery.pagenum * this.requestQuery.pagesize > this.total) showMsg('已加载完全部数据！')
      if (this.isLoading) return
      this.requestQuery.pagenum += 1
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.requestQuery.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    }
  }
</script>