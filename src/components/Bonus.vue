<template>
  <div class="bonus-content" :style="{top: top, left: left}">
    <button class="bonus" @click.prevent.once="addBonus" v-show="!haveBonus">⭐️</button>
    <span class="bonus-added" :class="{fadeout: haveBonus}"></span>
  </div>
</template>

<script>
export default {
  name: 'Bonus',
  props: {
    inc: Function,
    top: String,
    left: String,
    interval: Number
  },
  data(){
    return {
      haveBonus: false,
      minBonus: -100,
      maxBonus: 1000
    }
  },
  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    addBonus(){
      const randomNumber = this.randomIntFromInterval(this.minBonus, this.maxBonus)
      const bonusAdded = document.querySelector('.bonus-added')
      this.$emit('inc', randomNumber, 1, 'bonus')
      this.haveBonus = true
      bonusAdded.innerHTML = randomNumber > 0 ? `+${randomNumber}⭐️` : `${randomNumber}⭐️`
      setTimeout(() => {
        this.haveBonus = false
      }, this.interval);
    }
  }
}
</script>

<style lang="sass">
  .bonus-content
    position: fixed
    z-index: 999
  .bonus
    all: unset
    width: 64px
    height: 64px
    border-radius: 50%
    background: var(--clr-black)
    box-shadow: 0 0 10px 0 var(--clr-black)
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    font-size: 2.5rem
  .bonus-added
    display: none
    color: var(--clr-white)
    text-shadow: 1px 1px 1px var(--clr-black), -1px 1px 1px var(--clr-black), 1px -1px 1px var(--clr-black), -1px -1px 1px var(--clr-black), 2px 2px 2px var(--clr-black), -2px 2px 2px var(--clr-black), 2px -2px 2px var(--clr-black), -2px -2px 2px var(--clr-black)
    &.fadeout
      display: block
      animation: fadeOutTop 1.5s ease forwards
  
</style>
