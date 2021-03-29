<template>
  <div class="name">
    <div class="nes-container is-semi-white is-rounded nes-pointer name__name" v-show="!displayInput" @dblclick="toggleInput"> {{name}}</div>
    <form v-show="displayInput">
      <div class="nes-field">
        <input type="text" id="name_field" class="nes-input" v-model="name" :maxlength="max">
        <button class="nes-btn is-success name__btn" type="submit" @click.prevent="$emit('changeName', name); toggleInput();">valider</button>
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
      max: 12
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
    &__name
      font-size: 2rem
    &__btn
      margin-top: 10px
      width: 100%
</style>