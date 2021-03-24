<template>
  <div class="builds">
    <div @click.prevent="$emit('buy', build)" v-for="(build, index) in builds" :key="build.name" class="build" :class="{ disable: !build.buyable }" :ref='`build${index}`'>
      <div class="build-name">{{ build.name }}</div>
      <span class="build-ps">+{{ build.inc }}<span>⭐️</span>/seconde</span>
      <span class="build-price">{{ build.price }}<span>⭐️</span></span>
      <span class="build-number">{{ build.number }}</span>
      <span style="display: none" :class="{buyable: build.buyable}">buyable: {{build.buyable ? 'oui' : 'non' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Builds',
  props: {
    builds: Array,
    buy: Function
  },
  mounted(){
    setInterval(() => {
      for (let index in this.$refs) {
        if(!this.$refs[index].classList.contains('disable') && !this.$refs[index].children[4].classList.contains('buyable')){
          this.$refs[index].classList.add('disable')
          console.log('triche')
        }
      }
    }, 100);
  }
}
</script>

<style lang="sass">
  .builds
    width: 70%
    height: 650px
    overflow-y: scroll
    padding-right: 30px
  .build
    all: unset
    display: block
    position: relative
    color: var(--clr-white)
    margin-bottom: 30px
    padding-bottom: 30px
    background: var(--clr-semi-black)
    padding: 12px
    border-radius: var(--bor-ra)
    cursor: pointer

    &-name
      margin: 5px 0 15px 0
      font-size: 1.4rem
      text-transform: uppercase
    span
      display: block
      font-size: .7rem
      span
        display: inline-block
        font-size: 1.4rem
        margin-left: 2px
      &.build-number
        position: absolute
        top: 50%
        transform: translateY(-50%)
        right: 20px
        font-size: 1.4rem
    &.disable
      pointer-events: none
      color: red
</style>