<template>
  <div id="main-tab" class="container-fluid text-center">
    <div class="row slideanim">
      <h2>We build remote agile <a @click="setTab('games')">games, workshops and activities</a> that are...</h2>
      <div class="col-sm-4">
        <i class="fas section-icon fa-glass-cheers" />
        <h4 @click="setTab('engaging')">
          Engaging
        </h4>
        <p>
          All games keep the current game state in real-time on your local browser;
          it's impossible to not engage when everyone sees what everybody is doing...
        </p>
        <a @click="setTab('engaging')">Learn more...</a>
      </div>
      <div class="col-sm-4">
        <i class="fab section-icon fa-grav" />
        <h4 @click="setTab('epiphanising')">
          Epiphanising
        </h4>
        <p>
          As well as being fun, all the games give that "light-bulb" moment
          when players realise their mindset has been challenged and they have
          learned something...
        </p>
        <a @click="setTab('epiphanising')">Learn more...</a>
      </div>
      <div class="col-sm-4">
        <i class="fas section-icon fa-hat-wizard" />
        <h4 @click="setTab('relevant')">
          Relevant
        </h4>
        <p>
          All games can be customised to make them as relevant to the players'
          teams/organisations as possible. Making it real improves the
          engagement even further...
        </p>
        <a @click="setTab('relevant')">Learn more...</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    }
  }
}
</script>

<style lang="scss">
#main-tab {
  h4 {
    &:hover {
      color: #337ab7;
      text-decoration: underline;
    }
  }
}
</style>
