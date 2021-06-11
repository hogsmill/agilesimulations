<template>
  <div class="no-estimates-mobile">
    <h2>
      No Estimates Mobile
    </h2>
    <div class="row">
      <div class="col-sm-4">
        <p>
          The No Estimates game was originally a physical board game created
          by <a href="https://www.linkedin.com/in/matthewphilip/" target="blank">Matt Phillip</a>.
          However, while collaborating to build the online game, we realised that
          in certain ways the online version was better than the physical
          version. As an example...
        </p>
        <ul>
          <li>
            Any randomisation can be done in code, rather than rolling dice
          </li>
          <li>
            All game data can be analysed in real-time, rather than having to
            calculate afterwards, or use example data
          </li>
          <li>
            Things like moving cards between columns can be done automatically
          </li>
          <li>
            The game can be configured to match player's circumstances
          </li>
        </ul>
        <p>
          ...and so on.
        </p>
        <p>
          So, once people go back to office working, it would make sense to play
          the game both face-to-face <i>and</i> online to get the best of both
          worlds. However, everyone playing individually on their own laptops would
          degrade the experience significantly.
        </p>
        <p>
          Hence, we built an app version of the game so the it can be shown on
          a central screen, with the game moves played on players' phones, giving
          us, hopefully, all the collaborative advantages of playing face-to-face,
          but also the benefits of the game being on software.
        </p>
        <p>
          Do <a @click="contact()">get in touch</a> for more details.
        </p>
      </div>
      <div class="col-sm-8">
        <div class="pic" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  created() {
    window.scrollTo(0, 0)
  },
  methods: {
    contact() {
      bus.$emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .no-estimates-mobile {
    padding: 0 36px;

    h2 {
      text-align: center;
    }

    .pic {
      margin: 0 24px 24px 24px;
      background-image: url("../../assets/img/screenshots/no-estimates-mobile.jpg");
      background-size: contain;
      background-repeat: no-repeat;
      height: 400px;
    }
  }
</style>
