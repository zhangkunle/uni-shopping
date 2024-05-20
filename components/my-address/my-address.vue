<template>
  <view class="add_address" v-if="JSON.stringify(address) === '{}'">
    <button type="primary" size="mini" @click="chooseAddress">请选择收获地址+</button>
  </view>
  <view class="address_message" @click="chooseAddress" v-else>
    <view class="address_first">
      <view class="delivery_name">
        收货人：{{address.userName}}
      </view>
      <view class="delivery_phone_icon">
        <view class="delivery_phone">
          电话：{{address.telNumber}} &nbsp;
          <uni-icons type="right" size="14"></uni-icons>
        </view>
      </view>
    </view>
    <view class="address_second">
      收货地址：{{addstr}}
    </view>
  </view>
  <view class="address_bottom">
    <image src="../../static/cart_border@2x.png" class="address_img" mode="aspectFit"></image>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex';
  export default {
    name: "my-address",
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user',['addstr'])
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        try {
          const result = await uni.chooseAddress();
          if (result && result.errMsg === 'chooseAddress:ok') {
            this.updateAddress(result.addressInfo || result)
          } else {
            console.log('用户未选择地址或发生其他错误', result);
          }
        } catch (error) {
          console.error('选择地址时发生错误', error);
          this.address = null; // 或者其他默认值  
        }
      }
    }
  }
</script>

<style lang="scss">
  .add_address {
    height: 170rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .address_message {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 130rpx;
    font-size: 28rpx;
    padding-left: 15rpx;

    .address_first {
      display: flex;
      justify-content: space-between;
      padding-top: 20rpx;
      padding-bottom: 10rpx;
    }
    .address_second{
      padding-bottom: 20rpx;
    }
  }

  .address_img {
    width: 100%;
    height: 28rpx;
  }
</style>