<template>
  <div class="games">
    <div id="workshops" class="container-fluid text-center">
      <h2>Agile Workshops and Games</h2>
      <h4 class="games-header">
        All the games and simulations are highly interactive, and can be played in real-time across
        any number of remote locations. Players play on their own machine which keeps them
        engaged and interested. Hopefully, it's as close to playing round a table as you can get
        online...
      </h4>
      <div class="row slideanim">
        <div class="col-sm-4">
          <a v-if="!route" href="no-estimates?walkThrough">
            <i class="fas section-icon fa-dice" name="no-estimates" />
          </a>
          <a v-if="route" :href="'no-estimates-' + route + '?walkThrough'">
            <i class="fas section-icon fa-dice" name="no-estimates" />
          </a>
          <h4 id="no-estimates">
            <a v-if="!route" href="no-estimates?walkThrough">No Estimates</a>
            <a v-if="route" :href="'no-estimates-' + route + '?walkThrough'">No Estimates</a>
          </h4>
          <p>
            Thanks to <a href="https://www.linkedin.com/in/matthewphilip/">Matt Phillip</a> for inventing this
            one and collaborating to build the online version.
          </p>
          <p>
            The No Estimates game allows you to explore, in a fun and competitive way, sources
            of variation that render estimation inaccurate. It can be played by anything up to
            50 people in 6 teams, and is an ideal way to get these concepts across to
            managers or directors in a remote workshop environment. Ultimately, it
            provides a more scientific approach to forecasting the question every PM asks -
            "When will my stuff be delivered?.
          </p>
          <p><b>#noestimates</b></p>
        </div>
        <div class="col-sm-4">
          <a v-if="!route" href="coin-game?walkThrough">
            <i class="fas section-icon fa-coins" name="coin-game" />
          </a>
          <a v-if="route" :href="'coin-game-' + route + '?walkThrough'">
            <i class="fas section-icon fa-coins" name="coin-game" />
          </a>
          <h4>
            <a v-if="!route" href="coin-game?walkThrough">The Coin Game</a>
            <a v-if="route" :href="'coin-game-' + route + '?walkThrough'">The Coin Game</a>
          </h4>
          <p>
            Explore different delivery strategies and see why delivering highest value
            first is the best risk-reduction strategy. See this
            <a href="https://www.linkedin.com/pulse/coin-game-simple-effective-way-demonstrate-agility-steve-wells/">LinkedIn blog post</a>
            for a full description, and details of how to faciltate in person. Probably th simplest way to
            demonstrate an agile mindset, so perfect as an ice breaker for any group at any
            level in the organisatin, from C-suite to dev team.
          </p>
          <p><b>#coingame</b> <b>#valuefirstdelivery</b></p>
        </div>
        <div class="col-sm-4">
          <a v-if="!route" href="battleships?walkThrough">
            <i class="fas section-icon fa-ship" name="battleships" />
          </a>
          <a v-if="route" :href="'battleships-' + route + '?walkThrough'">
            <i class="fas section-icon fa-ship" name="battleships" />
          </a>
          <h4>
            <a v-if="!route" href="battleships?walkThrough">Agile Battleships</a>
            <a v-if="route" :href="'battleships-' + route + '?walkThrough'">Agile Battleships</a>
          </h4>
          <p>
            Thanks to <a href="https://www.linkedin.com/in/jamesscrimshire/">James Scrimshire</a> for inventing this
            one and letting us build the online version.
          </p>
          <p>
            The classic battleships game with an agile twist! Thsi version demonstrates the value of frequent and
            early feedback; one of the players plays "waterfall" and only sees which ships they have hit at the end of the game.
            The other plays "agile", and (<i>as in the normal game</i>) gets feedback on the success of every shot
            immediately after firing.
          </p>
          <p><b>#agilebattleships</b> <b>#rapidfeedback</b></p>
        </div>
      </div>
    </div>
    <div id="games" class="container-fluid text-center">
      <div class="row slideanim">
        <div class="col-sm-4">
          <a href="survival">
            <i class="fas section-icon fa-life-ring" name="survival" />
          </a>
          <h4 id="survival">
            <a href="survival">Survival At Sea</a>
          </h4>
          <p>
            The classic "Survival at Sea" team-building exercise - you're lost at sea
            in a sinking yacht with a fairly random selection of items, and you have
            to decide which ones you should keep, and which to discard.
          </p>
          <p><b>#survivalatsea</b></p>
        </div>
        <div class="col-sm-4">
          <a v-if="!route" href="planning-poker?walkThrough">
            <i class="fas section-icon fa-heart" name="planning-poker" />
          </a>
          <a v-if="route" :href="'planning-poker-' + route + '?walkThrough'">
            <i class="fas section-icon fa-heart" name="planning-poker" />
          </a>
          <h4>
            <a v-if="!route" href="planning-poker?walkThrough">Planning Poker</a>
            <a v-if="route" :href="'planning-poker-' + route + '?walkThrough'">Planning Poker</a>
          </h4>
          <p>
            The classic estimation game, but in an intuitive, fully featured format. Includes standard and custom
            estimation types (e.g. fibonacci, t-shirt, fruit, etc.), backlog import and export, multiple teams, and
            many other features.
          </p>
          <p><b>#planningpoker</b></p>
        </div>
        <div class="col-sm-4">
          <a v-if="!route" href="kanban-playground?walkThrough">
            <i class="fas section-icon fa-solar-panel" name="kanban-explorer" />
          </a>
          <a v-if="route" :href="'kanban-playground-' + route + '?walkThrough'">
            <i class="fas section-icon fa-solar-panel" name="kanban-explorer" />
          </a>
          <h4 id="kanban-explorer">
            <a v-if="!route" href="kanban-playground?walkThrough">Kanban Explorer</a>
            <a v-if="route" :href="'kanban-playground-' + route + '?walkThrough'">Kanban Explorer</a>
            <div class="under-construction" title="Under Construction" />
          </h4>
          <p>
            If you've played No Estimates, you'll know it's based around a Kanban board,
            so this is a stripped-down version using the same tech. to allow you to explore
            Kanban concepts in a simila environment.
          </p>
          <p><b>#kanban</b></p>
        </div>
      </div>
    </div>

    <div id="activities" class="container-fluid text-center">
      <h2>Ice Breakers and Agile Activities</h2>
      <div class="row slideanim">
        <div class="col-sm-4">
          <i class="fas section-icon fa-coins" name="coin-game" />
          <h4>
            <a v-if="!route" href="coin-game?walkThrough">The Coin Game</a>
            <a v-if="route" :href="'coin-game-' + route + '?walkThrough'">The Coin Game</a>
          </h4>
          <p>
            Explore different delivery strategies and see why delivering highest value
            first is the best risk-reduction strategy. See this
            <a href="https://www.linkedin.com/pulse/coin-game-simple-effective-way-demonstrate-agility-steve-wells/">LinkedIn blog post</a>
            for a full description, and details of how to faciltate in person. Probably th simplest way to
            demonstrate an agile mindset, so perfect as an ice breaker for any group at any
            level in the organisatin, from C-suite to dev team.
          </p>
          <p><b>#coingame</b></p>
        </div>
        <div class="col-sm-4">
          <i class="fas section-icon fa-random" name="context-switching" />
          <h4>
            <a href="context-switching?walkThrough">Context Switching</a>
          </h4>
          <p>
            It is estimated that a 30 second interruption can cost an hour of
            lost time, particularly for people working in high-knowledge areas
            like software development or UI design. This simple simulation quickly
            shows the effect of context-switching on performance.
          </p>
          <p><b>#contextswitching</b></p>
        </div>
        <div class="col-sm-4">
          <i class="far section-icon fa-lightbulb" />
          <h4>
            <button class="btn btn-default btn-lg" @click="setTab('suggest')">
              Suggest an Activity
            </button>
          </h4>
          <p>
            We are constantly on the lookout for agile games and activities we can build
            to bring the remote experience as close to the face-to-face one as we can.
          </p>
          <p>
            Do get in touch if you any ideas or sugestions for games or activities
            we could build.
          </p>
        </div>
      </div>
    </div>

    <div id="assessments" class="container-fluid text-center">
      <h2>Assessments</h2>
      <h4 class="games-header">
        It's always useful to assess how teams and organisations are doing, and to check
        trends over time. The assessments are quick, and easy to run, so can quickly
        gather qualitative data. Note - these are <em>not</em> those dreaded anti-agile
        "(process-)compliance" tests...
      </h4>
      <p class="intro">
        Most organisations do these, or some similar, assessment. The time-consuming part, though is
        setting up and maintaining spreadsheets or databases to store data to construct trends,
        graphs, or other analyses. Also, the questions may not be quite relevant, so it is
        necessary need change or delete them, or add new ones to explore different areas of
        relevance.
      </p>
      <p class="intro">
        All these assessments run in the same assessment platform, so all data storage, graphing,
        trending and aggregation across teams and organisations come as standard with all
        assessments. Also, full editing facilities for all questions is available to tweak
        them to be most relevant to your organisation. Our aim is to enable you to easily do
        rich assessments with the least amount of effort.
      </p>

      <div class="row slideanim">
        <div class="col-sm-6">
          <i class="fas section-icon fa-ambulance" name="team-health-check" />
          <h4>
            <a href="team-health-check">Spotify Health Check</a> <New />
          </h4>
          <p>
            Spotify's well-known "traffic light" model of team health, easily adapted
            to suit your organisation. Simple to run, the results are easily
            understood and can be used to show trends or common issues over time.
            The original model is described
            <a href="https://engineering.atspotify.com/2014/09/16/squad-health-check-model/">here</a>
          </p>
          <p><b>#teamhealthcheck</b> <b>#spotify</b></p>
        </div>
        <div class="col-sm-6">
          <i class="fas section-icon fa-pizza-slice" name="team-health-check" />
          <h4>
            <a href="agile-maturity">Agile Maturity Assessment</a> <New />
          </h4>
          <p>
            In larger organisations, it is useful to know where teams are on their agile
            journey, and agile assessments do just that. However, many fall foul of being
            a "process-compliance" audit. As an example, do teams not have standups because
            they are performing badly, or because they have moved on to real-time planning
            and collaboration and don't need them.
          </p>
          <p><b>#agilematurity</b></p>
        </div>
      </div>
      <div class="row slideanim">
        <div class="col-sm-6">
          <i class="fas section-icon fa-toilet-paper" name="five-dysfunctions" />
          <h4>
            <a href="five-dysfunctions">5 Dysfunctions</a> <New />
          </h4>
          <p>
            One of the most widely regarded assessment models, by Patrick Lencioni from
            2002. Gives valuable insights into how well teams are performing, and what
            areas may need addressing. More information
            <a href="https://en.wikipedia.org/wiki/The_Five_Dysfunctions_of_a_Team">here</a>
          </p>
          <p><b>#5dysfunctions</b> <b>#lencioni</b></p>
        </div>
        <div class="col-sm-6">
          <i class="fas section-icon fa-book-reader" name="scrum-master" />
          <h4>
            <a href="scrum-master">Scrum Master Asessment</a>
            <div class="under-construction" title="Under Construction" />
          </h4>
          <p>
            We tell the team to use retrospectives to inspect and continuously improve themselves. But
            what about us as Scrum Masters? Shouldn’t we take the time to reflect,
            identify our areas of improvement, and take actions to get better as Scrum Masters?
          </p>
          <p>
            Thanks to <a href="https://www.linkedin.com/in/amparocorrea">Amparo Correa</a> for
            this excellent assessment.
          </p>
          <p><b>#scrummaster</b> <b>#lencioni</b></p>
        </div>
      </div>
    </div>

    <div id="simulations" class="container-fluid text-center">
      <h2>Simulations</h2>
      <h4 class="games-header">
        The simulations are slightly different to the other activities. These are
        more based around scientific(-ish) simulation of the effectiveness of agile teams using different
        ways of working. More explanation <a href="/simulations.html">here</a>
      </h4>
      <div class="row slideanim">
        <div class="col-sm-4">
          <i class="fas section-icon fa-people-carry" />
          <h4>
            <a href="do-others-work-first-js?walkThrough">Interdependent Teams</a>
          </h4>
          <p>
            In any reasonably sized organisation, there
            will be dependencies between teams. So what is the best way to prioritise
            cross-team work? See <a href="https://vimeo.com/293167264/13f201d4f0">this video</a>
            from Agile Cambridge 2017 for an explanation.
          </p>
          <p>The conclusions might surprise you.</p>
          <p><b>#interdependentteams</b> <b>#agilecam2017</b></p>
        </div>
        <div class="col-sm-4">
          <i class="fas section-icon fa-hands-helping" />
          <h4>
            <a href="pairing-simulation">Pairing</a>
          </h4>
          <p>
            Pairing is usually touted in XP terms as a way to improve code quality through practices like
            TDD. However, it is a great way to increase knowledge sharing, and therefor reducing risk
            of silos, and for cementing a common vision, approach, goals and practices. But does it take
            longer to develop using pairing? This simulation allows you to explore the true costs and
            benefits of pairing.
          </p>
          <p><b>#pairing</b></p>
        </div>
        <div class="col-sm-4">
          <i class="far section-icon fa-lightbulb" />
          <h4>
            <button class="btn btn-default btn-lg" @click="setTab('suggest')">
              Suggest a Game
            </button>
          </h4>
          <p>
            We are constantly on the lookout for games and simulations we can build
            to bring the remote experience as close to the face-to-face one as we can.
          </p>
          <p>
            Do get in touch if you any ideas or sugestions for new games or simulations
            we could build.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import New from './New.vue'

export default {
  components: {
    New
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
    contact() {
      bus.emit('contact', {})
    }
  }
}
</script>

<style lang="scss">
  .games {

    .games-header {
      max-width: 800px;
      margin: 12px auto 24px auto;
    }

    .fas {
      &:hover {
        color: #23527c;
      }
    }

    p {
      &.intro {
        max-width: 800px;
        margin: 16px auto;
        font-size: larger;
      }
    }

    .under-construction {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-left: 6px;
      position: relative;
      top: 6px;
      background-size: contain;
      background-image: url('../assets/img/under-construction.png');
    }
  }
</style>
