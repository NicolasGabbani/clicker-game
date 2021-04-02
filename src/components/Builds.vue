<template>
  <div class="nes-container is-rounded is-semi-white container-content">
    <p class="title">Fabriques à miam-miam</p>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div @click.prevent="$emit('buy', build); buildAdded(index);" v-for="(build, index) in builds" :key="build.name" class="build with-hover nes-container nes-pointer is-rounded" :class="{ disable: !build.buyable }" v-show="total >= build.visible" :ref='`build${index}`'>
        <div class="build__avatar">
          <div class="build__avatar-img nes-container is-rounded" :style="{backgroundImage: `url(${require(`@/assets/images/builds/unites-production-${index+1}.png`)})` }"></div>
        </div>
        <div class="build-content">
          <p class="build__title">{{ build.name }}</p>
          <p class="build__price">{{ build.price }}<span class="price fraise"></span></p>
          <p class="build__ps">(+{{ build.inc }}<span class="price fraise"></span>/seconde)</p>
          <p class="build__number animate__animated" :class="{animate__tada: index == addBuild}">{{ build.number }}</p>
          <p class="build__percent">({{ Math.floor((build.inc*build.number * 100) / cps) || 0 }}% du total par seconde)</p>
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
  data(){
    return{
      addBuild: null
    }
  },
  methods: {
    buildAdded(index){
      this.addBuild = index
    }
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
  watch: {
    addBuild: function(val){
      if(this.$timer){
        clearTimeout(this.$timer)
      }
      this.$timer = setTimeout(() => {
        this.addBuild = null
      }, 500);
    }
  }
}
</script>

<style lang="sass">
  .build
    position: relative !important
    margin-bottom: 20px !important
    padding: .5rem 1.5rem !important
    font-size: .7rem
    min-height: 105px
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
      width: 90%
    &__price, &__ps
      display: inline-block
      vertical-align: baseline
    &__ps
      font-size: .7rem
      margin-left: 15px
    &__number
      position: absolute
      bottom: -20px
      right: 5px
      font-size: 2rem
      color: var(--clr-grey)
    &__percent
      margin-bottom: 0
      font-size: .6rem
    &:last-child
      margin-bottom: 5px !important
  .disable
    pointer-events: none !important
    color: var(--clr-red) !important
  .price
    width: 20px !important
    height: 20px !important
</style>