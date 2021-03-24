<template>
  <div class="score">
    <div class="stars">{{ currency }} <span>⭐️</span></div>
    <div class="starsps">{{ tps }} <span>⭐️</span>/seconde</div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    currency: String,
    tps: String
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
      margin-left: -15px
      margin-top: -5px
  .starsps
    font-size: .7rem
    span
      display: inline-block
      font-size: 1.2rem
      margin-left: -5px
      margin-top: -5px
</style>