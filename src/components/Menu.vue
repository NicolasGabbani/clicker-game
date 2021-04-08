<template>
  <div class="nes-container is-semi-white is-rounded popup">
    <p class="title">Options</p>
    <button class="closed nes-container is-white is-rounded" @click.prevent="$emit('closeOptions')"><i class="nes-icon close is-small"></i></button>
    <div class="menu">
      <button class="nes-btn is-primary" @click.prevent="$emit('save')">save game</button>
      <button class="nes-btn is-error" @click.prevent="$emit('reset')">reset game</button>
    </div>
    <div class="menu-seperate" v-show="decor.filter(d => d.get).length">
      <p class="title">Choisis ton fond d'écran :</p>
      <div class="menu-grid">
        <div class="nes-btn" :class="{'is-primary': currentDecor == index || (index == decor.filter(d => d.get).length - 1 && currentDecor == -1)}" v-for="(d, index) in decor.filter(d => d.get)" @click="this.$emit('selectDecor', index)">
          {{index}}
        </div>
      </div>
    </div>

    <div class="menu-seperate" v-show="decor.filter(d => d.licorne).length">
      <p class="title">Choisis ta licorne :</p>
      <div class="menu-grid">
        <div class="nes-btn" :class="{'is-primary': currentLicorne == index || (index == decor.filter(d => d.licorne).length - 1 && currentLicorne == -1)}" v-for="(d, index) in decor.filter(d => d.licorne)" @click="this.$emit('selectLicorne', index)">
          {{index}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    reset: Function,
    save: Function,
    closeOptions: Function,
    decor: Array,
    currentDecor: Number,
    selectDecor: Function,
    currentLicorne: Number,
    selectLicorne: Function
  }
}
</script>

<style lang="sass">
  .popup
    width: 30vw
    height: calc(100vh - 50px)
    position: fixed
    top: 20px
    left: 20px
    z-index: 999
  .menu
    margin-bottom: 20px
    display: flex
    justify-content: space-between
    position: relative
    &-seperate
      padding-top: 20px
    &-grid
      display: grid
      grid-gap: 15px
      grid-template-columns: repeat(5, 1fr)

  .closed
    padding: 0 4px !important
    position: absolute
    top: -20px
    right: -10px
</style>
