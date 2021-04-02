<template>
  <div class="nes-container is-rounded is-semi-white container-content">
    <p class="title">Fabriques à miam-miam</p>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div @click.prevent="$emit('buy', build); buildAdded(index);" v-for="(build, index) in builds" :key="build.name" class="build with-hover nes-container nes-pointer is-rounded" :class="{ disable: !build.buyable }" v-show="total >= build.visible" :ref='`build${index}`'>
        <div class="build__stars">
          <div class="build__stars-star" v-for="star in store.filter(s => s.name == build.name)[0].stars">
            <i class="nes-icon star"></i>
          </div>
        </div>
        <div class="build__avatar">
          <div class="build__avatar-img nes-container is-rounded" :style="{backgroundImage: `url(${require(`@/assets/images/builds/unites-production-${index+1}.png`)})` }"></div>
          <button class="nes-btn build__bonusx2" :class="{'is-success': currency >= build.price*2, 'is-error': currency < build.price*2}" data-tooltip="{ 'offset': 10, 'class': 'nes-btn' }" :title="`${build.name} deux fois plus efficace`" v-show="build.number % modulo == 0 && build.number != 0" @click.prevent.stop="buyBuildBonus(build, index)">
            <span class="fraise small-fraise fraise-bonus"></span>x2 
            <span class="build__bonusx2-price">
              {{this.renderNumeral(build.price*2)}}<span class="fraise fraise-bonus very-small-fraise"></span>
            </span>
          </button>
        </div>
        <div class="build-content">
          <p class="build__title">{{ build.name }}</p>
          <p class="build__price">{{ this.renderNumeral(build.price) }}<span class="price fraise"></span></p>
          <p class="build__ps">(+{{ this.renderNumeral(build.inc) }}<span class="price fraise"></span>/seconde)</p>
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
    store: Array,
    buy: Function,
    total: Number,
    currency: Number,
    cps: Number
  },
  data(){
    return{
      addBuild: null,
      modulo: 10
    }
  },
  methods: {
    buildAdded(index){
      this.addBuild = index
    },
    buyBuildBonus(build, index){
      if(this.currency < build.price*2) return
      build.inc *= 2
      this.store.filter(s => s.name == build.name)[0].stars += 1
      // display success here
      this.$emit('buy', build)
    },
    renderNumeral(val){
      if(val >= 1000000) return numeral(val).format('0.000a')
      if(val % 1 !== 0) return numeral(val).format('0,0.0')
      return numeral(val).format('0,0')
    }
  },
  mounted(){
    this.$timer = setInterval(() => {
      for (let index in this.$refs) {
        if(!this.$refs[index].classList.contains('disable') && !this.$refs[index].children[2].children[5].classList.contains('buyable')){
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
    color: var(--clr-pink)
    &.with-hover:hover
      background: var(--clr-white)
    &__stars
      position: absolute
      top: 2px
      right: 10px
      //background: red
      &-star
        display: inline-block
        margin-left: -15px
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
    &__bonusx2
      display: block
      width: 100%
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      &-price
        font-size: .5rem
        display: block
        margin-top: 15px
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
      font-weight: bold
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
    //pointer-events: none !important
    color: var(--clr-grey) !important
    .build__avatar-img, .fraise:not(.fraise-bonus)
      filter: grayscale(100%)
  .price
    width: 20px !important
    height: 20px !important
</style>