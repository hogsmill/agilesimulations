<template>
  <div class="monte-carlo">
    <h2>
      Monte Carlo Simulations
    </h2>
    <div>
      <div v-if="!mobile" class="pic" />
      <p>
        TBD
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  },
  created() {
    window.scrollTo(0, 0)
  },
  methods: {
    contact() {
      bus.emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .monte-carlo {
    padding: 0 36px;
    max-width: 956px;
    margin: 0 auto;

    /* TEMP */
    min-height: 380px;

    h2 {
      text-align: center;
    }

    .pic {
      float: right;
      background-image: url("../../assets/img/screenshots/monte-carlo.jpg");
      background-size: contain;
      background-repeat: no-repeat;
      height: 282px;
      width: 460px;
      margin: 0 0 24px 24px;
    }
  }
</style>
