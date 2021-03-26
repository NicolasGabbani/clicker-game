<template>
  <div class="menu">
    <button class="btn-menu" @click.prevent="$emit('reset')">reset game</button>
    <button class="btn-menu" @click.prevent="$emit('save')">save game</button>
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
</style>
