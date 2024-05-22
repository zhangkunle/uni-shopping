<template>
  <view class="settle_box">
    <label class="radio_box">
      <radio value="r1" :checked="isFullCheck" color="#c00000" class="radio_icon" @click="handleChoose" />
      <text>全选</text>
    </label>
    <view class="settle_text">
      合计：<text class="settle_price">￥{{toSumPrice}}</text>
    </view>
    <view class="settle_btn" @click="toSettle">
      结算({{settleNum}})
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex';
  import showMsg from '../../contant/showMsg.js'
  import {$http} from '@escook/request-miniprogram'
  uni.$http = $http
  $http.baseUrl = 'https://api-hmugo-web.itheima.net'
  export default {
    name: "my-settlement",
    data() {
      return {
        seconds: 3,
        timer: null
      }
    },
    computed: {
      ...mapState('m_cart', ['checkAll','cart']),
      ...mapState('m_user', ['token']),
      ...mapGetters('m_user', ['addstr']),
      ...mapGetters('m_cart', ['settleNum', 'toSumPrice', 'totals']),
      isFullCheck() {
        return this.totals === this.settleNum
      }
    },
    methods: {
        ...mapMutations('m_user', ['updateRedirectInfo']),
      handleChoose() {
        this.$emit('choose-all', {
          checkAll: !this.isFullCheck
        })
      },
      showTips(n) {
        uni.showToast({
          // 不展示任何图标
          icon: 'none',
          // 提示的消息
          title: '请先登录！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      },
      delay() {
        this.seconds = 3
        this.showTips(this.seconds)
        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success:()=> {
               this.updateRedirectInfo({
                 openType:'switchTab',
                 from:'/pages/cart/cart'
               })
              }
            })
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      },
      toSettle() {
        if (!this.settleNum) return showMsg('请选择要结算的商品！')
        if (!this.addstr) return showMsg('请选择收货地址！')
        if (!this.token) this.delay()
        this.payOrder()
      },
      async payOrder(){
        const orderInfo = {
            // 开发期间，注释掉真实的订单价格，
            // order_price: this.checkedGoodsAmount,
            // 写死订单总价为 1 分钱
            order_price: 0.01,
            consignee_addr: this.addstr,
            goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
          }
          const res=await $http.post('/api/public/v1/my/orders/create',orderInfo)
          if (res.data.meta.status !== 200) return showMsg('创建订单失败！')
           const orderNumber = res.data.message.order_number
          //预支付
          const res_prepay=await $http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
          if (res_prepay.data.meta.status !== 200) return showMsg(res_prepay.data.msg)
          const payInfo = res_prepay.data.message.pay
          //发起微信支付
          uni.requestPayment({
            provider: 'wxpay',
           	timeStamp: payInfo.timeStamp,
           	nonceStr: payInfo.nonceStr,
           	package: payInfo.package,
           	signType: payInfo.signType,
           	paySign:payInfo.paySign,
          	success: function (res) {
          		console.log('success:' + JSON.stringify(res));
          	},
          	fail: function (err) {
          		console.log('fail:' + JSON.stringify(err));
          	}
          });
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