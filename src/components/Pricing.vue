<template>
  <div class="pricing container-fluid text-center">
    <div class="row slideanim">
      <h2>We offer the <a @click="setTab('games')">games</a> in these packages...</h2>
      <div class="pricing-table" v-if="!mobile">
        <Panel :scope="'facilitation'" />
        <Panel :scope="'dedicated'" />
        <Panel :scope="'regularUse'" />
        <Panel :scope="'using'" />
      </div>
      <div class="pricing-table" v-if="mobile">
        <Panel :scope="'regularUse'" />
        <Panel :scope="'using'" />
        <Panel :scope="'dedicated'" />
        <Panel :scope="'facilitation'" />
      </div>
    </div>
    <p class="contact">
      Do
      <a @click="contact()">
        Contact Us
      </a>
      if you have other requirements
    </p>
  </div>
</template>

<script>
import bus from '../socket.js'

import Panel from './pricing/Panel.vue'

export default {
  components: {
    Panel
  },
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  },
  methods: {
    contact() {
      bus.$emit('contact', {})
    },
    setTab(tab) {
      if (this.mobile) {
        this.toggleMenu()
      }
      this.$store.dispatch('updateTab', tab)
    },
  }
}
</script>

<style lang="scss">
  .pricing {
    p, li {
      text-align: center;
      margin: 12px 0;
    }

    .pricing-table {
      width: 100%;
      display: table;
    }
  }

@media screen and (max-width: 768px) {
  .pricing-table {
    width: 100%;
    display: block;
  }
}

</style>
