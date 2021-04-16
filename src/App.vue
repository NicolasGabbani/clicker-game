<template>
  <Loading v-show="isLoading" />
  <Game 
    :user="user" 
    :builds="builds" 
    :store="store" 
    :success="success" 
    :buildsSuccess="buildsSuccess" 
    :loaded="!isLoading" 
    v-show='!isLoading' 
  />
</template>

<script>
import Header from './components/Header.vue'
import Loading from './components/Loading.vue'
import Game from './components/Game.vue'
import Data from './data/user'
import Builds from '@/data/builds'
import Store from '@/data/store'
import Success from '@/data/success'
import BuildsSuccess from '@/data/builds_success'
import '@/libs/momentum'
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
      store: null,
      success: null,
      buildsSuccess: null,
      imagesToPreload: [
        require('@/assets/images/bg/decors-1.jpg'),
        require('@/assets/images/bg/decors-2.jpg'),
        require('@/assets/images/bg/decors-3.jpg'),

        require('@/assets/images/licorne/licorne_01.png'),
        require('@/assets/images/licorne/licorne_01r.png'),
        require('@/assets/images/licorne/licorne_02.png'),
        require('@/assets/images/licorne/licorne_02r.png'),
        require('@/assets/images/licorne/licorne_03.png'),
        require('@/assets/images/licorne/licorne_03r.png'),

        require('@/assets/images/deco/grand-sage-sprite.png'),
        require('@/assets/images/deco/nuage.png'),

        require('@/assets/images/icons/rayon.png'),
        require('@/assets/images/icons/fraise.png'),
        require('@/assets/images/icons/coupe.png'),

        require('@/assets/images/logos/logo_superlicorne.png'),
        
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
            this.isLoading = false;
          }
        };
      }
    }
  },
  created(){
    
    if(!this.$cookies.isKey('user')) {
      this.$cookies.set('user', Data, -1)
    }
    this.user = this.$cookies.get('user')

    if(!localStorage.builds){
      localStorage.builds = JSON.stringify(Builds)
    }
    this.builds = localStorage.builds

    if(!localStorage.store){
      localStorage.store = JSON.stringify(Store)
    }
    this.store = localStorage.store

    if(!localStorage.success) {
      localStorage.success = JSON.stringify(Success)
    }
    this.success = localStorage.success

    if(!localStorage.buildssuccess) {
      localStorage.buildssuccess = JSON.stringify(BuildsSuccess)
    }
    this.buildsSuccess = localStorage.buildssuccess

    numeral.register('locale', 'fr', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: ' mil',
            million: ' mio',
            billion: ' mia',
            trillion: ' tri'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'ème';
        },
        currency: {
            symbol: '€'
        }
    });

    numeral.locale('fr');
  },
  mounted(){
    this.loadImgs()
  }
}
</script>

<style lang="sass" src="./assets/sass/app.sass"></style>
