<template>
  <div id="main-tab" class="container-fluid text-center">
    <LoggedInGames v-if="session" />
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
        <a @click="setTab('engaging')">Learn more <i class="far fa-hand-point-right more" /></a>
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
        <a @click="setTab('epiphanising')">Learn more <i class="far fa-hand-point-right more" /></a>
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
        <a @click="setTab('relevant')">Learn more <i class="far fa-hand-point-right more" /></a>
      </div>
    </div>
    <div class="row slideanim screenshots">
      <h2>The Games In Action...</h2>
      <div class="col-sm-4">
        <a :href="href('no-estimates') + '?walkThrough'">
          <div class="pic no-estimates" title="The No Estimates Game">
            <div class="caption">
              The No Estimates Game
            </div>
          </div>
        </a>
      </div>
      <div class="col-sm-4">
        <a @click="setTab('pipeline')">
          <div class="pic pipeline-game" title="The Pipeline Game">
            <div class="caption">
              The Pipeline Game
            </div>
          </div>
        </a>
      </div>
      <div class="col-sm-4">
        <a @click="setTab('no-estimates-mobile')">
          <div class="pic no-estimates-mobile" title="The mobile app for No Estimates Game">
            <div class="caption">
              The mobile app for No Estimates Game
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="row slideanim">
      <div class="col-sm-4">
        <a :href="href('coin-game') + '?walkThrough'">
          <div class="pic coin-game" title="The Coin Game">
            <div class="caption">
              The Coin Game
            </div>
          </div>
        </a>
      </div>
      <div class="col-sm-4">
        <a :href="href('battleships') + '?walkThrough'">
          <div class="pic agile-battleships" title="Agile Battleships!">
            <div class="caption">
              Agile Battleships!
            </div>
          </div>
        </a>
      </div>
      <div class="col-sm-4">
        <a @click="setTab('monte-carlo')">
          <div class="pic monte-carlo" title="Monte Carlo simulations from the No Estimates Game">
            <div class="caption">
              Monte Carlo simulations from the No Estimates Game
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="contact">
      <p>
        <a @click="contact()">Contact Us</a> for more info...
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import LoggedInGames from './loggedin/Games.vue'

export default {
  components: {
    LoggedInGames
  },
  computed: {
    session() {
      return this.$store.getters.getSession
    },
    route() {
      return this.$store.getters.getRoute
    }
  },
  methods: {
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    },
    href(url) {
      return this.route ? url + '-' + this.route : url
    },
    contact() {
      bus.emit('contact', {})
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

  .more {
    color: #f4511e;
    margin-left: 3px;
  }

  .screenshots {
    margin-top: 24px;
  }

  .pic {
    background-repeat: no-repeat;
    background-size: cover;
    margin: 12px auto;
    min-height: 200px;
    background-position-x: center;
    background-position-y: center;

    &.no-estimates {
      background-image: url("../assets/img/screenshots/no-estimates.jpg");
    }
    &.no-estimates-mobile {
      background-image: url("../assets/img/screenshots/no-estimates-mobile.jpg");
    }
    &.pipeline-game {
      background-image: url("../assets/img/screenshots/pipeline-game.jpg");
    }
    &.coin-game {
      background-image: url("../assets/img/screenshots/coin-game.jpg");
    }
    &.agile-battleships {
      background-image: url("../assets/img/screenshots/agile-battleships.png");
    }
    &.flow-efficiency {
      background-image: url("../assets/img/screenshots/flow-efficiency.jpg");
    }
    &.monte-carlo {
      background-image: url("../assets/img/screenshots/monte-carlo.jpg");
    }

    .caption {
      position: absolute;
      bottom: 0;
      background-color: #444;
      line-height: 1.5;
      opacity: 0.7;
      color: #fff;
      width: 80%;
      margin: 0 20px;
      text-align: center;
    }

    &:hover {
      .caption {
        opacity: 1;
      }
    }
  }

  .contact {
    padding: 24px;
  }
}

.more-tab {

  max-width: 800px;

  .back {
    color: #f4511e;
    margin-right: 3px;
  }

  .tech {
    background-repeat: no-repeat;
    background-size: contain;
    margin: 12px auto;
    min-height: 200px;
    background-position-x: center;
    background-position-y: center;
    background-image: url("../assets/img/tech.jpg");
  }
}

@media screen and (max-width: 768px) {
  #main-tab {

    .pic {
      margin-bottom: 24px;

      .caption {
        position: initial;
      }
    }
  }
}
</style>
