<template>
  <div class="nes-container is-rounded is-white">
    <div class="currency">{{ currency }}<span>⭐️</span></div>
    <div class="cps">{{ cps }}<span>⭐️</span>/seconde</div>
    <div class="total">total: {{ total }} kg</div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    currency: String,
    cps: String,
    total: String
  }
}
</script>

<style lang="sass">
  .currency
    font-size: 2rem
    span
      display: inline-block
      font-size: 3rem
      margin-left: -5px
      position: relative
      top: -5px
  .cps
    font-size: .7rem
    span
      display: inline-block
      font-size: 1.2rem
      position: relative
      top: -2px
  .total
    margin-top: 20px
</style>