<template>
  <div class="price-tab" :class="{ 'selected': pricing.selected }">
    <i class="fas section-icon" :class="pricing.icon" />
    <h4>{{ pricing.title }}</h4>
    <p v-for="(text, index) in pricing.text" :key="index">
      {{ text }}
    </p>.
    <div class="price-tab-footer">
      <p class="price">
        <span v-if="pricing.from">From</span> £{{ pricing.price }}/{{ pricing.timing }}
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
import mailFuns from '../../lib/mail.js'

export default {
  props: [
    'pricing'
  ],
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  },
  methods: {
    headingStr() {
      let str = this.quote ? 'Request Quote for ' : 'Request More Info on '
      str = str + this.pricing.title
      return str
    },
    showMoreInfo() {
      if (this.mobile) {
        window.scrollTo(0, 0)
      }
      const pricing = this.pricing
      pricing.quote = false
      this.showModal(pricing)
    },
    showQuote() {
      if (this.mobile) {
        window.scrollTo(0, 0)
      }
      const pricing = this.pricing
      pricing.quote = true
      this.showModal(pricing)
    },
    showModal(pricing) {
      this.$store.dispatch('setSelectedPricing', pricing)
      this.$store.dispatch('showModal', 'pricing')
    },
    hide() {
      this.$store.dispatch('hideModal', 'pricing')
    }
  }
}
</script>

<style lang="scss">
  .price-tab {
    display: table-cell;
    width: 25%;
    padding:0 24px 96px 24px;
    position: relative;
    border-radius: 12px;

    p {
      font-weight: 500;
      color: #000;
    }

    &.selected {
      border: 4px solid #f4511e;

      p {
        font-weight: 600;
      }
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

    button a {
      color: #fff;
    }

    .price-tab-footer {
      position: absolute;
      bottom: 0;
      left: 0 !important;
      height: 96px;
      width: 100%;
    }
  }

  .quote {
    .fa-times {
      margin: 0 6px;
    }

    h4 {
      letter-spacing: initial;
      text-align: center;
      font-size: xx-large;
    }

    #game-select {
      margin-bottom: 12px;
    }

    p {
      margin-bottom: 12px;
      line-height: 1.5;
      color: #444;
      font-weight: initial;
    }

    .quote-form {
      width: 80%;
      margin: 0 auto;
    }

    button {
      margin-top: 12px;
    }
  }

@media screen and (max-width: 768px) {
  .price-tab {
    display: block;
    width: 100%;
    margin-bottom: 56px;
  }

  .quote-mobile {
    position: fixed;
    top: 40px;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 100%;
    z-index: 10;
    padding: 4px;

    p {
      font-weight: 500 !important;
    }

    input, button {
      margin: 4px 0;
    }
  }
}

</style>
