<template>
  <div class="footer">
    <h4>
      All the legal stuff, etc...
    </h4>
    <div class="row">
      <div class="col-sm-4">
        <a @click="setTab('tandcs')">T&Cs and Privacy</a>
      </div>
      <div class="col-sm-4">
        <a @click="setTab('security')">Security</a>
      </div>
      <div class="col-sm-4">
        <a @click="contact()">Contact</a>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    contact() {
      bus.$emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .footer {
    padding: 30px;
    background-color: #f4511e;

    h4 {
      text-align: center;
      color: #fff;
    }

    .col-sm-4 {
      text-align: center;

      a {
        margin: 0 auto;
        color: #fff;
      }
    }
  }
</style>
