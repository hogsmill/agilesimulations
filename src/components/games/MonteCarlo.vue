<template>
  <div class="monte-carlo">
    <h2>
      Monte Carlo Simulations
    </h2>
    <div class="row">
      <div class="col-sm-4">
        <p>
          TBD
        </p>
      </div>
      <div class="col-sm-8">
        <div class="pic" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  created() {
    window.scrollTo(0, 0)
  },
  methods: {
    contact() {
      bus.$emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .monte-carlo {
    padding: 0 36px;

    h2 {
      text-align: center;
    }

    .pic {
      margin: 0 24px 24px 24px;
      background-image: url("../../assets/img/screenshots/monte-carlo.jpg");
      background-size: contain;
      background-repeat: no-repeat;
      height: 400px;
    }
  }
</style>
