<template>
  <select id="select-year">
    <option value="">
      YY
    </option>
    <option v-for="(n, index) in 5" :key="index">
      {{ n + 2019 }}
    </option>
  </select>
</template>
