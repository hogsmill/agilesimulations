<template>
  <select :id="id ? 'select-day-' + id : 'select-day'" :value="day">
    <option value="">
      DD
    </option>
    <option v-for="(n, index) in 31" :key="index">
      {{ n }}
    </option>
  </select>
</template>

<script>
export default {
  props: [
    'id',
    'day'
  ]
}
</script>
