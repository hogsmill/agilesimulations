<template>
  <div class="price-tab" :class="{ 'selected': pricing.selected }">
    <i class="fas section-icon" :class="pricing.icon" />
    <h4>{{ pricing.title }}</h4>
    <p v-for="(text, index) in pricing.text" :key="index">
      {{ text }}
    </p>
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

    <modal :name="'quote-' + pricing.id" :height="560" :classes="['rounded', 'quote']">
      <div class="float-right mr-2 mt-1">
        <button type="button" class="close" @click="hide" aria-label="Close">
          <i class="fas fa-times" />
        </button>
      </div>
      <div class="mt-4 quote-form">
        <h4>{{ headingStr() }}</h4>
        <p>
          Thanks for your interest Agile Simulations; please let us know any further
          information on your requirements in the comments box below.
        </p>
        <div v-if="pricing.title == 'Facilitation'">
          I am interested in facilitation of
          <select id="game-select">
            <option>-- Select --</option>
            <option>No Estimates</option>
            <option>Pipeline Game</option>
            <option>Coin Game</option>
            <option>Kanban Playground</option>
            <option>Agile Battleships</option>
            <option>Simulations</option>
            <option>All Games</option>
          </select>
        </div>
        <div>
          <input type="text" :id="'name-' + pricing.id" class="form-control" placeholder="Name">
          <br>
          <input type="text" :id="'email-' + pricing.id" class="form-control" placeholder="Email">
          <br>
          <input type="text" :id="'company-' + pricing.id" class="form-control" placeholder="Company (Optional)">
          <br>
          <input type="text" :id="'mobile-' + pricing.id" class="form-control" placeholder="Mobile (optional)">
          <br>
          <textarea :id="'comments-' + pricing.id" rows="3" class="form-control" placeholder="Other information" />
          <button class="btn btn-primary" @click="send()">
            Send
          </button>
        </div>
      </div>
    </modal>

    <div :name="'quote-mobile-' + pricing.id" class="quote-mobile" v-if="mobileQuote">
      <div class="float-right mr-2 mt-1">
        <button type="button" class="close" @click="hide" aria-label="Close">
          <i class="fas fa-times" />
        </button>
      </div>
      <div class="mt-4 quote-form">
        <h4>{{ headingStr() }}</h4>
        <p>
          Thanks for your interest; please let us know any further
          information on your requirements in the comments box below.
        </p>
        <div v-if="pricing.title == 'Facilitation'">
          I am interested in facilitation of
          <select id="game-select">
            <option>-- Select --</option>
            <option>No Estimates</option>
            <option>Pipeline Game</option>
            <option>Coin Game</option>
            <option>Kanban Playground</option>
            <option>Agile Battleships</option>
            <option>Simulations</option>
            <option>All Games</option>
          </select>
        </div>
        <div>
          <input type="text" :id="'name-' + pricing.id" class="form-control" placeholder="Name">
          <input type="text" :id="'email-' + pricing.id" class="form-control" placeholder="Email">
          <input type="text" :id="'company-' + pricing.id" class="form-control" placeholder="Company (Optional)">
          <input type="text" :id="'mobile-' + pricing.id" class="form-control" placeholder="Mobile (optional)">
          <textarea :id="'comments-' + pricing.id" rows="3" class="form-control" placeholder="Other information" />
          <button class="btn btn-primary" @click="send()">
            Send
          </button>
        </div>
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
  data() {
    return {
      quote: true,
      mobileQuote: false
    }
  },
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
    showMoreInfo(modal) {
      this.quote = false
      if (this.mobile) {
        this.mobileQuote = !this.mobileQuote
        window.scrollTo(0, 0)
      } else {
      this.$modal.show('quote-' + this.pricing.id)
      }
    },
    hide() {
      if (this.mobile) {
        this.mobileQuote = false
      } else {
        this.$modal.hide('quote-' + this.pricing.id)
      }
    },
    showQuote() {
      this.quote = false
      if (this.mobile) {
        this.mobileQuote = !this.mobileQuote
        window.scrollTo(0, 0)
      } else {
      this.$modal.show('quote-' + this.pricing.id)
      }
    },
    send() {
      const success = mailFuns.post({
        action: 'Request from Agile Simulations (' + this.pricing.title + ')',
        type: this.quote ? 'Quote' : 'More Info',
        game: this.pricing.title == 'Facilitation' ? document.getElementById('game-select').value : '',
        name: encodeURIComponent(document.getElementById('name-' + this.pricing.id).value),
        company: encodeURIComponent(document.getElementById('company-' + this.pricing.id).value),
        email: encodeURIComponent(document.getElementById('email-' + this.pricing.id).value),
        mobile: encodeURIComponent(document.getElementById('mobile-' + this.pricing.id).value),
        comments: encodeURIComponent(document.getElementById('comments-' + this.pricing.id).value)
        },
        'Thanks for your request - we\'ll get back to you soon!'
      )
      if (success) {
        this.hide()
      }
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
      height: 96px;
      width: 84%;
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
