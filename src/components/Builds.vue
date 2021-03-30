<template>
  <div class="nes-container is-rounded is-semi-white container-content">
    <p class="title">Bâtiments</p>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div @click.prevent="$emit('buy', build)" v-for="(build, index) in builds" :key="build.name" class="build nes-container nes-pointer is-rounded" :class="{ disable: !build.buyable }" v-show="total <= build.visible" :ref='`build${index}`'>
        <div class="build__avatar">
          <div class="build__avatar-img" :style="{backgroundImage: `url(${require('@/assets/images/icons/flan.png')})` }"></div>
        </div>
        <div class="build-content">
          <p class="build__title">{{ build.name }}</p>
          <p class="build__price">{{ build.price }}<span class="price">⭐️</span></p>
          <p class="build__ps">+{{ build.inc }}<span class="price">⭐️</span>/seconde</p>
          <p class="build__price"></p>
          <p class="build__number">{{ build.number }}</p>
          <p class="build__percent">{{ Math.floor((build.inc*build.number * 100) / cps) || 0 }}% du total par seconde</p>
          <p style="display: none" :class="{buyable: build.buyable}">buyable: {{build.buyable ? 'oui' : 'non' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'simplebar'
import 'simplebar/dist/simplebar.css'
export default {
  name: 'Builds',
  props: {
    builds: Array,
    buy: Function,
    total: Number,
    cps: Number
  },
  mounted(){
    this.$timer = setInterval(() => {
      for (let index in this.$refs) {
        if(!this.$refs[index].classList.contains('disable') && !this.$refs[index].children[1].children[6].classList.contains('buyable')){
          this.$refs[index].classList.add('disable')
          console.log('triche')
        }
      }
    }, 100);
  },
  unmounted() {
    clearInterval(this.$timer)
  },
}
</script>

<style lang="sass">
  .build
    position: relative !important
    margin-bottom: 20px !important
    font-size: .7rem
    display: grid
    grid-template-columns: 90px 1fr
    background: rgba(255,255,255,.1)
    backdrop-filter: blur(10px)
    user-select: none
    &__avatar
      margin-left: -15px
      text-align: center
      &-img
        width: 90px
        height: 90px
        border-radius: 50%
        border: 4px solid var(--clr-black)
        background-repeat: no-repeat
        background-size: cover
        background-position: center center
    &__title
      font-size: .8rem
    &__number
      position: absolute
      bottom: 0
      right: 10px
      font-size: 2rem
      color: var(--clr-grey)
    &__percent
      margin-bottom: 0
      font-size: .4rem
    &:last-child
      margin-bottom: 5px !important
  .disable
    pointer-events: none !important
    color: red !important
  .price
    display: inline-block
    position: relative
    top: -4px
</style>