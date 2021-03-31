<template>
  <div>
    <div class="bonus-content nes-pointer" :style="{top: bonusTop, left: bonusLeft}" v-if="haveBonus">
      <button class="bonus nes-pointer" @click.prevent.once="addRandomBonus" v-show="!bonusClicked">⭐️</button>
      <span class="bonus-added" :class="{fadeout: bonusClicked}"></span>
    </div>
    <div class="buff" v-show="bonusCpsClicked">
      <div class="nes-container is-dark is-rounded is-centered">
        CPSx2
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bonus',
  props: {
    inc: Function,
    cps: Function,
    cpsNum: Number,
    top: String,
    left: String,
    interval: Number
  },
  data(){
    return {
      bonusClicked: false,
      bonusCpsClicked: false,
      minBonus: -100,
      maxBonus: 1000,
      haveBonus: false,
      bonusMinInterval: 1000,
      bonusMaxInterval: 5000,
      intervalBonus: this.randomIntFromInterval(this.bonusMinInterval, this.bonusMaxInterval),
      bonusTop: `${Math.floor(Math.random() * 99)}%`,
      bonusLeft: `${Math.floor(Math.random() * 99)}%`,
      bonusDisplayedTimer: 5000,
      randomFunc: [this.addBonusInc, this.addBonusCps]
    }
  },
  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    addRandomBonus(){
      const random = Math.floor(Math.random() * this.randomFunc.length)
      this.randomFunc[random].call()
    },
    addBonusInc(){
      const randomNumber = this.randomIntFromInterval((this.minBonus * this.cpsNum) + this.minBonus, (this.maxBonus * this.cpsNum) + this.maxBonus)
      this.$emit('inc', randomNumber, 1, 'bonus')
      this.bonusClicked = true
      document.querySelector('.bonus-added').innerHTML = randomNumber > 0 ? `+${randomNumber}⭐️` : `${randomNumber}⭐️`
      setTimeout(() => {
        this.bonusClicked = false
      }, this.bonusDisplayedTimer);
    },
    addBonusCps(){
      this.$emit('cps', 2)
      this.$emit('inc', 0, 1, 'bonus')
      this.$emit('bonusCpsClicked', this.bonusDisplayedTimer)
      this.bonusClicked = true
      this.bonusCpsClicked = true
      document.querySelector('.bonus-added').innerHTML = 'CPSx2'
      let bonusTime = this.bonusDisplayedTimer / 1000
      document.querySelector('.buff > .nes-container > span').innerHTML = bonusTime 
      const bonusTimer = setInterval(() => {
        --bonusTime
        document.querySelector('.buff > .nes-container > span').innerHTML = bonusTime
        if(bonusTime == -1) {
          clearInterval(bonusTimer)
          this.bonusCpsClicked = false
        }
      }, 1000);
      setTimeout(() => {
        this.bonusClicked = false
        this.$emit('cps')
      }, this.bonusDisplayedTimer)
    },
    randomBonusInit() {
      this.intervalBonus = this.randomIntFromInterval(this.bonusMinInterval, this.bonusMaxInterval)
      this.$randomBonus = setTimeout(() => {
        (this.bonusTop = `${Math.floor(Math.random() * 99)}%`),
        (this.bonusLeft = `${Math.floor(Math.random() * 99)}%`);
        this.haveBonus = true;
        this.$bonusTimer = setTimeout(() => {
          clearTimeout(this.$randomBonus);
          this.haveBonus = false;
          this.randomBonusInit();
        }, this.bonusDisplayedTimer);
      }, this.intervalBonus);
    }
  },
  mounted(){
    this.randomBonusInit();
  },
  unmounted() {
    clearTimeout(this.$randomBonus)
  },
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
  .buff
    position: fixed
    top: 1%
    left: 1%
    width: 150px
    span
      display: block
      margin-top: 10px
</style>
