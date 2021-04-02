<template>
  <Loading v-show="isLoading" />
  <Game :user="user" :builds="builds" :success="success" :buildsSuccess="buildsSuccess" :loaded="!isLoading" v-show='!isLoading' />
</template>

<script>
import Header from './components/Header.vue'
import Loading from './components/Loading.vue'
import Game from './components/Game.vue'
import Data from './data/user'
import Builds from '@/data/builds'
import Success from '@/data/success'
import BuildsSuccess from '@/data/builds_success'
export default {
  name: 'App',
  components: {
    Game,
    Header,
    Loading
  },
  data: () => {
    return {
      user: {},
      builds: null,
      success: null,
      buildsSuccess: null,
      imagesToPreload: [
        require('@/assets/images/bg/decors-1.jpg'),
        require('@/assets/images/bg/decors-2.jpg'),
        require('@/assets/images/bg/decors-3.jpg'),
        require('@/assets/images/bg/decors-4.jpg'),

        require('@/assets/images/licorne/licorne_01.png'),
        require('@/assets/images/licorne/licorne_01r.png'),
        require('@/assets/images/licorne/licorne_02.png'),
        require('@/assets/images/licorne/licorne_02r.png'),
        require('@/assets/images/licorne/licorne_03.png'),
        require('@/assets/images/licorne/licorne_03r.png'),
        require('@/assets/images/licorne/licorne_04.png'),
        require('@/assets/images/licorne/licorne_04r.png'),
        require('@/assets/images/licorne/licorne_05.png'),
        require('@/assets/images/licorne/licorne_05r.png'),
        require('@/assets/images/licorne/licorne_06.png'),
        require('@/assets/images/licorne/licorne_06r.png'),
        require('@/assets/images/licorne/licorne_07.png'),
        require('@/assets/images/licorne/licorne_07r.png'),
        require('@/assets/images/licorne/licorne_08.png'),
        require('@/assets/images/licorne/licorne_08r.png'),

        require('@/assets/images/deco/grand-sage-sprite.png'),
        require('@/assets/images/deco/nuage.png'),

        require('@/assets/images/icons/rayon.png'),
        require('@/assets/images/icons/fraise.png'),
        require('@/assets/images/icons/coupe.png'),
        
        require('@/assets/images/builds/unites-production-1.png'),
        require('@/assets/images/builds/unites-production-2.png'),
        require('@/assets/images/builds/unites-production-3.png'),
        require('@/assets/images/builds/unites-production-4.png'),
        require('@/assets/images/builds/unites-production-5.png'),
        require('@/assets/images/builds/unites-production-6.png'),
        require('@/assets/images/builds/unites-production-7.png'),
        require('@/assets/images/builds/unites-production-8.png'),
        require('@/assets/images/builds/unites-production-9.png'),
        require('@/assets/images/builds/unites-production-10.png'),
        require('@/assets/images/builds/unites-production-11.png'),
        require('@/assets/images/builds/unites-production-12.png'),
        require('@/assets/images/builds/unites-production-13.png'),
        require('@/assets/images/builds/unites-production-14.png'),
        require('@/assets/images/builds/unites-production-15.png'),
        require('@/assets/images/builds/unites-production-16.png'),
        require('@/assets/images/builds/unites-production-17.png'),
        require('@/assets/images/builds/unites-production-18.png'),
        require('@/assets/images/builds/unites-production-19.png'),
        require('@/assets/images/builds/unites-production-21.png'),
        require('@/assets/images/builds/unites-production-22.png'),
        require('@/assets/images/builds/unites-production-23.png'),
        require('@/assets/images/builds/unites-production-24.png'),
        require('@/assets/images/builds/unites-production-25.png')
      ],
      isLoading: true
    }
  },
  methods: {
    loadImgs(){
      let imageLoaded = 0;
      for (const imageSrc of this.imagesToPreload) {
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
          imageLoaded++;

          if (imageLoaded === this.imagesToPreload.length) {
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
          }
        };
      }
    }
  },
  created(){
    this.loadImgs()
    
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

    if(!this.$cookies.isKey('buildssuccess')) {
      this.$cookies.set('buildssuccess', JSON.stringify(BuildsSuccess), -1)
    }
    this.buildsSuccess = this.$cookies.get('buildssuccess')
  }
}
</script>

<style lang="sass" src="./assets/sass/app.sass"></style>
