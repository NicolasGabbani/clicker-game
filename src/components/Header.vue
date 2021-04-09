<template>
  <img :src="require('@/assets/images/logos/logo_superlicorne.png')" alt="logo superlicorne" class="super-licorne">
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="sass">
  .super-licorne
    position: fixed
    top: 20px
    left: 20px
    width: 160px
</style>
