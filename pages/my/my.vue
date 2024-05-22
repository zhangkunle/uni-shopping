<template>
  <my-userinfo v-if="token"></my-userinfo>
  <my-login v-else></my-login>

</template>

<script>
  import {
    mapState
  } from 'vuex';
  import badgeMinix from '../../mixins/tabbar_badge.js';
  export default {
    mixins: [badgeMinix],
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    }
  }
</script>

<style lang="scss">

</style>