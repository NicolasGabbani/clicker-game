<template>
  <div class="store nes-container is-rounded is-semi-white">
    <p class="title">Magasin</p>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div v-for="(s, i) in store" :key="s.id" class="store-content">
        <tippy :followCursor="true" placement="top-start" duration="0" v-for="(store, index) in s.store" v-show="!store.purchase && build(s.id).number >= store.number">
          <button 
            class="store-btn nes-btn"  
            :class="{
              'is-success': currency >= build(s.id).price * (index + 2),
              'is-error': currency <  build(s.id).price * (index + 2)
            }"
            @click.prevent.stop="purchase(s, store, index)"
          >
            <div 
              class="store__avatar" 
              :style="{backgroundImage: `url(${require(`@/assets/images/builds/unites-production-${i+1}.png`)})` }">
            </div>
          </button>

          <template #content>
            <div class="nes-btn">
              <div class="store-tooltip">
                {{build(s.id).name}} deux fois plus efficace !
              </div>
              <span class="nes-text" :class="{'is-success': currency >= build(s.id).price * (index + 2), 'is-error': currency < build(s.id).price * (index + 2)}">{{renderNumeral(build(s.id).price * (index + 2))}}<span class="fraise small-fraise"></span></span>
            </div>
          </template>
        </tippy>

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
    calcCps: Function,
  },
  methods: {
    build(id){
      return this.builds.filter(b => b.id == id)[0]
    },
    purchase(store, currentStore, index){
      if (this.currency < this.build(store.id).price * (index + 2)) return;
      this.$emit('buy', this.build(store.id).price * (index + 2))
      this.$emit('purchaseStoreSucc')
      this.build(store.id).inc *= 2
      this.build(store.id).stars += 1
      this.$emit('calcCps')
      currentStore.purchase = true
    },
    renderNumeral(val){
      if(val >= 1000000) return numeral(val).format('0.000a')
      return numeral(val).format('0,0.0')
    },
  }
}
</script>

<style lang="sass" scoped>
  .container-scroll
    height: 71px !important // 172
  .store
    margin-bottom: 20px !important
    &-tooltip
      border-bottom: 3px dashed var(--clr-black)
      margin-bottom: 5px
      padding-bottom: 5px
      font-size: .8rem
    &-content
      display: inline-flex
      flex-wrap: wrap 
      gap: 15px
      margin-bottom: 15px
    &-btn
      width: 100%
      min-height: 40px
      display: flex
      justify-content: center
      align-items: center
      aspect-ratio: 1
      padding: 0 !important
    &__avatar
      width: 40px
      height: 40px
      background-size: cover
      background-repeat: no-repeat
      background-position: center center
      filter: hue-rotate(60deg) sepia(78%)
      border: 3px solid var(--clr-black)

      display: flex
      justify-content: center
      align-items: center
</style>