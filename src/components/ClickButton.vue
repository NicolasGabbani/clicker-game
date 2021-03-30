<template>
  <div class="btn-score-container">
    <img :src="require('@/assets/images/icons/rayon.png')" alt="rayon" class="rayon" v-if="haveBonusCpsClicked">
    <button class="btn-score nes-pointer" @click.prevent="$emit('inc', clickInc, 1, 'button'); displayScore();" :class="classBg">
      <img :src="require('@/assets/images/icons/licorne.png')" alt="licorne">
    </button>
    <p class="licorne-balloon nes-balloon from-left animate__animated animate__fadeIn" v-if="haveSuccess || haveDialog">
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
    classBg: Object,
    haveSuccess: Boolean,
    success: Object,
    haveBonusCpsClicked: Boolean
  },
  data(){
    return {
      clickInc: this.cps == 0 ? 1 : (1 + this.cps) * 1.2,
      licorneDialog: '',
      dialog: Dialog,
      haveDialog: false,
      dialogInterval: 10000
    }
  },
  methods: {
    displayScore(){
      this.clickInc = this.cps == 0 ? 1 : (1 + this.cps) * 1.2
      const span = document.createElement('span')
      span.innerHTML = `+${numeral(this.clickInc).format('0,0.0')}⭐️`
      span.style.top = `${Math.floor(Math.random() * 99)}%`
      span.style.left = `${Math.floor(Math.random() * 99)}%`
      document.querySelector('.btn-score').appendChild(span)
      setTimeout(() => {
        document.querySelector('.btn-score').removeChild(span)
      }, 1000);
    },
    randomDialog(){
      this.$timer = setInterval(() => {
        this.haveDialog = true
        this.licorneDialog = this.dialog[Math.floor(Math.random() * this.dialog.length)]
      }, this.dialogInterval); 
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
  .rayon
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%) rotate(0deg)
    animation: rayonRotate 6s linear infinite
  .btn-score
    border: none
    outline: none
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
  .licorne-balloon
    max-width: 320px
    position: absolute
    right: 30px
    top: 10px
</style>
