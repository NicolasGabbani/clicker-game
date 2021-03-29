<template>
  <button class="btn-score" @click.prevent="$emit('inc', 1, 1, 'button'); displayScore();" :class="classBg">
    <img :src="require('@/assets/images/icons/licorne.png')" alt="licorne">
  </button>
</template>

<script>
export default {
  name: 'ClickButton',
  props: {
    inc: Function,
    classBg: Object
  },
  methods: {
    displayScore(){
      const span = document.createElement('span')
      span.innerHTML = '+1'
      span.style.top = `${Math.floor(Math.random() * 99)}%`
      span.style.left = `${Math.floor(Math.random() * 99)}%`
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
    //background: var(--clr-white)
    background: none
    outline: none !important
    padding: 12px
    position: relative
    width: 50%
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
    &.l3tsg01
      //background: pink
    &.cb0nc4
      //background: purple
    img
      width: 100%
</style>
