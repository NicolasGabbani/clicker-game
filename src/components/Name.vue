<template>
  <div class="name">
    <tippy :followCursor="true" placement="top-start" duration="0">
      <div class="nes-badge nes-pointer name__name" v-show="!displayInput" @dblclick="toggleInput"><span class="is-dark">{{name}}</span></div>
      <template #content>
        <div class="nes-btn">Double cliquer pour changer de nom !</div>
      </template>
    </tippy>
    
    <form v-show="displayInput" @submit.prevent="$emit('changeName', name); toggleInput();">
      <div class="nes-field">
        <input type="text"  class="nes-input" v-model="name" :maxlength="max" required="required">
        <button class="nes-btn is-success name__btn" type="submit">valider</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Name',
  props: {
    name: String,
    changeName: Function
  },
  data(){
    return {
      displayInput: false,
      max: 8,
    }
  },
  methods: {
    toggleInput(){
      this.displayInput = !this.displayInput
    }
  }
}
</script>

<style lang="sass" scoped>
  .name
    height: 114px
  .nes-badge span:first-child
    left: 0
  .nes-input
    width: 100%
  .name
    position: relative
    z-index: 4
    &__name
      font-size: 2rem
    &__btn
      margin-top: 10px
      width: 100%
</style>