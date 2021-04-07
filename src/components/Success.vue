<template>
  <div class="nes-container is-rounded is-semi-white container-content">
    <p>Succès</p>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div class="success-content">
        <div @mouseenter="hideNewSucc(succ)" class="success nes-container is-rounded is-dark" v-for="succ in success" :key="succ.succ">
          <tippy :followCursor="true" placement="top-start" duration="0">
            <span class="success__tooltip" v-show="succ.done"></span>
            <template #content>
              <div class="nes-btn">{{succ.name}}</div>
            </template>
          </tippy>
          <span class="new-success-radar" v-if="succ.new"></span>
          <span class="success-unlock" v-if="succ.done">
            <img :src="require(`@/assets/images/icons/coupe.png`)" alt="coupe">
          </span>
          <span class="success-lock" v-else>
            ?
          </span>
        </div>
        <div @mouseenter="hideNewSucc(succ)" class="success nes-container is-rounded is-dark" v-for="succ in buildsSuccess" :key="succ.buildName">
          <tippy :followCursor="true" placement="top-start" duration="0">
            <span class="success__tooltip" v-show="succ.done"></span>
            <template #content>
              <div class="nes-btn">{{succ.buildName}} débloqué !</div>
            </template>
          </tippy>
          <span class="new-success-radar" v-if="succ.new"></span>
          <span class="success-unlock" v-if="succ.done">
            <img :src="require(`@/assets/images/icons/coupe.png`)" alt="coupe">
          </span>
          <span class="success-lock" v-else>
            ?
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  props: {
    success: Array,
    buildsSuccess: Array,
    checkSucc: Function
  },
  methods: {
    hideNewSucc(succ){
      if(!succ.new) return
      succ.new = false
      this.$emit('checkSucc')
    }
  }
}
</script>

<style lang="sass">
  .success-content
    display: grid
    grid-gap: 10px
    grid-template-columns: repeat( auto-fit, minmax(120px, 1fr) )
  .success
    display: flex
    justify-content: center
    align-items: center
    position: relative
    aspect-ratio: 1
    min-height: 110px
    &-unlock
      img
        width: 100%
    &__tooltip
      display: block
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: 99
</style>
