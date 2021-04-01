<template>
  <div class="have_success">
    <div class="nes-container is-rounded is-centered is-dark animate__animated animate__tada">
      <div>{{success?.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HaveSuccess',
  props: {
    success: Object
  }
}
</script>

<style lang="sass">
  .have_success
    width: 30vw
    position: fixed
    bottom: 100px
    left: 50%
    z-index: 999
    transform: translateX(-50%)
</style>
