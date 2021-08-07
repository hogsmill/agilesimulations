<template>
  <div class="admin">
    <h2 class="menu">
      <div :class="{ 'selected': scope == 'gameDates' }">
        <i class="fas fa-dice" title="Edit Game Dates" @click="setScope('gameDates')" />
      </div>
      <div :class="{ 'selected': scope == 'updates' }">
        <i class="fas fa-book" title="Edit Updates" @click="setScope('updates')" />
      </div>
    </h2>
    <Updates v-if="scope == 'updates'" />
    <GameDates v-if="scope == 'gameDates'" />
  </div>
</template>

<script>
import Updates from './admin/Updates.vue'
import GameDates from './admin/GameDates.vue'

export default {
  components: {
    Updates,
    GameDates
  },
  data() {
    return {
      scope: 'updates'
    }
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName
    }
  },
  methods: {
    setScope(scope) {
      this.scope = scope
    }
  }
}
</script>

<style lang="scss">
.admin {

  padding: 6px;

  h2 {
    text-align: center;

    &.menu {
      div {
        width: 70px;
        height: 55px;
        padding: 6px;
        display: inline-block;

        &.selected {
          background-color: #f4511e;
          border-radius: 12px;

          i {
            color: #fff;
          }
        }
      }
    }

    i {
      color: #f4511e;
      margin: 2px 6px;

      &:hover {
        cursor: pointer;
        color: #444;
      }
    }
  }
}
</style>
