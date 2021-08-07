<template>
  <select id="select-day">
    <option value="">
      DD
    </option>
    <option v-for="(n, index) in 31" :key="index">
      {{ n }}
    </option>
  </select>
</template>
