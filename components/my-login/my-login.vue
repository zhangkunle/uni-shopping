<template>
  <view class="login_box">
    <!-- <form @submit="getSubmit"> -->
    <button class="login_avatar_btn" open-type="chooseAvatar" @chooseavatar="oChooseAvatar">
      <image :src='userInfo.avatar' class="login_img"></image>
    </button>
    <view class="nameContent">
      <view class="title">昵称</view>
      <input name="nickName" type="nickname" placeholder="请填写昵称" v-model="nickname" class="weui-input" />
    </view>
    <!-- form-type="submit" -->
    <button class="login_btn" @click="getSubmit">一键登录</button>
    <!-- </form> -->
    <text class="login_tip">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex';
  import {
    $http
  } from '@escook/request-miniprogram'
  uni.$http = $http
  $http.baseUrl = 'https://api-hmugo-web.itheima.net'
  import showMsg from '../../contant/showMsg.js'
  export default {
    name: "my-login",
    data() {
      return {
        nickname: '',
        userInfo: {
          avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
          userProfile: ''
        }
      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      // getUserProfile() {
      //   uni.getUserProfile({
      //     desc: '授权获取',
      //     success: (res) => {
      //       this.getToken(res)
      //       this.updateUserInfo(res.userInfo)
      //     },
      //     fail: (error) => {
      //       console.log(error);
      //     }
      //   });
      // },
      // getToken() {
      // uni.login({
      //   provider: 'weixin',
      //   success: async function(res) {
      //     if (res.errMsg && res.errMsg === "login:ok") {
      // this.updateToken( 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
      // const query = {
      //   code: res.code,
      //   encryptedData: info.encryptedData,
      //   rawData: info.rawData,
      //   iv: info.iv,
      //   signature: info.signature
      // }
      // const res_data = await $http.post('/api/public/v1/users/wxlogin', query)
      // console.log(res_data)
      // if (res_data.data.meta.status !== 400) return showMsg('登录失败！')
      // showMsg('登录成功')
      // },
      getSubmit() {
        this.userInfo.userProfile = this.nickname
        this.updateToken(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        )
        this.navigateBack()
        this.updateUserInfo(this.userInfo)
      },
      oChooseAvatar(e) {
        this.userInfo.avatar = e.detail.avatarUrl
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150rpx;

    .login_avatar_btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;

      .login_img {
        display: block;
        width: 200rpx;
        height: 200rpx;
        border-radius: 250%;
      }
    }

    .login_avatar_btn::after {
      border: none;
    }

    .nameContent {
      display: flex;
      margin: 30rpx 0;
      border-top: 1px solid #eee;
      border-bottom: 2rpx solid #eee;
      padding: 20rpx 40rpx;
      width: 100vw;
      box-sizing: border-box;
      font-size: 28rpx;
      align-items: center;

      .title {
        margin-right: 40rpx;
      }
    }

    .login_btn {
      width: 90%;
      height: 90rpx;
      line-height: 90rpx;
      margin-top: 25rpx;
      font-size: 36rpx;
      border-radius: 50px;
      text-align: center;
      color: white;
      background-color: #c00000;
    }

    .login_tip {
      margin-top: 25rpx;
      font-size: 23rpx;
      color: gray;
    }
  }
</style>