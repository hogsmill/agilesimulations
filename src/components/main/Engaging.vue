<template>
  <div id="engaging-tab" class="container-fluid text-center more-tab">
    <div class="row slideanim">
      <div>
        <i class="fas section-icon fa-glass-cheers" />
      </div>
      <h2>Engaging...</h2>
      <div class="col-sm-12">
        <p>
          We build our games, workshops and simulations  so that the current state of play
          is always updated in real-time on the player's browser. Players are highly
          engaged as they can see exactly what they and other players are doing; just like
          playing the game physically around an actual game board.
        </p>
        <p>
          This also means the players have to be engaged in the game, as everyone can see if
          they are not playing their part. If you drift off to check your phone or emails, it
          won't be long before other players are asking why you're not doing the tasks you're
          supposed to be doing.
        </p>
        <p>
          Using technology to run the game, rather than a physical board, also has many
          advantages over "the real thing", and this also leads to more engagement.
        </p>
        <p>
          Here's a
          <a href="https://kanbanzone.com/2021/what-we-learned-from-taking-agile-workshops-online/" target="_blank">
            a blog post
          </a>
          from the Kanban Zone showing what we learned about how engaging the games are from
          playing one at a virtual conference.
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
#engaging-tab {
}
</style>
