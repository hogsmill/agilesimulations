<template>
  <div id="pricing" class="container-fluid text-center">
    <div class="row slideanim">
      <h2>We offer the <a href="/games.html">games</a> in these packages...</h2>
      <div class="pricing-table">
        <Panel :scope="'facilitation'" />
        <Panel :scope="'dedicated'" />
        <Panel :scope="'using'" />
      </div>
    </div>
    <p class="contact">
      Do
      <a href="#contact">
        Contact Us
      </a>
      if you have other requirements
    </p>
  </div>
</template>

<script>
import Panel from './Pricing/Panel.vue'

export default {
  components: {
    Panel
  }
}
</script>

<style lang="scss">
  .pricing-table {
    width: 100%;
    display: table;
  }

  #pricing {
    p, li {
      text-align: center;
      margin: 12px 0;
    }
  }

@media screen and (max-width: 768px) {
  .pricing-table {
    width: 100%;
    display: block;
  }
}

</style>
