<template>
  <vue-final-modal name="feedback" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['labs']">
    <div v-if="selectedGame().status" class="game-details" :class="selectedGame().status.replace(/ /g, '-').toLowerCase()">
      <div class="float-right mr-2 mt-1">
        <button type="button" class="close" @click="hide" aria-label="Close">
          <i class="fas fa-times" />
        </button>
      </div>
      <div class="mt-4">
        <h4>{{ selectedGame().name }}</h4>
        <h5 class="details-status">
          Status: {{ selectedGame().status }}
        </h5>
        <div v-if="selectedGame().name" class="details-image" :class="selectedGame().name.replace(/ /g, '-').toLowerCase()" />
        <p>
          {{ selectedGame().details }}
        </p>
        <p v-if="selectedGame().link">
          Link: <a :href="selectedGame().link.url">{{ selectedGame().link.text }}</a>
        </p>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

export default {
  components: {
    VueFinalModal
  },
  data() {
    return {
      thisGame: null
    }
  },
  computed: {
    modals() {
      return this.$store.getters.getModals
    },
    games() {
      return this.$store.getters.getLabGames
    },
    game() {
      return this.$store.getters.getSelectedGame
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('hideModal', 'labs')
    },
    selectedGame() {
      if (!this.thisGame) {
        this.thisGame = this.games.find((g) => {
          return g.name == this.game.name
        })
      }
      return this.thisGame
    }
  }
}
</script>
