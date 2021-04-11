<template>
  <div class="nes-container is-rounded is-semi-white container-content">
    <p class="title">Fabriques à miam-miam</p>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div v-for="(build, index) in builds" :key="build.name" class="build with-hover nes-container is-rounded" :class="{ disable: !build.buyable }" v-show="total >= build.visible" :ref='`build${index}`'>
        <div class="build__stars">
          <div class="build__stars-star" v-for="star in build.stars">
            <i class="nes-icon star"></i>
          </div>
        </div>
        <div class="build__avatar">
          <div class="build__avatar-img nes-container is-rounded" :style="{backgroundImage: `url(${require(`@/assets/images/builds/unites-production-${index+1}.png`)})` }"></div>
        </div>
        <div class="build-content">
          <p class="build__title">{{ build.name }}</p>
          <p class="build__number animate__animated" :class="{animate__tada: index == addBuild}">{{ build.number }}</p>
          <p class="build__ps">+{{ this.renderNumeral(build.inc) }}<span class="price fraise"></span>/seconde</p>
          <p style="display: none" :class="{buyable: build.buyable}"></p>

          <div class="build-btn-content container-grid-space">
            <button class="nes-btn build-btn-info" @click.prevent.stop="openInfo(index)">voir info</button>
            <button class="nes-btn build-btn-buy" :class="{'is-success': build.buyable, 'is-error': !build.buyable, 'btn-disable': !build.buyable}" @click.prevent.stop="$emit('buyBuild', build); buildAdded(index);">{{ this.renderNumeral(build.price) }}<span class="price fraise very-small-fraise fraise-bonus"></span></button>
          </div>
          
          <div class="build-info nes-container is-white is-rounded" v-show="index == infoClose">
            <p class="title">Info</p>
            <button class="nes-btn build-info-close" @click.prevent.stop="closeInfo"><i class="nes-icon close is-small"></i></button>
            <div class="lists">
              <ul class="nes-list is-disc">
                <li>{{ Math.floor((build.inc*build.number * 100) / cps) || 0 }}% du total par seconde</li>
                <li>{{ renderNumeral(build.total) }}<span class="fraise small-fraise fraise-bonus"></span>total depuis le début</li>
              </ul>
            </div>
          </div>
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
    buyBuild: Function,
    total: Number,
    cps: Number
  },
  data(){
    return{
      addBuild: null,
      modulo: 10,
      infoClose: null
    }
  },
  methods: {
    buildAdded(index){
      this.addBuild = index
    },
    openInfo(index){
      this.infoClose = index
    },
    closeInfo(){
      this.infoClose = null
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
        if(!this.$refs[index].classList.contains('disable') && !this.$refs[index].children[2].children[3].classList.contains('buyable')){
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
    color: var(--clr-black)
    &__stars
      position: absolute
      bottom: 10px
      left: 18px
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
    &__number
      margin-bottom: 0
      position: absolute
      top: 0
      right: 20px
      font-size: 2rem
      color: var(--clr-grey)
    &__percent
      margin-bottom: 0
      font-size: .6rem
    &-btn-content
      width: 100%
    &-info
      position: absolute
      top: -8px
      left: -8px
      right: -8px
      bottom: -8px
      color: var(--clr-black) !important
      .nes-list
        margin-left: 10px
        li
          margin-bottom: 5px
      &-close
        position: absolute
        top: 8px
        right: 8px
    &:last-child
      margin-bottom: 5px !important
  .disable
    color: var(--clr-grey) !important
    .build__avatar-img, .fraise:not(.fraise-bonus)
      filter: grayscale(100%)
  .btn-disable
    pointer-events: none !important
  .build-btn-buy
    grid-column: span 2
  .price
    width: 20px !important
    height: 20px !important
</style>