<template>
  <div>
    <div class="bonus-content nes-pointer animate__animated animate__swing animate__infinite" :style="{top: bonusTop, left: bonusLeft}" v-if="haveBonus">
      <button class="bonus nes-pointer" @click.prevent.once="addRandomBonus" v-show="!bonusClicked"></button>
      <span class="bonus-added" :class="{fadeout: bonusClicked}"></span>
    </div>

    <div class="buff" v-show="bonusCpsClicked">
      <div class="nes-container is-dark is-rounded is-centered">
        <div><span class="buff-title fraise"></span>x2</div>
        <span></span>
      </div>
    </div>

    <div class="bonus-fraise container-centered-col" v-show="bonusFraise">
      <img :src="require('@/assets/images/icons/rayon.png')" alt="rayon" class="rayon">
      <div class="bonus-fraise__timer nes-container is-white is-rounded">5</div>
      <div class="bonus-fraise__fraise nes-pointer" @click.prevent="bonusFraiseClick"></div>
      <progress class="nes-progress is-primary bonus-fraise__progress" :value="bonusFraiseProgress" max="100"></progress>
    </div>
    <div class="bonus-fraise bonus-fraise-result container-centered" v-if="bonusFraiseResult != ''">
      <div class="nes-container is-rounded is-centered is-white animate__animated animate__rubberBand" v-show="bonusFraiseResult == 'win'">
        <h2>Excellent !</h2>
        +{{renderNumeral(cpsNum * 100)}}<span class="fraise small-fraise"></span>
      </div>
      <div class="nes-container is-rounded is-centered is-white animate__animated animate__shakeX" v-show="bonusFraiseResult == 'lose'">
        <h2>Perdu...</h2>
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
    interval: Number,
    BonusFraiseSucc: Function
  },
  data(){
    return {
      bonusClicked: false,
      bonusCpsClicked: false,
      bonusFraise: false,
      bonusFraiseProgress: 0,
      bonusFraiseResult: '',
      bonusFraiseInterval: null,
      minBonus: -100,
      maxBonus: 500,
      haveBonus: false,
      bonusMinInterval: 15000,
      bonusMaxInterval: 30000,
      intervalBonus: this.randomIntFromInterval(this.bonusMinInterval, this.bonusMaxInterval),
      bonusTop: `${Math.floor(Math.random() * 99)}%`,
      bonusLeft: `${Math.floor(Math.random() * 99)}%`,
      bonusDisplayedTimer: 5000,
      randomFunc: [this.addBonusInc, this.addBonusCps, this.addBonusFraise],
      clickSound: new Audio(require('../assets/sounds/click.mp3'))
    }
  },
  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    addRandomBonus(){
      this.clickSound.currentTime = 0
      this.clickSound.volume = .2
      this.clickSound.play()
      document.querySelector('.bonus-content').classList.remove('animate__animated')
      const random = Math.floor(Math.random() * this.randomFunc.length)
      this.randomFunc[random].call()
    },
    addBonusInc(){
      const randomNumber = this.randomIntFromInterval((this.minBonus * this.cpsNum /2) + this.minBonus, (this.maxBonus * this.cpsNum /2) + this.maxBonus)
      this.$emit('inc', randomNumber, 1, 'bonus')
      this.bonusClicked = true
      document.querySelector('.bonus-added').innerHTML = randomNumber > 0 ? `+${this.renderNumeral(randomNumber)}<span class="fraise"></span>` : `${this.renderNumeral(randomNumber)}<span class="fraise"></span>`
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
      document.querySelector('.bonus-added').innerHTML = 'BONUS !'
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
    addBonusFraise(){
      this.bonusClicked = true
      this.bonusFraise = true
      this.bonusFraiseResult = ''
      clearInterval(this.bonusFraiseInterval)
      document.querySelector('.bonus-added').innerHTML = 'MEGA BONUS !'
      let bonusTime = this.bonusDisplayedTimer / 1000
      document.querySelector('.bonus-fraise > .bonus-fraise__timer').innerHTML = bonusTime 
      this.bonusFraiseInterval = setInterval(() => {
        --bonusTime
        document.querySelector('.bonus-fraise > .bonus-fraise__timer').innerHTML = bonusTime
        if(bonusTime == -1) {
          clearInterval(this.bonusFraiseInterval)
          this.bonusClicked = false
          this.bonusFraise = false
          this.bonusFraiseProgress = 0
          this.bonusFraiseResult = 'lose'
        }
      }, 1000);
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
    },
    bonusFraiseClick(){
      this.clickSound.currentTime = 0
      this.clickSound.volume = .2
      this.clickSound.play()
      if(this.bonusFraiseProgress == 100){
        this.bonusFraise = false
        this.bonusClicked = false
        this.bonusFraiseProgress = 0
        this.bonusFraiseResult = 'win'
        clearInterval(this.bonusFraiseInterval)
        this.$emit('inc', this.cpsNum * 100, 1, 'bonus')
        this.$emit('BonusFraiseSucc')
      }
      this.bonusFraiseProgress += 5
    },
    renderNumeral(val){
      if(val >= 1000000) return numeral(val).format('0a')
      return numeral(val).format('0,0')
    }
  },
  mounted(){
    this.randomBonusInit();
  },
  unmounted() {
    clearTimeout(this.$randomBonus)
  },
  watch: {
    bonusFraiseResult: function(val){
      if(this.bonusFraiseTimer){
        clearTimeout(this.bonusFraiseTimer)
      }
      if(val != ''){
        this.bonusFraiseTimer = setTimeout(() => {
          this.bonusFraiseResult = ''
          this.bonusFraiseProgress = 0
        }, 1500);
      }
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
    width: 90px
    height: 90px
    display: flex
    justify-content: center
    align-items: center
    background-image: url('~@/assets/images/icons/fraise.png')
    background-repeat: no-repeat
    background-position: center center
    background-size: cover
    filter: drop-shadow(5px 5px 5px #222)
    outline: none !important
  .bonus-added
    display: none
    color: var(--clr-white)
    text-shadow: 1px 1px 1px var(--clr-black), -1px 1px 1px var(--clr-black), 1px -1px 1px var(--clr-black), -1px -1px 1px var(--clr-black), 2px 2px 2px var(--clr-black), -2px 2px 2px var(--clr-black), 2px -2px 2px var(--clr-black), -2px -2px 2px var(--clr-black)
    .fraise
      width: 25px !important
      height: 25px !important
    &.fadeout
      display: block
      animation: fadeOutTop 1.5s ease forwards
  .buff
    position: absolute
    top: 17px
    left: calc(66vw - 160px)
    width: 150px
    span:not(.fraise)
      display: block
      margin-top: 10px
    &-title
      width: 20px !important
      height: 20px !important
      margin-left: 0 !important
  .bonus-fraise
    position: fixed 
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 9999999
    background: var(--clr-semi-black)
    padding: 80px
    &__fraise
      background-image: url('~@/assets/images/icons/fraise.png')
      background-repeat: no-repeat
      background-size: cover
      background-position: center center
      width: 200px
      height: 200px
      transition: all var(--tr-du)
      margin-top: -50px
      &:hover
        transform: scale(1.1)
      &:active
        transform: scale(.9)
    &__timer
      font-size: 4rem
    &__progress
      width: 400px
    .rayon
      z-index: -1
      pointer-events: none !important
</style>
