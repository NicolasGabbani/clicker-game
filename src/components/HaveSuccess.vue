<template>
  <div class="have_success">
    <div>{{success}}</div>
  </div>
</template>

<script>
export default {
  name: 'HaveSuccess',
  props: {
    success: String
  }
}
</script>

<style lang="sass">
  .have_success
    position: fixed
    bottom: 10px
    left: 50%
    transform: translateX(-50%)
    background: var(--clr-black)
    padding: 70px
    border-radius: var(--bor-ra)
    color: var(--clr-white)
    font-size: 1.7rem
    border: 2px solid var(--clr-white)
    display: flex
    justify-content: center
    align-items: center
    text-align: center
</style>
