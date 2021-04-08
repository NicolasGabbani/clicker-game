<template>
  <div class="btn-score-container">
    <img :src="require('@/assets/images/icons/rayon.png')" alt="rayon" class="rayon" v-show="haveBonusCpsClicked">
    <button class="btn-score nes-pointer" @click.prevent="$emit('inc', clickInc, 1, 'button'); displayScore(); licorneClick();" :class="clsLicorne || decorArray.filter(d => d.get)[currentLicorne]?.cls"></button>
    <p class="licorne-balloon nes-balloon from-left animate__animated animate__fadeIn" v-if="(haveSuccess && success?.content) || haveDialog">
      {{success?.content || this.licorneDialog}}
    </p>
  </div>
</template>

<script>
import Dialog from '@/data/dialog'
export default {
  name: 'ClickButton',
  props: {
    inc: Function,
    cps: Number,
    clsLicorne: String,
    decorArray: Array,
    currentLicorne: Number,
    haveSuccess: Boolean,
    success: Object,
    haveBonusCpsClicked: Boolean,
    licorneClickSucc: Function
  },
  data(){
    return {
      clickInc: this.cps == 0 ? 1 : (1 + this.cps) * 1.2,
      licorneDialog: '',
      dialog: Dialog,
      haveDialog: false,
      dialogInterval: 10000,
      click: 0
    }
  },
  methods: {
    displayScore(){
      this.clickInc = this.cps == 0 ? 1 : (1 + this.cps) * 1.2
      const span = document.createElement('span')
      span.innerHTML = `+${this.renderNumeral(this.clickInc)}<span class='fraise'></span>`
      span.style.top = `${Math.floor(Math.random() * 99)}%`
      span.style.left = `${Math.floor(Math.random() * 99)}%`
      document.querySelector('.btn-score').appendChild(span)
      setTimeout(() => {
        document.querySelector('.btn-score').removeChild(span)
      }, 750);
    },
    randomDialog(){
      this.$timer = setInterval(() => {
        this.haveDialog = true
        this.licorneDialog = this.dialog[Math.floor(Math.random() * this.dialog.length)]
      }, this.dialogInterval); 
    },
    licorneClick(){
      this.click++
      if(this.click >= 50){
        this.$emit('licorneClickSucc')
      }
      if(this.$timer){
        clearTimeout(this.$timer)
      }
      this.$timer = setTimeout(() => {
        this.click = 0
      }, 5000);
    },
    renderNumeral(val){
      if(val >= 1000000) return numeral(val).format('0.0a')
      return numeral(val).format('0,0')
    }
  },
  mounted(){
    this.randomDialog()
  },
  unmounted(){
    clearInterval(this.$timer)
  },
  watch: {
    haveDialog: function(){
      setTimeout(() => {
        this.haveDialog = false
      }, 3000);
    }
  }
}
</script>

<style lang="sass">
  .btn-score-container
    position: relative
    width: 360px
  .rayon
    display: block
    position: absolute
    top: 50%
    left: 50%
    z-index: 2
    transform: translate(-50%, -50%) rotate(0deg)
    animation: rayonRotate 6s linear infinite
  .btn-score
    border: none
    outline: none
    transition: all var(--tr-du) linear
    background-image: url('~@/assets/images/licorne/licorne_01.png')
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
    background-color: transparent
    outline: none !important
    padding: 12px
    position: relative
    z-index: 3
    width: 100%
    height: 298px
    &:active
      transform: scale(.9) !important
    &:hover
      transform: scale(1.05)
      background-image: url('~@/assets/images/licorne/licorne_01r.png')
    span:not(.fraise)
      display: block
      text-align: center
      width: 250px
      position: absolute
      font-size: 1.5rem
      font-family: var(--font-press)
      color: var(--clr-white)
      text-shadow: 1px 1px 1px var(--clr-black), -1px 1px 1px var(--clr-black), 1px -1px 1px var(--clr-black), -1px -1px 1px var(--clr-black), 2px 2px 2px var(--clr-black), -2px 2px 2px var(--clr-black), 2px -2px 2px var(--clr-black), -2px -2px 2px var(--clr-black)
      animation: fadeOutTop .35s ease
    span.fraise
      width: 25px !important
      height: 25px !important
    &.l3tsg01
      background-image: url('~@/assets/images/licorne/licorne_02.png')
      &:hover
        background-image: url('~@/assets/images/licorne/licorne_02r.png')
    &.cb0nc4
      background-image: url('~@/assets/images/licorne/licorne_03.png')
      &:hover
        background-image: url('~@/assets/images/licorne/licorne_03r.png')
    &.jml3sp0p
      background-image: url('~@/assets/images/licorne/licorne_04.png')
      &:hover
        background-image: url('~@/assets/images/licorne/licorne_04r.png')
    &.j4im3l3sch4ts
      background-image: url('~@/assets/images/licorne/licorne_05.png')
      &:hover
        background-image: url('~@/assets/images/licorne/licorne_05r.png')
    &.cm4rr4nt
      background-image: url('~@/assets/images/licorne/licorne_06.png')
      &:hover
        background-image: url('~@/assets/images/licorne/licorne_06r.png')
    &.jss1l1c0rn3
      background-image: url('~@/assets/images/licorne/licorne_07.png')
      &:hover
        background-image: url('~@/assets/images/licorne/licorne_07r.png')
    &.g4m4d0n3gg
      background-image: url('~@/assets/images/licorne/licorne_08.png')
      &:hover
        background-image: url('~@/assets/images/licorne/licorne_08r.png')
  .licorne-balloon
    width: 320px
    position: absolute
    left: 100%
    top: -10%
</style>
