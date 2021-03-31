<template>
  <div>
    <div class="bottom-deco">
      <p class="grand-sage-balloon nes-balloon from-left animate__animated" :class="{ animate__fadeOut: displayTuto == false, animate__fadeIn: displayTuto }">
        Le but du jeu est de nourrir ta licorne pour qu'elle devienne aussi immense que possible ! <br><br>
        Aide-toi des bâtiments pour la nourrir et clique sur son joli bidou !
      </p>
      <div class="grand-sage nes-pointer" @mouseover="displayTuto = true" @mouseleave="displayTuto = false"></div>
      <img :src="require('@/assets/images/deco/sol.png')" alt="sol" class="sol">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Deco',
  data(){
    return {
      displayTuto: null
    }
  }
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

  .grand-sage-balloon
    position: fixed
    left: 230px
    bottom: 160px
    width: 500px
    opacity: 0
</style>