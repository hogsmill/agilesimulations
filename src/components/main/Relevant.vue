<template>
  <div id="relevant-tab" class="container-fluid text-center more-tab">
    <div class="row slideanim">
      <div>
        <i class="fas section-icon fa-hat-wizard" />
      </div>
      <h2>Relevant...</h2>
      <div class="col-sm-12">
        <p>
          The more relevant a game feels, the more engaging it becomes. Hence
          we provide full customisation on all games so they can be made as
          relevant to your organisation/circumstances as possible.
        </p>
        <p>
          As an example, we can configure the teams to have the same names, colours,
          logos and membership as your real teams. We can change the currency to your
          local currency, and configure Kanban boards to match how work happens in your
          organisation.
        </p>
        <p>
          We can also configure the whole game platform to your corporate branding,
          colours and logos, and save result of the games over time for trending and
          reporting purposes.
        </p>
        <p>
          Language localisation is currently under development; contact us for details
          and your language requirements.
        </p>
        <p>
          Many of the games are playable with a large number of players, so are ideal
          for larger company-wide events as well as within teams.
        </p>
        <p>
          <a @click="setTab('main')"><i class="far fa-hand-point-left back" /> Go Back</a>
        </p>
        <p>
          For those who are interested, here's the tech we used to build the games...
        </p>
      </div>
    </div>
    <div class="row slideanim">
      <div class="tech" />
    </div>
    <div class="contact">
      <p>
        <a @click="contact()">Contact Us</a> for more info...
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    contact() {
      bus.emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
#relevant-tab {

  .tech {
    background-repeat: no-repeat;
    background-size: contain;
    margin: 12px auto;
    min-height: 200px;
    background-position-x: center;
    background-position-y: center;
    background-image: url("../../assets/img/tech.jpg");
  }
}
</style>
