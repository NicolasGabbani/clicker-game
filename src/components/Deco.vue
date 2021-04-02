<template>
  <div>
    <div class="bottom-deco">
      <p class="grand-sage-balloon nes-balloon from-left animate__animated" :class="{ animate__fadeOut: displayTuto == false, animate__fadeIn: displayTuto }">
        Le but du jeu est de nourrir ta licorne pour qu'elle devienne aussi immense que possible ! <br><br>
        Aide-toi des fabriques à miam-miam pour la nourrir et clique sur son joli bidou !
      </p>
      <div class="grand-sage-content">
        <div class="grand-sage nes-pointer" @mouseover="displayTuto = true" @mouseleave="displayTuto = false"></div>
        <img :src="require('@/assets/images/deco/nuage.png')" alt="nuage" class="cloud">
      </div>
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
    z-index: 800

  .grand-sage-content
    transform: scale(.6)
    position: fixed
    bottom: 0
    left: 0
    
  .cloud
    position: fixed
    left: 20px
    bottom: 5px

  .grand-sage
    width: 228px
    height: 335px
    position: fixed
    z-index: 2
    left: 20px
    bottom: 105px
    background: url('~@/assets/images/deco/grand-sage-sprite.png') left center
    animation: grand-sage-animation 1s steps(20) infinite

  .grand-sage-balloon
    position: fixed
    left: 130px
    bottom: 140px
    z-index: 3
    width: 500px
    opacity: 0
    font-size: .8rem
</style>