<template>
  <view class="my_container">
    <view class="avatar_box">
      <image :src="userInfo.avatar" class="avatar_img"></image>
      <text class="username">{{userInfo.userProfile}}</text>
    </view>
    <view class="userinfo_box">
      <block v-for="item in myMessage" :index="item.id" :key="item.id">
        <view class="grid-item-box">
          <text class="text_top">{{item.num}}</text>
          <text class="text_bottom">{{item.name}}</text>
        </view>
      </block>
    </view>
    <view class="order_box">
      <view class="order_box_top">
        我的订单
      </view>
      <view class="order_box_bottom">
        <block v-for="item in orderMessage" :key="item.id">
          <view class="order">
            <image :src="item.img" class="order_img"></image>
            <text class="order_text">{{item.text}}</text>
          </view>
        </block>
      </view>
    </view>
    <view class="other_box">
      <uni-list>
        <uni-list-item showArrow title="收货地址" class="list_item" />
        <uni-list-item showArrow title="联系客服" class="list_item" />
        <uni-list-item showArrow title="退出登录" class="list_item" clickable @click="logout" />
      </uni-list>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import {
    myMessage,
    orderMessage
  } from '../../contant/my_message.js'
  export default {
    name: "my-userinfo",
    data() {
      return {
        myMessage: myMessage,
        orderMessage: orderMessage
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
      logout() {
        uni.showModal({
          title: '提示',
          content: '确认退出登录吗？',
          success: (res)=> {
            if (res.confirm) {
              this.updateUserInfo({})
              this.updateToken('')
              this.updateAddress({})
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        })
      }
    },

    computed: {
      ...mapState('m_user', ['userInfo'])
    },
  }
</script>

<style lang="scss">
  .my_container {
    height: 110%;
    background-color: #f4f4f4;

    .avatar_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 330rpx;
      padding-top: 80rpx;
      text-align: center;
      background-color: #c00000;

      .avatar_img {
        display: block;
        width: 180rpx;
        height: 180rpx;
        border-radius: 50%;
        border: 2px solid #fff;
      }

      .username {
        display: block;
        padding-top: 25rpx;
        color: white;
        font-weight: 700;
      }
    }

    .userinfo_box {
      display: flex;
      position: absolute;
      top: 390rpx;
      left: 25rpx;
      width: 95%;
      height: 100rpx;
      text-align: center;
      background-color: #fff;
      border-radius: 10rpx;

      .grid-item-box {
        width: 180rpx;
        height: 50rpx;
        font-size: 24rpx;
        background-color: #fff;

        .text_top {
          display: block;
          padding-top: 18rpx;
          padding-bottom: 10rpx;
        }

        .text_bottom {
          display: block;
        }
      }
    }

    .order_box {
      width: 95%;
      margin-top: 100rpx;
      margin-left: 25rpx;
      background-color: #fff;
      border-radius: 10rpx;

      .order_box_top {
        height: 80rpx;
        line-height: 80rpx;
        text-indent: 20rpx;
        padding-bottom: 10rpx;
        border-bottom: 1px solid #f4f4f4;
      }

      .order_box_bottom {
        display: flex;
        justify-content: space-around;
        height: 130rpx;
        padding-top: 10rpx;
        text-align: center;

        .order {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 110rpx;

          .order_img {
            width: 80rpx;
            height: 80rpx;
          }

          .order_text {
            font-size: 26rpx;
          }
        }
      }
    }

    .other_box {
      width: 95%;
      margin-left: 25rpx;
      margin-top: 25rpx;
      border-radius: 10rpx;

      .list_item {
        height: 90rpx;
      }
    }
  }
</style>