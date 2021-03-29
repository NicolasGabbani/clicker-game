<template>
  <div class="nes-container is-rounded is-semi-white">
    <p>Succès</p>
    <div class="container-scroll container-success">
      <div class="success" v-for="succ in success" :key="succ.id">
        <span class="success__name" v-if="succ.done">{{succ.name}}</span>
        <span class="success-unlock" v-if="succ.done">
          déverouillé ! :D
        </span>
        <span class="success-lock" v-else>
          verouillé... :(
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  props: {
    success: Array
  }
}
</script>

<style lang="sass">
  .container-success
    height: 72vh !important
</style>
