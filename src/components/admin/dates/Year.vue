<template>
  <select :id="id ? 'select-year-' + id : 'select-year'" :value="year">
    <option value="">
      YY
    </option>
    <option v-for="(n, index) in 5" :key="index">
      {{ n + 2019 }}
    </option>
  </select>
</template>

<script>
export default {
  props: [
    'id',
    'year'
  ]
}
</script>
