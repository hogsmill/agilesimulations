<template>
  <div class="no-estimates-mobile">
    <h2>
      No Estimates Mobile
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
    methods: {
      contact() {
        bus.$emit('contact', {})
      }
    }
  }
  </script>

<style lang="scss">
  .no-estimates-mobile {
    padding: 0 36px;

    h2 {
      text-align: center;
    }

    .pic {
      margin: 0 24px 24px 24px;
      background-image: url("../../assets/img/screenshots/no-estimates-mobile.jpg");
      background-size: contain;
      background-repeat: no-repeat;
      height: 400px;
    }
  }
</style>
