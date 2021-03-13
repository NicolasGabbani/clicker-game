<template>
  <Game :user="user" />
</template>

<script>
import Game from './components/Game.vue'
import Data from './data/user'
export default {
  name: 'App',
  components: {
    Game
  },
  data: () => {
    return {
      user: {}
    }
  },
  mounted(){
    if(!this.$cookies.isKey('user')) {
      this.$cookies.set('user', Data, -1)
    }
    return this.user = this.$cookies.get('user')
  }
}
</script>
