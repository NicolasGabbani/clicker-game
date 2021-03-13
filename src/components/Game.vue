<template>
  <div class="game">
    <a href="#" class="btn" @click.prevent="increment(1)"></a>
    <div>hello {{ display_currency }}</div>
    <div>{{ display_tps }} truc(s) par seconde</div>
    <a href="#" @click.prevent="buy(build)" v-for="build in builds" :key="build.name" class="build" :class="{ disable: !build.buyable }">
      <h2>{{ build.name }}</h2>
      <p>inc: {{ build.inc }}</p>
      <p>prix: {{ build.price }}</p>
      <p>nombre: {{ build.number }}</p>
    </a>
  </div>
</template>

<script>
import Builds from '@/data/builds'
export default {
  name: 'Game',
  props: {
    user: Object
  },
  data: function() {
    return {
      display_currency: 0,
      display_tps: 0,
      builds: Builds
    }
  },
  methods: {
    increment: function(inc, number = 1){
      this.user.currency = this.user.currency + (inc * number)
      return this.display_currency = numeral(this.user.currency).format('0,0')
    },

    buy: function(build){
      this.user.currency = this.user.currency - build.price
      this.display_currency = numeral(this.user.currency).format('0,0')

      build.number += 1
      this.user.tps = 0
      for(let index in this.builds){
        this.user.tps += this.builds[index].number * this.builds[index].inc
      }

      this.display_tps = numeral(this.user.tps).format('0.0')

      build.price *= 2
    }
  },
  mounted: function() {
    this.$timer = setInterval(() => {
      for(let index in this.builds){
        this.builds[index].buyable = this.user.currency >= this.builds[index].price
        let curr = this.increment(this.builds[index].inc, this.builds[index].number)
        document.title = curr
      }
    }, 1000);
  },
  unmounted: function() {
    clearInterval(this.$timer)
  }
}
</script>

<style lang="sass">
  .btn
    display: block
    width: 40px
    height: 40px
    border-radius: 50%
    background: red

  .build
    color: black
    text-decoration: none
    h2
      margin-bottom: 5px
    p
      margin: 0
    &.disable
      pointer-events: none
      color: red
</style>