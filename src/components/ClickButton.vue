<template>
  <button class="btn-score" @click.prevent="$emit('inc', 1, 1, 'button'); displayScore();">🦄</button>
</template>

<script>
export default {
  name: 'ClickButton',
  props: {
    inc: Function
  },
  methods: {
    displayScore(){
      const span = document.createElement('span')
      span.innerHTML = '+1'
      span.style.top = `${Math.floor(Math.random() * 99)}px`
      span.style.left = `${Math.floor(Math.random() * 99)}px`
      document.querySelector('.btn-score').appendChild(span)
      setTimeout(() => {
        document.querySelector('.btn-score').removeChild(span)
      }, 350);
    }
  }
}
</script>

<style lang="sass">
  .btn-score
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
    position: relative
    &:active
      transform: scale(.9) !important
    &:hover
      transform: scale(1.05)
    span
      display: block
      position: absolute
      font-size: 1.5rem
      font-family: var(--font-press)
      color: var(--clr-white)
      text-shadow: 1px 1px 1px var(--clr-black), -1px 1px 1px var(--clr-black), 1px -1px 1px var(--clr-black), -1px -1px 1px var(--clr-black), 2px 2px 2px var(--clr-black), -2px 2px 2px var(--clr-black), 2px -2px 2px var(--clr-black), -2px -2px 2px var(--clr-black)
      animation: fadeOutTop .35s ease
</style>
