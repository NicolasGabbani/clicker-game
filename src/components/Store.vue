<template>
  <div class="store nes-container is-rounded is-semi-white">
    <p class="title">Magasin</p>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div class="store-content">
        <div v-for="(s, index) in store">
          <tippy :followCursor="true" placement="top-start" duration="0">
            <button 
              class="store-btn nes-btn"  
              :key="store.id" 
              v-show="!s.purchased && build(s.id).number >= s.buildNumber" 
              :class="{
                'is-success': currency >= build(s.id).price * 2, 
                'is-error': currency < build(s.id).price * 2
              }"
              @click.prevent.stop="purchase(s)"
            >
              <div 
                class="store__avatar" 
                :style="{backgroundImage: `url(${require(`@/assets/images/builds/unites-production-${index+1}.png`)})` }">
              </div>
            </button>

            <template #content>
              <div class="nes-btn">
                <div class="store-tooltip">
                  {{build(s.id).name}} deux fois plus efficace !
                </div>
                <span class="nes-text" :class="{'is-success': currency >= build(s.id).price * 2, 'is-error': currency < build(s.id).price * 2}">{{build(s.id).price * 2}}<span class="fraise small-fraise"></span></span>
              </div>
            </template>
          </tippy>

          <button class="store-btn nes-btn is-disabled" v-show="!s.purchased && build(s.id).number < s.buildNumber">
            ?
          </button>

          <tippy :followCursor="true" placement="top-start" duration="0">
            <button class="store-btn nes-btn" v-show="s.purchased" @click.prevent.stop="$emit('storeHeartSucc')">
              <i class="nes-icon is-large heart"></i>
            </button>

            <template #content>
              <div class="nes-btn">
                {{build(s.id).name}} bonus débloqué !
              </div>
            </template>
          </tippy>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import 'simplebar'
import 'simplebar/dist/simplebar.css'
export default {
  name: 'Store',
  props: {
    store: Array,
    builds: Array,
    currency: Number,
    buy: Function,
    purchaseStoreSucc: Function,
    storeHeartSucc: Function,
    calcCps: Function
  },
  methods: {
    build(id){
      return this.builds.filter(b => b.id == id)[0]
    },
    purchase(store){
      if (this.currency < this.build(store.id).price * 2) return;
      this.$emit('buy', this.build(store.id).price * 2)
      this.$emit('purchaseStoreSucc')
      this.build(store.id).inc *= 2
      this.build(store.id).stars += 1
      this.$emit('calcCps')
      store.purchased = true
    }
  }
}
</script>

<style lang="sass" scoped>
  .container-scroll
    height: 115px !important // 172
  .store
    margin-bottom: 20px !important
    &-tooltip
      border-bottom: 3px dashed var(--clr-black)
      margin-bottom: 5px
      padding-bottom: 5px
      font-size: .8rem
    &-content
      display: grid
      grid-gap: 15px
      row-gap: 6px
      grid-template-columns: repeat( auto-fit, minmax(90px, 1fr) )
    &-btn
      width: 100%
      min-height: 90px
      display: flex
      justify-content: center
      align-items: center
      aspect-ratio: 1
    &__avatar
      width: 64px
      height: 64px
      background-size: cover
      background-repeat: no-repeat
      background-position: center center
      filter: hue-rotate(60deg) sepia(78%)
      border: 3px solid var(--clr-black)

      display: flex
      justify-content: center
      align-items: center
</style>