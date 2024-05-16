<template>
    <my-search></my-search>
  <view class="scroll_view">
    <scroll-view class="left_scroll_box" scroll-y="true" :style="{height:wh+'px'}">
      <block v-for="(item,i) in cateList" :key="i">
        <view :class="['left_scroll_item',i===active?'active':'' ]" @click="activeChanged(i)">{{item.cat_name}}</view>
      </block>
    </scroll-view>
    <scroll-view class="right_scroll_box" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
      <block v-for="(item2,i2) in cateLevel2" :key="i2">
        <view class="right_title">/ {{item2.cat_name}} /</view>
        <view class="right_content">
          <view class="right_item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
            <image :src="item3.cat_icon" mode="widthFix" class="right_img"></image>
            <view class="item_title">{{item3.cat_name}}</view>
          </view>
        </view>
      </block>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        active: 0,
        cateLevel2: [],
         scrollTop: 0
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getWindowInfo()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const res = await uni.$http.get('/api/public/v1/categories')
        if (res.statusCode !== 200) showMsg()
        this.cateList = res.data.message
        this.cateLevel2 = res.data.message[0].children
      },
      activeChanged(i) {
        this.active = i
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      gotoGoodsList(item3){
         uni.navigateTo({
            url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
          })
      }
    }
  }
</script>

<style lang="scss">
  .scroll_view {
    display: flex;

    .left_scroll_box {
      width: 25%;
      background-color: #f7f7f7;

      .left_scroll_item {
        height: 110rpx;
        font-size: 28rpx;
        line-height: 110rpx;
        text-align: center;

        // 当你在 Sass 中嵌套规则时，& 允许你引用父选择器，而不是重复写它
        &.active {
          position: relative;
          background-color: #fff;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .right_scroll_box {
      .right_title {
        width: 100%;
        height: 110rpx;
        line-height: 110rpx;
        font-size: 24rpx;
        font-weight: 700;
        text-align: center;
      }

      .right_content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .right_item {
          padding-left: 60rpx;
          .item_title{
            font-size: 24rpx;
            text-align: center;
          }
          .right_img {
            width: 130rpx;
          }
        }
      }
    }
  }
</style>