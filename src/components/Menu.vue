<template>
  <div class="nes-container is-semi-white is-rounded popup">
    <p class="title">Options</p>
    <button class="closed nes-container is-white is-rounded" @click.prevent="$emit('closeOptions')"><i class="nes-icon close is-small"></i></button>
    <div class="menu">
      <button class="nes-btn is-primary" @click.prevent="$emit('save')">save game</button>
      <button class="nes-btn is-error" @click.prevent="$emit('reset')">reset game</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    reset: Function,
    save: Function,
    closeOptions: Function
  }
}
</script>

<style lang="sass">
  .popup
    width: 30vw
    position: fixed
    top: 50%
    left: 50%
    z-index: 999
    transform: translate(-50%, -50%)
  .menu
    margin-bottom: 20px
    display: flex
    justify-content: space-between
    position: relative

  .closed
    padding: 0 4px !important
    position: absolute
    top: -20px
    right: -10px
</style>
