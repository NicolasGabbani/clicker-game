<template>
  <div class="menu">
    <button class="nes-btn is-primary" @click.prevent="$emit('save')">save game</button>
    <button class="nes-btn is-error" @click.prevent="$emit('reset')">reset game</button>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    reset: Function,
    save: Function
  }
}
</script>

<style lang="sass">
  .menu
    margin-bottom: 20px
    display: flex
    justify-content: space-between
</style>
