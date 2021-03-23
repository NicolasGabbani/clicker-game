<template>
  <div class="game">
    <a href="#" class="btn" @click.prevent="increment(1)"></a>
    <div>{{ display_currency }} truc(s)</div>
    <div>{{ display_tps }} truc(s) par seconde</div>
    <a href="#" @click.prevent="buy(build)" v-for="build in display_builds" :key="build.name" class="build" :class="{ disable: !build.buyable }">
      <h2>{{ build.name }}</h2>
      <p>inc: {{ build.inc }}</p>
      <p>prix: {{ build.price }}</p>
      <p>nombre: {{ build.number }}</p>
      <p>buyable: {{build.buyable ? 'oui' : 'non' }}</p>
    </a>

    <div class="saved" :class="{ onsave: onsave }">jeu sauvegardé</div>
  </div>
</template>

<script>

export default {
  name: 'Game',
  props: {
    user: Object,
    builds: String
  },
  data: function() {
    return {
      display_currency: numeral(this.user.currency).format('0,0'),
      display_tps: numeral(this.user.tps).format('0,0'),
      display_builds: JSON.parse(this.builds),
      onsave: false,
    }
  },
  methods: {
    increment: function(inc, number = 1){
      this.user.currency = this.user.currency + (inc * number)
      return this.display_currency = numeral(this.user.currency).format('0,0')
    },

    buy: function(build){
      console.log(this.user)
      this.user.currency = this.user.currency - build.price
      this.display_currency = numeral(this.user.currency).format('0,0')

      build.number += 1

      this.user.tps = 0
      for(let index in this.display_builds){
        this.user.tps += this.display_builds[index].number * this.display_builds[index].inc
      }
      this.display_tps = numeral(this.user.tps).format('0,0')

      build.price *= 2
    }
  },
  mounted: function() {
    this.$timer = setInterval(() => {
      for(let index in this.display_builds){
        this.display_builds[index].buyable = this.user.currency >= this.display_builds[index].price
      }

      this.increment(this.user.tps/10)
      document.title = this.display_currency
    }, 100);

    this.$timer2 = setInterval(() => {
      this.$cookies.set('user', this.user, -1)
      this.$cookies.set('builds', JSON.stringify(this.display_builds), -1)
      this.onsave = true
    }, 10000);

  },
  unmounted: function() {
    clearInterval(this.$timer)
    clearInterval(this.$timer2)
    clearInterval(this.$timer3)
  },

  watch: {
    'onsave': function(val) {
      if(val){
        setTimeout(() => {
          this.onsave = false
        }, 1000);
      }
    }
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

  .saved
    justify-content: center
    align-items: center
    background: black
    color: white
    height: 50px
    width: 200px
    display: none
    &.onsave
      display: flex
</style>