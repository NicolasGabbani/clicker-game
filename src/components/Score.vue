<template>
  <div class="nes-container is-rounded is-dark is-semi-dark score">
    <div style="display:none">
      <div>{{ Math.round(totalNum * 100 / Number.MAX_SAFE_INTEGER) }}%</div>
      <progress class="nes-progress" :value="totalNum" :max="Number.MAX_SAFE_INTEGER"></progress>
    </div>
    
    <div class="currency">{{ currency }}<span class="fraise" @click="$emit('scoreFraiseSucc')"></span></div>
    <div class="cps">{{ cps }}<span class="fraise"></span>/seconde</div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    currency: String,
    cps: String,
    totalNum: Number,
    scoreFraiseSucc: Function
  }
}
</script>

<style lang="sass">
  .score
    position: relative
    z-index: 4
  .currency
    font-size: 2rem
    span
      margin-left: 14px
  .cps
    font-size: .7rem
    span
      width: 30px
      height: 30px
      margin-left: 10px
  .total
    margin-top: 20px
</style>