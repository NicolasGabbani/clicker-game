<template>
  <div>
    <div class="bottom-deco">
      <div class="grand-sage"></div>
      <img :src="require('@/assets/images/deco/sol.png')" alt="sol" class="sol">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Deco'
}
</script>

<style lang="sass">
  .bottom-deco
    position: fixed
    bottom: 0
    left: 0
    right: 0
    width: 100%
    img
      width: 100%

  .grand-sage
    width: 228px
    height: 335px
    position: fixed
    z-index: -1
    left: 20px
    bottom: 5px
    background: url('~@/assets/images/deco/grand-sage-sprite.png') left center
    animation: grand-sage-animation 1s steps(20) infinite
</style>