<template>
  <vue-final-modal name="pricing" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['pricing']">
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
        <input type="text" id="name-pricing" class="form-control" placeholder="Name">
        <br>
        <input type="text" id="email-pricing" class="form-control" placeholder="Email">
        <br>
        <input type="text" id="company-pricing" class="form-control" placeholder="Company (Optional)">
        <br>
        <input type="text" id="mobile-pricing" class="form-control" placeholder="Mobile (optional)">
        <br>
        <textarea id="comments-pricing" rows="3" class="form-control" placeholder="Other information" />
        <button class="btn btn-primary" @click="send()">
          Send
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

import mailFuns from '../../lib/mail.js'

export default {
  components: {
    VueFinalModal
  },
  data() {
    return {
      mobileQuote: false
    }
  },
  computed: {
    modals() {
      return this.$store.getters.getModals
    },
    pricing() {
      return this.$store.getters.getSelectedPricing
    }
  },
  methods: {
    headingStr() {
      let str = this.pricing.quote ? 'Request Quote for ' : 'Request More Info on '
      str = str + this.pricing.title
      return str
    },
    hide() {
      this.$store.dispatch('hideModal', 'pricing')
    },
    send() {
      let action = this.pricing.quote ? 'Quote' : 'More Info'
      action = action + ' request from Agile Simulations (' + this.pricing.title + ')'
      const success = mailFuns.post({
        action: action,
        game: this.pricing.title == 'Facilitation' ? document.getElementById('game-select').value : '',
        name: encodeURIComponent(document.getElementById('name-pricing').value),
        company: encodeURIComponent(document.getElementById('company-pricing').value),
        email: encodeURIComponent(document.getElementById('email-pricing').value),
        mobile: encodeURIComponent(document.getElementById('mobile-pricing').value),
        comments: encodeURIComponent(document.getElementById('comments-pricing').value)
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
