<template>
  <div class="screenshot" :class="decorClass || decorArray.filter(d => d.get)[currentDecor]?.cls">
    <button class="closed nes-container is-white is-rounded" @click.prevent="$emit('toggleScreenshot'); $emit('closeOptions')"><i class="nes-icon close is-small"></i></button>
    <div class="screenshot__logo">
      <img :src="require('@/assets/images/logos/logo_superlicorne.png')" alt="logo superlicorne.com">
      <a class="nes-container is-dark is-rounded" href="http://superlicorne.com">superlicorne.com</a>
    </div>
    <div class="screenshot__name nes-badge"><span class="is-dark">{{name}}</span></div>
    <div class="screenshot__stats">
      <div class="nes-container is-semi-white is-rounded is-centered">
        <p class="title">STATS</p>
        <span class="screenshot-stat">score total :{{total}}<span class="fraise small-fraise"></span></span>
        <span class="screenshot-stat">score actuel :{{currency}}<span class="fraise small-fraise"></span></span>
        <span class="screenshot-stat">{{cps}}<span class="fraise small-fraise"></span>/seconde</span>
        <span class="screenshot-stat">Tu joues depuis {{time}}</span>
        <span class="screenshot-stat">Tu as {{success.filter(succ => succ.done).length + buildsSuccess.filter(succ => succ.done).length}} succès</span>
      </div>
    </div>
    <div class="screenshot__licorne">
      <div class="licorne" :class="clsLicorne || decorArray.filter(d => d.get)[currentLicorne]?.cls"></div>
    </div>
    <div class="screenshot__builds">
      <div class="nes-container is-semi-white is-rounded is-centered">
        <p class="title">Fabriques à miam-miam</p>
        <div class="screenshot__builds-grid">
          <div v-for="(build, index) in builds.filter(b => b.number > 0)" :key="build.name" class="screenshot__builds-build nes-container is-rounded" :ref='`build${index}`'>
            <div class="screenshot__builds-img" :style="{backgroundImage: `url(${require(`@/assets/images/builds/unites-production-${index+1}.png`)})` }"></div>
            <span 
              class="nes-text" 
              :class="{
                'is-warning': build.stars == 1,
                'is-primary': build.stars == 2,
                'is-success': build.stars == 3
              }"
            >
              x{{build.number}}
            </span>
          </div>
        </div>
        <div v-if="!builds.filter(b => b.number > 0).length">Pas de fabriques à miam-miam...</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Screenshot',
  props: {
    gameStart: Number,
    decorClass: String,
    currentDecor: Number,
    decorArray: Array,
    clsLicorne: String,
    currentLicorne: Number,
    total: String,
    currency: String,
    cps: String,
    builds: Array,
    success: Array,
    buildsSuccess: Array,
    name: String,
    toggleScreenshot: Function,
    closeOptions: Function
  },
  data() {
    return {
      time: moment(this.gameStart).locale('fr').fromNow(true)
    }
  }
}
</script>

<style lang="sass" scoped>
  .screenshot
    position: fixed !important
    top: 0
    left: 0
    width: 100%
    height: 100vh
    z-index: 9999999

    padding: 20px

    display: grid
    grid-template-columns: repeat(3, 1fr)
    > div
      display: flex
      justify-content: center
      align-items: flex-start
      > .nes-container
        width: 100%
    &__name
      position: absolute
      left: 50%
      top: 20px
      transform: translateX(-50%)
      font-size: 2rem
    &__stats
      .title
        margin-bottom: 15px
      .screenshot-stat
        display: block
        margin-bottom: 15px
        font-size: 1.1rem
        &:last-child
          margin-bottom: 0
    &__builds
      &-grid
        display: grid
        grid-gap: 15px
        grid-template-columns: repeat( auto-fit, minmax(100px, 1fr) )
      &-build
        display: flex
        justify-content: flex-start
        align-items: center
        padding: 0 !important
        span
          font-size: .8rem
          display: block
          margin-left: 10px
      &-img
        width: 40px
        height: 40px
        background-repeat: no-repeat
        background-size: cover
        background-position: center center
    &__logo
      position: fixed
      bottom: 20px
      left: 20px
      display: block !important
      img
        display: block
        width: 200px
        margin: 0 auto
      a
        display: block
  .licorne
    width: 450px
    align-self: center
  .closed
    top: 10px
    right: 10px
    z-index: 100
</style>