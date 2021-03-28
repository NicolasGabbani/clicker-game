<template>
  <div class="game-name">
    <div class="name" v-show="!displayInput" @dblclick="toggleInput"> {{name}}</div>
    <form class="change-name" v-show="displayInput">
      <input type="text" v-model="name" :maxlength="max">
      <button type="submit" @click.prevent="$emit('changeName', name); toggleInput();">valider</button>
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

<style lang="sass">
  .game-name
    color: var(--clr-white)
    font-size: 3rem
    margin-bottom: 20px
  .name
    padding: 18px
    transition: all var(--tr-du)
    cursor: pointer
    &:hover
      background: var(--clr-semi-black)
</style>
