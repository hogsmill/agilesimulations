<template>
  <div class="pricing container-fluid text-center">
    <div class="row slideanim">
      <h2>We offer the <a @click="setTab('games')">games</a> in these packages...</h2>
      <div class="pricing-table" v-if="!mobile">
        <Panel v-for="(pricing, index) in pricings" :key="index" :pricing="pricing" />
      </div>
      <div class="pricing-table" v-if="mobile">
        <div v-for="(pricing, sindex) in pricings" :key="'s=' + sindex">
          <Panel v-if="pricing.selected" :pricing="pricing" />
        </div>
        <div v-for="(pricing, nindex) in pricings" :key="'n-' + nindex">
          <Panel v-if="!pricing.selected" :pricing="pricing" />
        </div>
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
    },
    pricings() {
      return this.$store.getters.getPricings
    }
  },
  created() {
    bus.emit('sendLoadPricings')

    bus.on('loadPricings', (data) => {
      this.$store.dispatch('updatePricings', data)
    })
  },
  methods: {
    contact() {
      bus.emit('contact', {})
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
