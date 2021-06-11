<template>
  <nav class="nav">
    <div v-if="mobile" class="hamburger">
      <i class="fas fa-hamburger" @click="toggleMenu()" />
    </div>
    <div class="nav-bar">
      <ul :class="{ 'hide': mobile && hideMenu }">
        <li :class="{'active': tab == 'main'}" @click="setTab('main')">
          HOME
        </li>
        <li :class="{'active': tab == 'pricing'}" @click="setTab('pricing')">
          PRICING
        </li>
        <li :class="{'active': tab == 'resources'}" @click="setTab('resources')">
          RESOURCES
        </li>
        <li :class="{'active': tab == 'labs'}" @click="setTab('labs')">
          LABS
        </li>
        <li :class="{'active': tab == 'diary'}" @click="setTab('diary')">
          DIARY
        </li>
        <li :class="{'active': tab == 'contact'}" @click="show()">
          CONTACT
        </li>
        <li v-if="mobile" :class="{'active': tab == 'tandcs'}" @click="setTab('tandcs')">
          Ts AND Cs
        </li>
        <li v-if="mobile" :class="{'active': tab == 'security'}" @click="setTab('security')">
          SECURITY
        </li>
        <!--
        <li :class="{'active': tab == 'signin'}">
          SIGN UP OR LOGIN
        </li>
        -->
      </ul>
    </div>

    <modal name="feedback" :height="420" :classes="['rounded', 'feedback']">
      <div class="float-right mr-2 mt-1">
        <button type="button" class="close" @click="hide" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="mt-4">
        <h4>Contact Us</h4>
        <p class="feedback-form">
          Thanks for visiting Agile Simulations; please let us know what you would like
          to know, or tell us, in the comments box below
        </p>
        <div class="feedback-form">
          <input type="text" id="email" class="form-control" placeholder="Email (optional)">
          <br>
          <textarea id="comments" rows="6" class="form-control" placeholder="Your comments" />
          <br>
          <button class="btn btn-primary" @click="sendContact()">
            Send
          </button>
        </div>
      </div>
    </modal>

    <div id="feedback-mobile" class="feedback-mobile" v-if="mobileContact">
      <div class="float-right mr-2 mt-1">
        <button type="button" class="close" @click="hide" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="mt-4">
        <p class="feedback-form">
          Thanks for visiting Agile Simulations; please let us know what you would like
          to know, or tell us, in the comments box below
        </p>
        <div class="feedback-form">
          <input type="text" id="email" class="form-control" placeholder="Email (optional)">
          <br>
          <textarea id="comments" rows="6" class="form-control" placeholder="Your comments" />
          <br>
          <button class="btn btn-primary smaller-font" @click="sendContact()">
            Send
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import bus from '../socket.js'

import mailFuns from '../lib/mail.js'

export default {
  data() {
    return {
      mobileContact: false,
      hideMenu: true
    }
  },
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    },
    tab() {
      return this.$store.getters.getTab
    }
  },
  created() {
    const self = this
    bus.$on('showContact', () => {
      self.show()
    })
  },
  methods: {
    toggleMenu() {
      this.hideMenu = !this.hideMenu
      this.hide()
    },
    show() {
      if (this.mobile) {
        this.mobileContact = !this.mobileContact
        window.scrollTo(0, 0)
      } else {
        this.$modal.show('feedback')
      }
    },
    hide() {
      if (this.mobile) {
        this.mobileContact = false
      } else {
        this.$modal.hide('feedback')
      }
    },
    setTab(tab) {
      if (this.mobile) {
        this.toggleMenu()
      }
      this.$store.dispatch('updateTab', tab)
    },
    sendContact() {
      mailFuns.post({
        action: 'Contact from Agile Simulations',
        email: encodeURIComponent(document.getElementById('email').value),
        comments: encodeURIComponent(document.getElementById('comments').value)
        },
        'Thanks for your interest - we\'ll get back to you soon!'
      )
      this.hide()
    }
  },
}
</script>

<style lang="scss">
  .nav {
    background-color: #f4511e;
    padding: 0 12px;
    position: fixed;
    width: 100%;
    z-index: 10;

    .nav-bar {
      border: 0;
      font-size: 12px !important;
      line-height: 1.42857143 !important;
      letter-spacing: 4px;
      border-radius: 0;
      font-family: Montserrat, sans-serif;

      ul {
        float: right;
        margin-bottom: 0;

        &.hide {
          height: 0;
        }

        li {
          display: inline-block;
          list-style-type: none;
          padding: 15px;
          color: #fff !important;

          &:hover {
            opacity: 0.9;
          }
          &:hover, &.active  {
            color: #f4511e !important;
            background-color: #fff !important;
          }
        }
      }
    }
  }

  .feedback {
    h4 {
      letter-spacing: initial;
      text-align: center;
      font-size: xx-large;
    }

    .feedback {
      letter-spacing: 0;
      color: #212529;
    }

    p.feedback-form {
      margin-bottom: 12px;
    }

    .feedback-form {
      width: 80%;
      margin: 0 auto;
    }
  }

  .feedback-mobile {
    p {
      color: #fff;
    }
  }

@media screen and (max-width: 767px) {
  nav {

    .hamburger {
      height: 42px;

      .fa-hamburger {
        color: #fff;
        font-size: 32px;
        margin: 4px 0 0 0;
        float: right;
      }
    }

    .nav-bar {

      &.hide {
        display: none;
      }

      ul {
        padding: 0;

        li {
          width: 100%;
        }
      }
    }
  }
}
</style>
