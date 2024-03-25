<template>
  <vue-final-modal name="feedback" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['login']">
    <div class="float-right mr-2 mt-1">
      <button type="button" class="close" @click="hide('login')" aria-label="Close">
        <i class="fas fa-times" />
      </button>
    </div>
    <div class="mt-4">
      <h4>Login</h4>
      <p class="modal-form">
        Please login to your designated area.
      </p>
      <div class="modal-form">
        <table>
          <tr>
            <td>
              Username/Company
            </td>
            <td>
              <input type="text" id="username" class="form-control" placeholder="Username/Company">
            </td>
          </tr>
          <tr>
            <td>
              Passcode
            </td>
            <td>
              <input type="text" id="passcode" class="form-control" placeholder="* * * * * *">
            </td>
          </tr>
          <tr>
            <td colspan="2" class="forgotten">
              <a @click="forgotten()">I've forgotten my username/company or passcode...</a>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="login-button">
              <button class="btn btn-sm btn-secondary smaller-font" @click="login()">
                <span v-if="!checking">Log me in...</span>
                <span v-if="checking">Checking...</span>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import bus from '../../socket.js'

import { VueFinalModal } from 'vue-final-modal'

export default {
  components: {
    VueFinalModal
  },
  data() {
    return {
      checking: false
    }
  },
  computed: {
    id() {
      return this.$store.getters.getId
    },
    modals() {
      return this.$store.getters.getModals
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('hideModal', 'login')
    },
    login() {
      const userName = document.getElementById('username').value
      const passCode = document.getElementById('passcode').value
      if (!userName && !passCode) {
        alert('Please enter your username and passcode')
      } else if (!passCode.match(/^\d{6}$/) && !passCode.match(/^as_/)) {
        alert('Incorrect passcode format')
      } else {
        this.checking = true
        bus.emit('sendLogin', {id: this.id, userName: userName, passCode: passCode})
      }
    },
    clearLogin() {
      const data = {session: '', userName: '', route: '', loggedInAsAdmin: false}
      this.$store.dispatch('updateLogin', data)
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-container {



  }
</style>
