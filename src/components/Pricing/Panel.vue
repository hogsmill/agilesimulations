<template>
  <div class="price-tab" :class="{ 'selected': pricing[scope].selected }">
    <i class="fas section-icon" :class="pricing[scope].icon" />
    <h4>{{ pricing[scope].title }}</h4>
    <p v-for="(text, index) in pricing[scope].text" :key="index">
      {{ text }}
    </p>
    <div class="price-tab-footer">
      <p class="price">
        <span v-if="pricing[scope].from">From</span> £{{ pricing[scope].price }}/{{ pricing[scope].timing }}
      </p>
      <div>
        <button class="btn btn-info" @click="showMoreInfo()">
          More Info
        </button>
        <button class="btn btn-primary" @click="showQuote()">
          Get Quote
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'scope'
  ],
  computed: {
    pricing() {
      return this.$store.getters.getPricing
    }
  },
  methods: {
    showMoreInfo() {
      this.$modal.show('moreInfo')
    },
    hideMoreInfo() {
      this.$modal.hide('moreInfo')
    },
    showQuote() {
      this.$modal.show('quote')
    },
    hideQuote() {
      this.$modal.hide('quote')
    }
  }
}
</script>

<style lang="scss">
  .price-tab {
    display: table-cell;
    width: 33%;
    padding:0 24px 96px 24px;
    position: relative;
    border-radius: 12px;

    p {
      font-weight: 500;
      color: #000;
    }

    &.selected {
      border: 4px solid #f4511e;
    }

    .section-icon {
      font-size: 50px;
      color: #f4511e;
      margin: 10px auto;
    }

    .price {
      font-weight: bold;
      color: #444;
    }

    .price-tab {
      button a {
        color: #fff;
      }
    }

    .price-tab-footer {
      position: absolute;
      bottom: 0;
      height: 96px;
      width: 84%;
    }
  }

@media screen and (max-width: 768px) {
  .price-tab {
    display: block;
    width: 100%;
    margin-bottom: 56px;
  }
}

</style>
