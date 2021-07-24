<template>
  <div id="resources" class="container-fluid text-center">
    <h2>
      Here's some more info on the games, and other resources...
    </h2>
    <p>
      Many of our games, workshops and activities are explored in more detail in various blog posts, conference
      presentations, and elsewhere. Links to these are provided in a handy list below,
      along with some other relevant resources...
    </p>

    <!-- Agile Simulations -->

    <div class="resources">
      <h3>
        Agile Simulations Resources
      </h3>
      <div class="resource" :class="{'mobile': mobile }">
        <a href="https://youtu.be/AnOqq5Yygbk" target="_blank">
          Many of the games
        </a>
        presented at Example Lean Agile
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        What we learned from running
        <a href="https://kanbanzone.com/2021/what-we-learned-from-taking-agile-workshops-online/" target="_blank">
          The No Estimates Game
        </a>
        online
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        <a href="https://medium.com/p/the-coin-game-now-available-remotely-a-simple-but-effective-way-to-demonstrate-agility-9bba5be65ae" target="_blank">
          The Coin Game
        </a>
        blog post on Medium
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        Why
        <a href="https://www.ludogogy.co.uk/article/making-feedback-engaging-and-relevant-by-taking-agile-workshops-online/" target="_blank">
          feedback is more effective online
        </a>
        from the online gamification journal
        <a href="https://www.ludogogy.co.uk/" target="_blank">
          Ludogogy
        </a>
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        The
        <a href="https://www.youtube.com/watch?v=k0hvgZBfmuw" target="_blank">
          Coin Game</a>
        from one of
        <a href="http://www.thevirtualagilecoach.co.uk">
          Chris Stone
        </a>
        's excellent Agile Arcades
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        <a href="https://vimeo.com/293167264/13f201d4f0" target="_blank">
          Interdependent Teams simulation presentation
        </a>
        at Agile Cambridge 2018
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        <a href="https://community-z.com/events/agile-z-day/talks/5120" target="_blank">
          Agile Z-Day presentation
        </a>
        of the Coin Game and No Estimates
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        <a href="https://youtu.be/seOBNlpEO3Y" target="_blank">
          No Estimates
        </a>
        at Funconf 2021, India's first ever gamification conference
      </div>
    </div>

    <!-- Other -->

    <div class="resources">
      <h3>Other Relevant Resources</h3>
      <div class="resource" :class="{'mobile': mobile }">
        Other interesting
        <a href="https://agilesimulations.medium.com/" target="_blank">
          blog posts
        </a>
        on Medium
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        An
        <a href="https://www.linkedin.com/pulse/agile-reading-list-steve-wells/" target="_blank">
          agile reading list
        </a>
      </div>
      <div class="resource" :class="{'mobile': mobile }">
        Other interesting
        <a href="https://www.linkedin.com/in/hogsmill/detail/recent-activity/posts/" target="_blank">
          blog posts
        </a>
        on LinkedIn
      </div>
    </div>

    <!-- Because we can -->

    <div class="resources">
      <h3>Because we can...</h3>
      <div class="resource" :class="{'mobile': mobile }">
        <a href="/mandelbrot.html" target="_blank">
          The Mandelbrot Set
        </a>
        in JavaScript. I mean - why not?
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    }
  }
}
</script>

<style lang="scss">
#resources {

  .sub-page-header {
    padding: 24px;

    i.fas {
      margin: 0 12px;
    }
  }

  .resources {
    text-align: center;
  }
  .resource {
    font-size: 19px;
    line-height: 1.4;
    border-radius: 6px;
    text-align: center;
    color: #fff;
    width: 185px;
    height: 160px;
    padding: 12px;
    margin: 24px;
    display: inline-block;
    vertical-align: top;
    background-color: #f4511e;
    box-shadow: 2px 2px 3px #aaa;

    &.mobile {
      width: 80%;
      height: initial;
    }

    a {
      color: burlywood;
      font-weight: bold;
    }
  }
}
</style>
