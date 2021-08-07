<template>
  <select :id="id ? 'select-month-' + id : 'select-month'" :value="month">
    <option value="">
      MM
    </option>
    <option v-for="(n, index) in 12" :key="index">
      {{ n }}
    </option>
  </select>
</template>

<script>
export default {
  props: [
    'id',
    'month'
  ]
}
</script>
