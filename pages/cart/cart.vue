<template>
  <my-address></my-address>
  <view class="cart-container" v-if="cart.length !== 0">
    <view class="cart_header">
      <uni-icons type="shop" size="18" class="cart_icon"></uni-icons>&nbsp;
      <text class="cart_text">购物车</text>
    </view>
    <uni-swipe-action>
      <view v-for="(good,i) in cart" :key="i">
        <uni-swipe-action-item :show="showswipe" :right-options='options' @click="deleteGoods(good.goods_id)"
          @change="swipeChange">
          <my-goods :goods="good" :showRadioNumber="true" @radio-change="handleRadioChange"
            @get-count="handleNumberBox"></my-goods>
        </uni-swipe-action-item>
      </view>
    </uni-swipe-action>
    <my-settlement @choose-all="handleChoose"></my-settlement>
  </view>
  <view class="cart_empty" v-else>
    <image src="../../static/cart_empty@2x.png" mode="widthFix" class="empty_img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex';
  import badgeMinix from '../../mixins/tabbar_badge.js';
  export default {
    mixins: [badgeMinix],
    computed: {
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart', ['totals'])
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }],
        showswipe: 'none'
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateCheckAll', 'updateGoodsCount', 'removeGoodsById']),
      handleRadioChange(value) {
        this.updateGoodsState(value)
      },
      handleChoose(e) {
        this.cart.forEach((item) => {
          item.goods_state = e.checkAll
        })
        this.updateCheckAll(e)
      },
      handleNumberBox(goods) {
        this.updateGoodsCount(goods)
      },
      deleteGoods(id) {
        this.removeGoodsById(id)
      },
      swipeChange() {
        this.showswipe = 'none'
      }
    },
    watch: {
      totals: {
        handler(val) {
          this.setBandge()
        },
        immediate: true
      }
    },
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;

    .cart_header {
      height: 80rpx;
      border-bottom: 1px solid #f7f7f7;

      .cart_icon {
        line-height: 80rpx;
        margin-left: 20rpx;
      }

      .cart_text {
        vertical-align: middle;
        font-size: 28rpx;
      }
    }
  }

  .cart_empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 300rpx;

    .empty_img {
      width: 200rpx;
      height: 200rpx;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>