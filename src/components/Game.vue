<template>
  <div class="game">
    <div class="col">
      <a href="#" class="btn" @click.prevent="increment(1)">🍪</a>
      <button @click.prevent="reset">reset game</button>
      <button @click.prevent="save">save game</button>
      <div class="truc">{{ display_currency }} truc(s)</div>
      <div>{{ display_tps }} truc(s) par seconde</div>
      <a href="#" @click.prevent="buy(build)" v-for="build in display_builds" :key="build.name" class="build" :class="{ disable: !build.buyable }">
        <h2>{{ build.name }}</h2>
        <p>inc: {{ build.inc }}</p>
        <p>prix: {{ build.price }}</p>
        <p>nombre: {{ build.number }}</p>
        <p>buyable: {{build.buyable ? 'oui' : 'non' }}</p>
      </a>
    </div>
    <div class="col">
      <h2>Succès</h2>
      <div class="success" v-for="succ in display_success" :key="succ.id">
        <p>{{succ.name}}</p>
        <p>done: {{succ.done ? 'oui' : 'non' }}</p>
        <hr>
      </div>
    </div>

    <div class="saved" :class="{ onsave: onsave }">jeu sauvegardé</div>
  </div>
</template>

<script>

export default {
  name: 'Game',
  props: {
    user: Object,
    builds: String,
    success: String
  },
  data: function() {
    return {
      display_currency: numeral(this.user.currency).format('0,0'),
      display_tps: numeral(this.user.tps).format('0,0'),
      display_builds: JSON.parse(this.builds),
      display_success: JSON.parse(this.success),
      onsave: false,
      onsaveTimer: 60000
    }
  },
  methods: {
    increment: function(inc, number = 1){
      if (this.user.currency == 1) {
        this.display_success.filter(succ => succ.id === 'oneClicked')[0].done = true
      }
      this.user.currency = this.user.currency + (inc * number)
      return this.display_currency = numeral(this.user.currency).format('0,0')
    },

    buy: function(build){
      this.user.currency = this.user.currency - build.price
      this.display_currency = numeral(this.user.currency).format('0,0')

      build.number += 1

      this.display_success.filter(succ => succ.buildName === build.name && succ.id == 'haveOne')[0].done = true

      this.user.tps = 0
      for(let index in this.display_builds){
        this.user.tps += this.display_builds[index].number * this.display_builds[index].inc
      }
      this.display_tps = numeral(this.user.tps).format('0,0')

      build.price *= 2
    },

    save: function(){
      this.$cookies.set('user', this.user, -1)
      this.$cookies.set('builds', JSON.stringify(this.display_builds), -1)
      this.$cookies.set('success', JSON.stringify(this.display_success), -1)
      this.onsave = true
    },
    reset: function(){
      console.log('game reset')
      this.$cookies.remove('user')
      this.$cookies.remove('builds')
      this.$cookies.remove('success')
      window.location.reload()
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
      this.save()
    }, this.onsaveTimer);

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
  .game
    width: 40vw
    margin: 50px auto
    display: grid
    grid-template-columns: repeat(2, 1fr)
  .btn
    display: block
    font-size: 10rem
    text-decoration: none

  .truc
    font-size: 2rem

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