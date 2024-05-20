<template>
  <view class="settle_box">
    <label class="radio_box">
      <radio value="r1" :checked="isFullCheck" color="#c00000" class="radio_icon" @click="handleChoose" />
      <text>全选</text>
    </label>
    <view class="settle_text">
      合计：<text class="settle_price">￥{{toSumPrice}}</text>
    </view>
    <view class="settle_btn">
      结算({{settleNum}})
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapState
  } from 'vuex';
  export default {
    name: "my-settlement",
    computed: {
      ...mapState('m_cart', ['checkAll']),
      ...mapGetters('m_cart', ['settleNum', 'toSumPrice', 'totals']),
      isFullCheck() {
        return this.totals === this.settleNum
      }
    },
    methods: {
      handleChoose() {
        this.$emit('choose-all', {
          checkAll: !this.isFullCheck
        })
      }
    }
  }
</script>

<style lang="scss">
  .settle_box {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110rpx;
    font-size: 30rpx;
    background-color: #fff;
    border-top: 1px solid #f7f7f7;
    line-height: 110rpx;
    z-index: 999;

    .radio_icon {
      transform: scale(0.7);
    }

    .settle_text {
      .settle_price {
        color: #c00000;
      }
    }

    .settle_btn {
      width: 255rpx;
      height: 100%;
      font-size: 36rpx;
      background-color: #c00000;
      color: #fff;
      text-align: center;
    }
  }
</style>