<template>
  <view>
    <view class="avatar_box">
      <image src="../../static/uni.png" mode="aspectFit"></image>
      <text>名字</text>
    </view>
    <view class="userinfo_box">
      <uni-grid :column="4" :highlight="true" @change="change">
      				<uni-grid-item v-for="(item, index) in 4" :index="index" :key="index">
      					<view class="grid-item-box" style="background-color: #fff;">
      						<uni-icons type="image" :size="30" color="#777" />
      						<text class="text">文本信息</text>
      					</view>
      				</uni-grid-item>
      			</uni-grid>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-userinfo",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  
.avatar_box{
  height: 40%;
  background-color: #c00000;
}
  
.userinfo_box{
    height: 60%;
}
</style>