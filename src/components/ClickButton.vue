<template>
  <button class="btn" @click.prevent="$emit('inc')">🦄</button>
</template>

<script>
export default {
  name: 'ClickButton',
  props: {
    inc: Function
  }
}
</script>

<style lang="sass">
  .btn
    font-size: 10rem
    border: none
    outline: none
    cursor: pointer
    transition: all var(--tr-du) linear
    line-height: 1
    background: var(--clr-white)
    padding: 12px
    border-radius: var(--bor-ra)
    margin-bottom: 30px
    &:active
      transform: scale(.9)
</style>