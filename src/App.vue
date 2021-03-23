<template>
  <Game :user="user" :builds="builds" />
</template>

<script>
import Game from './components/Game.vue'
import Data from './data/user'
import Builds from '@/data/builds'
export default {
  name: 'App',
  components: {
    Game
  },
  data: () => {
    return {
      user: {},
      builds: null
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
  }
}
</script>
