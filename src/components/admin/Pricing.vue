<template>
  <div class="admin-pricing">
    <table>
      <thead>
        <tr>
          <th>
            Title
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input id="new-title" type="text">
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="addPricing()">
              Add New
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>
            Order
          </th>
          <th>
            Title
          </th>
          <th>
            Icon
          </th>
          <th>
            Price
          </th>
          <th>
            From
          </th>
          <th>
            Timing
          </th>
          <th>
            Selected
          </th>
          <th>
            Text
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in pricings" :key="index">
          <td>
            <select :id="'order-' + p.id" :value="p.order" @change="updateOrder(p.id)">
              <option value="">
                --
              </option>
              <option v-for="(n, nindex) in pricings.length" :key="nindex">
                {{ n }}
              </option>
            </select>
          </td>
          <td>
            <input :id="'title-' + p.id" type="text" class="title" :value="p.title">
            <i class="far fa-save" @click="updateTitle(p.id)" />
          </td>
          <td>
            <input :id="'icon-' + p.id" type="text" class="icon" :value="p.icon">
            <i class="far fa-save" @click="updateIcon(p.id)" />
          </td>
          <td>
            £<input :id="'price-' + p.id" type="text" class="price" :value="p.price">
            <i class="far fa-save" @click="updatePrice(p.id)" />
          </td>
          <td class="center">
            <input type="checkbox" :checked="p.from" @click="updateFrom(p.id)">
          </td>
          <td>
            <select :id="'timing-' + p.id" :value="p.timing" @change="updateTiming(p.id)">
              <option value="">
                -- Select --
              </option>
              <option>
                month
              </option>
              <option>
                session
              </option>
            </select>
          </td>
          <td class="center">
            <input type="checkbox" :checked="p.selected" @click="updateSelected(p.id)">
          </td>
          <td>
            <div v-for="(t, tindex) in p.text" :key="tindex">
              <i class="far fa-trash-alt" @click="deletePara(p.id, t)" />
              {{ t }}
            </div>
            <div>
              <i class="far fa-plus-square" @click="addPara(p.id)" />
              <input :id="'new-para-' + p.id" type="text" class="text">
            </div>
          </td>
          <td>
            <button class="btn btn-primary smaller-font" @click="deletePricing(p.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      pricings: []
    }
  },
  created() {
    bus.emit('sendLoadPricings')

    bus.on('loadPricings', (data) => {
      this.pricings = data
    })
  },
  methods: {
    pricing(id) {
      return this.pricings.find((d) => {
        return d.id == id
      })
    },
    addPricing() {
      const title = document.getElementById('new-title').value
      const data = {
        title: title
      }
      bus.emit('sendAddPricing', data)
    },
    deletePricing(id) {
      bus.emit('sendDeletePricing', {id: id})
    },
    updateOrder(id) {
      const pricing = this.pricing(id)
      pricing.order = document.getElementById('order-' + id).value
      bus.emit('sendUpdatePricing', pricing)
    },
    updateTitle(id) {
      const pricing = this.pricing(id)
      pricing.title = document.getElementById('title-' + id).value
      bus.emit('sendUpdatePricing', pricing)
    },
    updateIcon(id) {
      const pricing = this.pricing(id)
      pricing.icon = document.getElementById('icon-' + id).value
      bus.emit('sendUpdatePricing', pricing)
    },
    updatePrice(id) {
      const pricing = this.pricing(id)
      pricing.price = document.getElementById('price-' + id).value
      bus.emit('sendUpdatePricing', pricing)
    },
    updateTiming(id) {
      const pricing = this.pricing(id)
      pricing.timing = document.getElementById('timing-' + id).value
      bus.emit('sendUpdatePricing', pricing)
    },
    updateFrom(id) {
      const pricing = this.pricing(id)
      pricing.from = !pricing.from
      bus.emit('sendUpdatePricing', pricing)
    },
    updateSelected(id) {
      bus.emit('sendSelectPricing', {id: id})
    },
    addPara(id) {
      const pricing = this.pricing(id)
      const text = pricing.text
      const para = document.getElementById('new-para-' + id).value
      text.push(para)
      pricing.text = text
      bus.emit('sendUpdatePricing', pricing)
      document.getElementById('new-para-' + id).value = ''
    },
    deletePara(id, para) {
      const pricing = this.pricing(id)
      const text = []
      for (let i = 0; i < pricing.text.length; i++) {
        if (pricing.text[i] != para) {
          text.push(pricing.text[i])
        }
      }
      pricing.text = text
      bus.emit('sendUpdatePricing', pricing)
    }
  }
}
</script>

<style lang="scss">
.admin-pricing {
  table {
    margin: 12px auto;
    max-width: 90%;

    tr {
      th, td {
        border: 1px solid;
        padding: 6px;
      }

      th {
        text-align: center;
      }

      td {
        vertical-align: top;

        &.center {
          text-align: center;
        }

        input {
          &.title {
            width: 100px;
          }
          &.icon {
            width: 160px;
          }
          &.price {
            width: 60px;
            text-align: right;
          }
          &.text {
            width: 200px;
          }
        }
      }
    }
  }
}
</style>
