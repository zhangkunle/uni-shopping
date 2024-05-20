<template>
  <view class="goods_item" v-if="goods.goods_id">
    <radio value="r1" :checked="goods.goods_state" color="#C00000" class="goods_radio" @click="handleRadioChange"
      v-if="showRadioNumber"></radio>
    <view class="goods-item-left">
      <image :src="goods.goods_big_logo || defaultImg" class="goods_img"></image>
    </view>
    <view class="goods_content">
      <view class="goods_title" @click="getGoodDetails(goods.goods_id)">
        {{goods.goods_name}}
      </view>
      <view class="goods_bottom">
        <view class="goods_price">
          ￥{{Number(goods.goods_price).toFixed(2)}}
        </view>
        <view class="goods_count">
          <uni-number-box :min="1" :value="goods.goods_count" background="#fff" @change="handleNumberBox"
            class="goods_number_box" v-if="showRadioNumber"></uni-number-box>
        </view>
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
      showRadioNumber: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        numberValue: 0
      }
    },
    methods: {
      getGoodDetails(id) {
        uni.navigateTo({
          url: '/subpkg/goods_details/goods_details?goods_id=' + id
        })
      },
      handleNumberBox(e) {
        this.$emit('get-count', {
          goods_id: this.goods.goods_id,
          goods_count: +e
        })
      },
      handleRadioChange() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
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

    .goods_radio {
      line-height: 200rpx;
      transform: scale(0.7)
    }

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

      .goods_bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .goods_price {
          font-size: 32rpx;
          color: #c00000;
        }
      }
    }
  }
</style>