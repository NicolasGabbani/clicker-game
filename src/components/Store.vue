<template>
  <div class="store nes-container is-rounded is-semi-white">
    <p class="title">Magasin</p>
    <div class="store-content container-start">
      <button 
        class="store-btn nes-btn" 
        v-for="(s, index) in store" 
        :key="store.id" 
        v-show="!s.purchased && build(s.id).number >= s.buildNumber" 
        :class="{
          'is-success': currency >= s.price, 
          'is-error': currency < s.price
        }"
        @click.prevent.stop="purchase(s)"
        data-tooltip="{ 'offset': 10, 'class': 'nes-btn' }" 
        :title="`${build(s.id).name} deux fois plus efficace ! (${s.price} fraises)`"
      >
        <div 
          class="store__avatar" 
          :style="{backgroundImage: `url(${require(`@/assets/images/builds/unites-production-${index+1}.png`)})` }">
        </div>
      </button>

      <button class="store-btn nes-btn is-disabled" v-for="s in store" v-show="!s.purchased && build(s.id).number < s.buildNumber">
        <div class="store__avatar">?</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Store',
  props: {
    store: Array,
    builds: Array,
    currency: Number,
    buy: Function
  },
  methods: {
    build(id){
      return this.builds.filter(b => b.id == id)[0]
    },
    purchase(store){
      if (this.currency < store.price) return;
      this.$emit('buy', store.price)
      this.build(store.id).inc *= 2
      this.build(store.id).stars += 1
      store.purchased = true
    }
  }
}
</script>

<style lang="sass">
  .store
    margin-bottom: 20px !important
    height: 172px
    &-btn
      margin-right: 15px
      &:last-child
        margin-right: 0
      &.is-disabled
        .store__avatar
          border: none !important
    &__avatar
      width: 64px
      height: 64px
      background-size: cover
      background-repeat: none
      background-position: center center
      filter: hue-rotate(60deg) sepia(78%)
      border: 3px solid var(--clr-black)

      display: flex
      justify-content: center
      align-items: center
</style>