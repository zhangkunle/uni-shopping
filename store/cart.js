export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('goods') || '[]'),
    checkAll: uni.getStorageSync('check') || false
  }),
  mutations: {
    toAddCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveGoods')
    },
    saveGoods(state) {
      uni.setStorageSync('goods', JSON.stringify(state.cart))
    },
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveGoods')
      }
    },
    updateGoodsCount(state, good) {
      const findResult = state.cart.find((x) => x.goods_id === good.goods_id)
      if (findResult) {
        findResult.goods_count = good.goods_count
        this.commit('m_cart/saveGoods')
      }
    },
    saveCheckAll(state) {
      uni.setStorageSync('check', state.checkAll)
    },
    updateCheckAll(state, check) {
      state.checkAll = check.checkAll
      this.commit('m_cart/saveCheckAll')
    },
    removeGoodsById(state, id) {
      state.cart = state.cart.filter((x) => {
        return x.goods_id !== id
      })
      this.commit('m_cart/saveGoods')
    }
  },
  getters: {
    totals(state) {
      let total = 0;
      state.cart.forEach((item) => {
        total += item.goods_count
      })
      return total;
    },
    settleNum(state) {
      let sum = 0;
      state.cart.forEach((item) => {
        if (item.goods_state) {
          sum += item.goods_count
        }
      })
      return sum;
    },
    toSumPrice(state) {
      let price = 0;
      state.cart.forEach((good) => {
        if (good.goods_state) {
          price = price + good.goods_count * good.goods_price
        }
      })
      return Number(price).toFixed(2);
    }
    // checkCount(state) {
    //   return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    // }
  }
}