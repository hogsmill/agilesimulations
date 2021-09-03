<template>
  <div>
    <h2>
      Where we've played the games in public...
      <a href="/gameDates.xml">
        <i class="fas fa-rss-square" />
      </a>
    </h2>
    <table v-if="rss.id" class="rss-game-date">
      <tr>
        <td class="right">
          Date of Game:
        </td>
        <td class="left">
          {{ gameDate() }}
        </td>
      </tr>
      <tr>
        <td class="right">
          Game Played:
        </td>
        <td class="left">
          {{ gameField('game') }}
        </td>
      </tr>
      <tr v-if="gameField('link')">
        <td class="right">
          Link to Video:
        </td>
        <td class="left">
          <a :href="gameField('link')" target="blank" title="Link to video">
            <i class="fas fa-external-link-alt" />
          </a>
        </td>
      </tr>
      <tr>
        <td class="right">
          Description:
        </td>
        <td class="left">
          {{ gameField('description') }}
        </td>
      </tr>
    </table>
    <table v-if="!rss.id" class="game-dates">
      <thead>
        <tr>
          <th>
            Date
          </th>
          <th>
            Where
          </th>
          <th>
            Game
          </th>
          <th>
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(date, index) in gameDates" :key="index">
          <td>
            {{ gameDate(date) }}
          </td>
          <td>
            <div class="country" :class="date.location ? date.location.code : 'world'" :title="date.location ? date.location.name : 'Worldwide'" />
          </td>
          <td>
            {{ gameField('game', date) }}
            <a v-if="gameField('link', date)" :href="gameField('link', date)" target="blank" title="Link to video">
              <i class="fas fa-external-link-alt" />
            </a>
          </td>
          <td>
            {{ gameField('description', date) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rssGameDate: {}
    }
  },
  computed: {
    rss() {
      return this.$store.getters.getRss
    },
    gameDates() {
      return this.$store.getters.getGameDates
    }
  },
  methods: {
    getRssGameDate() {
      return this.gameDates.find((g) => {
        return g.id == this.rss.id
      })
    },
    gameDate(date) {
      if (this.rss.id) {
        date = this.getRssGameDate()
      }
      const month = date.month < 10 ? '0' + date.month : date.month
      const day = date.day < 10 ? '0' + date.day : date.day
      return date.year + '-' + month + '-' + day
    },
    gameField(field, date) {
      if (this.rss.id) {
        date = this.getRssGameDate()
      }
      return date[field]
    }
  }
}
</script>

<style lang="scss">
  .rss-game-date {
    font-size: larger;

    td {

      &.left {
        text-align: left;
      }
      &.right {
        text-align: right;
      }
    }
  }

  .game-dates {
    td {
      text-align: left;
      border: 1px solid #ddd;

      &.right {
        text-align: right;
      }

      .country {
        width: 40px;
        height: 20px;
        margin: auto auto;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;

        &.world {
          background-image: url('../../assets/img/countries/world.png');
        }
        &.uk {
          background-image: url('../../assets/img/countries/gb.png');
        }
        &.us {
          background-image: url('../../assets/img/countries/us.png');
        }
        &.india {
          background-image: url('../../assets/img/countries/in.png');
        }
        &.belarus {
          background-image: url('../../assets/img/countries/by.png');
        }
      }
    }
  }
</style>
