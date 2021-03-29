<template>
  <Game :user="user" :builds="builds" :success="success" />
</template>

<script>
import Header from './components/Header.vue'
import Game from './components/Game.vue'
import Data from './data/user'
import Builds from '@/data/builds'
import Success from '@/data/success'
export default {
  name: 'App',
  components: {
    Game,
    Header
  },
  data: () => {
    return {
      user: {},
      builds: null,
      success: null
    }
  },
  created(){
    if(!this.$cookies.isKey('user')) {
      this.$cookies.set('user', Data, -1)
    }
    this.user = this.$cookies.get('user')

    if(!this.$cookies.isKey('builds')) {
      this.$cookies.set('builds', JSON.stringify(Builds), -1)
    }
    this.builds = this.$cookies.get('builds')

    if(!this.$cookies.isKey('success')) {
      this.$cookies.set('success', JSON.stringify(Success), -1)
    }
    this.success = this.$cookies.get('success')
  }
}
</script>

<style lang="sass" src="./assets/sass/app.sass"></style>
