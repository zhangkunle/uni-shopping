<template>
  <view class="login_box">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button class="login_btn">一键登录</button>
    <text class="login_tip">登录后尽享更多权益</text>
  </view>
</template>

<script>
  export default {
    name: "my-login",
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .login_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150rpx;

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