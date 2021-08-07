<template>
  <select id="select-month">
    <option value="">
      MM
    </option>
    <option v-for="(n, index) in 12" :key="index">
      {{ n }}
    </option>
  </select>
</template>
