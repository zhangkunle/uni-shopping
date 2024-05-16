<template>
  <view class="search">
    <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
  </view>
  <block v-if="searchRes.length === 0">
    <view class="search_history">
      <view class="history_header">
        <view class="history_text">
          搜索历史
        </view>
        <uni-icons type="trash" size="20" class="search_icon" @click="clearHistory"></uni-icons>
      </view>
    </view>
    <view class="history_tags">
      <uni-tag :text="item" :inverted="true" type="primary" v-for="(item,i) in historyLists" :key="i" class="tags" size="small" @click="gotoGoodsList(item)"></uni-tag>
    </view>
  </block>
  <view class="search_suggest_box" v-else>
    <view class="search_suggest" v-for="item in searchRes" :key="item.goods_id">
      <view class="search_text">&nbsp;&nbsp;{{item.goods_name}}</view>
      <uni-icons type="right" size="14" class="search_icon"></uni-icons>
    </view>
  </view>
</template>

<script>
  import {
    $http
  } from '@escook/request-miniprogram'
  uni.$http = $http
  $http.baseUrl = 'https://api-hmugo-web.itheima.net'
  export default {
    onLoad() {
      this.historySearch = JSON.parse(uni.getStorageSync('keyword') || '[]')
    },
    data() {
      return {
        searchValue: '123123',
        timer: null,
        keyword: '',
        searchRes: [],
        historySearch: [],
      }
    },
    methods: {
      input(value) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyword = value
          this.getSearchRes()
        }, 500)
      },
      async getSearchRes() {
        if (this.keyword === '') {
          this.searchRes = []
          return
        }
        const res = await $http.get('/api/public/v1/goods/qsearch', {
          query: this.keyword
        })
        this.searchRes = res.data.message
        this.getHistoryList()
      },
      getHistoryList() {
        const historySet = new Set(this.historySearch)
        historySet.delete(this.keyword)
        historySet.add(this.keyword)
        this.historySearch = Array.from(historySet)
        uni.setStorageSync('keyword', JSON.stringify(this.historySearch))
      },
      clearHistory() {
        uni.showModal({
          title: '确认删除全部历史记录？',
          //问题点 this指向问题 function和箭头函数
          success: (res) => {
            if (res.confirm) {
              this.historySearch = []
              uni.setStorageSync('keyword', '[]')
            }
          }
        })
      },
      gotoGoodsList(keyword){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + keyword
        })
      }
    },
    computed: {
      historyLists() {
        return [...this.historySearch].reverse()
      }
    }
  }
</script>
<style scoped>
  .search {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #c00000;
  }

  .search_suggest {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80rpx;
    border: 1px solid #e8e8e8;
  }

  .search_text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 26rpx;
    line-height: 80rpx;
  }

  .search_icon {
    line-height: 80rpx;
  }

  .history_header {
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    border-bottom: 1px solid #e8e8e8;
  }

  .history_text {
    text-indent: 10rpx;
    font-size: 31rpx;
    line-height: 80rpx;
  }

  .history_tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20rpx;
  }

  .tags {
    font-size: 30rpx;
    margin-left: 20rpx;
  }
</style>