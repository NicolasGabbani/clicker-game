<template>
  <div class="nes-container is-white is-rounded popup">
    <p class="title">Options</p>
    <button class="closed nes-container is-white is-rounded" @click.prevent="$emit('closeOptions')"><i class="nes-icon close is-small"></i></button>
    <div class="container-scroll" data-simplebar data-simplebar-auto-hide="false">
      <div class="menu">
        <button class="nes-btn is-primary" @click.prevent="$emit('save')">sauvegarder</button>
        <button class="nes-btn is-error" @click.prevent="$emit('reset')">rénitialiser</button>
      </div>

      <div class="menu-seperate">
        <button class="nes-btn" @click.prevent="$emit('toggleScreenshot')">voir stats</button>
      </div>

      <div class="menu-seperate">
        <p class="title">Graphismes</p>

        <label>
          <input type="checkbox" class="nes-checkbox" v-model="rain" @change="this.$emit('optionRain', rain)" />
          <span>Activer la pluie de fraises</span>
        </label>
      </div>

      <div class="menu-seperate">
        <p class="title">Choisis ton fond d'écran</p>
        <div class="nes-container is-white is-rounded" v-if="!decor.filter(d => d.get).length">
          Pas encore débloqué...
        </div>
        <div class="menu-grid">
          <button class="nes-btn" :class="{'is-primary': currentDecor == index || (index == decor.filter(d => d.get).length - 1 && currentDecor == -1)}" v-for="(d, index) in decor.filter(d => d.get)" @click.prevent.stop="this.$emit('selectDecor', index)">
            {{index + 1}}
          </button>
        </div>
      </div>

      <div class="menu-seperate">
        <p class="title">Choisis ta licorne</p>
        <div class="nes-container is-white is-rounded" v-if="!decor.filter(d => d.licorne).length">
          Pas encore débloqué...
        </div>
        <div class="menu-grid">
          <button class="nes-btn" :class="{'is-success': currentLicorne == index || (index == decor.filter(d => d.licorne).length - 1 && currentLicorne == -1)}" v-for="(d, index) in decor.filter(d => d.licorne)" @click.prevent.stop="this.$emit('selectLicorne', index)">
            {{index + 1}}
          </button>
        </div>
      </div>

      <div class="copyright text-center">
        <img :src="require('@/assets/images/logos/logo_superlicorne.png')" alt="logo superlicorne" class="copyright-super-licorne">
        <div>Illustrations par Yoann Montalban - Code par Nakin</div>
        <div>Tous droit réservés - 2021 - S.A.S Yoann Montalban</div>
        <div class="beta-test">
          <span>Merci à : </span>
          <span>Vasco</span> -
          <span>Aelin</span> -
          <span>Koopa</span> -
          <span>Bixy</span> -
          <span>Kisekae</span> -
          <span>Asphyxiate</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    decor: Array,
    currentDecor: Number,
    currentLicorne: Number,
    rain: Boolean,
  }
}
</script>

<style lang="sass">
  .copyright
    width: 100%
    padding: 20px
    margin-top: 40px
    font-size: .7rem
    > div
      margin-bottom: 15px
      &:last-child
        margin-bottom: 0
    &-super-licorne
      width: 100px
      margin-bottom: 20px
  .popup
    width: 30vw
    height: calc(100vh - 50px)
    position: fixed
    top: 20px
    left: 20px
    z-index: 999
  .menu
    display: grid
    grid-gap: 15px
    grid-template-columns: repeat( auto-fit, minmax(220px, 1fr) )
    position: relative
    &-seperate
      padding-top: 20px
    &-grid
      display: grid
      grid-gap: 15px
      grid-template-columns: repeat( auto-fit, minmax(90px, 1fr) )
  .beta-test
    font-size: .6rem
  .closed
    padding: 0 4px !important
    position: absolute
    top: -20px
    right: -10px
</style>
