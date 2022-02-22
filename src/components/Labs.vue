<template>
  <div class="container labs" :class="{ 'mobile': mobile }">
    <h2>
      Agile Simulations Labs
      <i class="fas section fa-flask" aria-hidden="true" />
    </h2>
    <p>
      We're always looking for new ideas for stuff to build; this is what we're building or considering at the moment.
    </p>
    <p>
      Our architecture allows us to build new things pretty quickly, so feel to contact us to discuss your requirements...
    </p>
    <div class="row">
      <div class="game-holder" :class="{ 'mobile': mobile }">
        <div class="game suggest rounded">
          <h4 class="rounded">
            Your Game
          </h4>
          <p>
            Suggest <a @click="setTab('suggest')">a game</a> and see it voted for here
          </p>
        </div>
      </div>
      <div v-for="(game, index) in games" :key="index" class="game-holder" :class="classStr(game)">
        <div class="game rounded">
          <h4 class="rounded">
            {{ game.name }}
            <i class="fas fa-info-circle info" title="What is this?" @click="setSelectedGame(game)" />
          </h4>
          <h5>
            Status:
            <span>{{ game.status }}</span>
          </h5>
          <p>
            Votes: <i class="far fa-thumbs-up votes" @click="voteFor(game)" /> {{ game.votes }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
    mobile() {
      return this.$store.getters.getMobile
    },
    games() {
      return this.$store.getters.getLabGames
    }
  },
  created() {
    bus.emit('sendLoadLabGames')

    bus.on('loadLabGames', (data) => {
      this.$store.dispatch('loadLabGames', data)
    })
  },
  methods: {
    classStr(game) {
      let str = game.status.replace(/ /g, '-').toLowerCase()
      if (this.mobile) {
        str = str + ' mobile'
      }
      return str
    },
    setSelectedGame(game) {
      this.$store.dispatch('setSelectedGame', game)
      this.$store.dispatch('showModal', 'labs')
    },
    setTab(tab) {
      this.$store.dispatch('updateTab', tab)
    }
  }
}
</script>

<style lang="scss">

$orange: #f4511e;
$pie-in-the-sky: lightblue;
$on-hold: #bbb;

.labs {

  .fa-times {
    margin: 6px;
  }

  h2 {
    text-align: center;
  }

  h5, p, span {
    text-align: center;
  }

  .fas {
    color: $orange;
  }

  .row {
    display: flex;
    flex-wrap: wrap;

    .game-holder {
      color: #fff;
      width: 25%;
      padding: 12px;
      display: flex;

      &.mobile {
        width: 100%;
        display: block;
      }

      &.started .game {
        background-color: dodgerblue;
      }
      .game {
        box-shadow: 5px 5px 5px #888;
        background-color: lightgrey;
        padding: 12px;
        width: 100%;

        h5, p, span, .far {
          color: #fff;
        }

        h4 {
          text-align: center;
          background-color: #fff;
          color: #2c3e50;
          margin-bottom: 0;
        }

        h5 {
          font-size: 2rem;
        }

        p {
          font-size: 2rem;
          text-align: center;
        }

        &.suggest {
          background-color: #fff;
          color: #2c3e50;
          border: 8px solid #f4511e;

          p {
            color: #444;
            line-height: 1.5;
          }
        }
      }
      &.pie-in-the-sky {
        div {
          background-color: $pie-in-the-sky;
        }
      }
      &.on-hold {
        div {
          background-color: $on-hold;
          opacity: 0.7;
        }
      }
    }

    .votes {
      &:hover {
        cursor: pointer;
        font-weight: bold;
      }
    }

    .info {
      color: #aaa;
      &:hover {
        cursor: pointer;
        color: $orange;
      }
    }
  }

  .game-details {
    text-align: center;
    box-shadow: 5px 5px 5px #444;
    background-color: #fff;
    color: #2c3e50;
    border: 8px solid $orange;
    height: 100%;

    h4 {
      font-size: 32px;
    }

    .link-table {
      margin: 0 6px 0 auto;
    }

    &.pie-in-the-sky {
      border-color: $pie-in-the-sky;
    }
    &.on-hold {
      border-color: $on-hold;
    }
    p {
      text-align: left;
      padding: 6px;
    }

    .details-status {
      color: #fff;
      background-color: #2c3e50;
      padding: 6px;
    }

    .details-image {
      margin: 0 12px 12px 6px;
      float: left;
      width: 50%;
      height: 150px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;

      &.niko-niko {
        background-image: url("../assets/img/games/Niko Niko.jpg");
      }
      &.dependencies {
        background-image: url("../assets/img/games/Dependencies.jpg");
      }
      &.lego-flow {
        background-image: url("../assets/img/games/Lego Flow.jpg");
      }
      &.communication {
        background-image: url("../assets/img/games/Communication.jpg");
      }
      &.risk-retro {
        background-image: url("../assets/img/games/Risk Retro.jpg");
      }
      &.health-check {
        background-image: url("../assets/img/games/Health Check.jpg");
      }
      &.alhambra {
        background-image: url("../assets/img/games/Alhambra.jpg");
      }
      &.the-pipeline-game {
        background-image: url("../assets/img/games/The Pipeline Game.jpg");
      }
      &.the-bug-game {
        background-image: url("../assets/img/games/zero bugs.png");
      }
      &.subtraction {
        background-image: url("../assets/img/games/subtraction.png");
      }
      &.minesweeper {
        background-image: url("../assets/img/games/minesweeper.png");
      }
      &.values-map {
        background-image: url("../assets/img/games/values radar.jpg");
      }
    }
  }

  &.mobile {
    .vm--modal {
      width: 100% !important;
      left: 0 !important;
    }
  }
}

@media screen and (max-width: 768px) {
  .game-holder {
    width: 100%;

    .game {
      box-shadow: none !important;
    }
  }
}
</style>
