import {
  mapGetters
} from 'vuex';
export default {
  computed: {
    ...mapGetters('m_cart', ['totals'])
  },
  onShow() {
    this.setBandge()
  },
  methods: {
    setBandge() {
      if (this.totals > 0) {
        uni.setTabBarBadge({
          index: 2,
          text: this.totals + ''
        })
      }
    }
  }
}