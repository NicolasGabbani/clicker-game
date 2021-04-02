<template>
  <div class="nes-container is-rounded is-dark is-semi-dark score">
    <div class="currency">{{ currency }}<span class="fraise"></span></div>
    <div class="cps">{{ cps }}<span class="fraise"></span>/seconde</div>
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
  .score
    position: relative
    z-index: 4
  .currency
    font-size: 2rem
  .cps
    font-size: .7rem
    span
      width: 30px
      height: 30px
  .total
    margin-top: 20px
</style>