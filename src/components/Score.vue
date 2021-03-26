<template>
  <div class="score">
    <div class="stars">{{ currency }}<span>⭐️</span></div>
    <div class="starsps">{{ cps }}<span>⭐️</span>/seconde</div>
    <div class="total">total: {{ total }}kg</div>
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
    color: var(--clr-white)
    background: var(--clr-black)
    padding: 30px
    border-radius: var(--bor-ra)
  .stars
    font-size: 2rem
    span
      display: inline-block
      font-size: 3rem
      margin-left: -5px
      position: relative
      top: -5px
  .starsps
    font-size: .7rem
    span
      display: inline-block
      font-size: 1.2rem
      position: relative
      top: -2px
  .total
    margin-top: 20px
</style>