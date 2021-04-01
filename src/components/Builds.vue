<template>
  <div class="nes-container is-rounded is-semi-white container-content">
    <p class="title">Bâtiments</p>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div @click.prevent="$emit('buy', build)" v-for="(build, index) in builds" :key="build.name" class="build with-hover nes-container nes-pointer is-rounded" :class="{ disable: !build.buyable }" v-show="total >= build.visible" :ref='`build${index}`'>
        <div class="build__avatar">
          <div class="build__avatar-img nes-container is-rounded" :style="{backgroundImage: `url(${require('@/assets/images/icons/flan.png')})` }"></div>
        </div>
        <div class="build-content">
          <p class="build__title">{{ build.name }}</p>
          <p class="build__price">{{ build.price }}<span class="price">⭐️</span></p>
          <p class="build__ps">+{{ build.inc }}<span class="price">⭐️</span>/seconde</p>
          <p class="build__number">{{ build.number }}</p>
          <p class="build__percent">{{ Math.floor((build.inc*build.number * 100) / cps) || 0 }}% du total par seconde</p>
          <p style="display: none" :class="{buyable: build.buyable}"></p>
        </div>
      </div>
      <div v-for="build in builds" :key="build.name + 'locked'" v-show="total < build.visible" class="build nes-container is-dark is-rounded">
        <div class="build__avatar">
          <div class="build__avatar-img nes-container is-dark is-rounded container-centered">?</div>
        </div>
        <div class="build-content container-centered build-placeholder">?</div>
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
        if(!this.$refs[index].classList.contains('disable') && !this.$refs[index].children[1].children[5].classList.contains('buyable')){
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
    padding: .5rem 1.5rem !important
    font-size: .7rem
    min-height: 137px
    //display: grid
    //grid-template-columns: 120px 1fr
    background: rgba(255,255,255,.1)
    backdrop-filter: blur(10px)
    transition: all var(--tr-du)
    &.with-hover:hover
      background: var(--clr-white)
    &__avatar
      text-align: center
      position: absolute
      top: -7px
      left: -8px
      &-img
        width: 90px
        height: 90px
        background-repeat: no-repeat
        background-size: cover
        background-position: center center
    &-content
      margin-left: 90px
      &.build-placeholder
        margin-left: 0
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
    &__title
      font-size: 1rem
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