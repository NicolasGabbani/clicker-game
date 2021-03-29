<template>
  <div class="nes-container is-rounded is-semi-white">
    <p>Succès</p>
    <div class="container-scroll container-success" data-simplebar data-simplebar-auto-hide="false">
      <div class="success-content">
        <div class="success nes-container is-rounded is-dark" v-for="succ in success" :key="succ.id">
          <!-- <span class="success__name" v-if="succ.done">{{succ.name}}</span> -->
          <span class="success-unlock" v-if="succ.done">
            !
          </span>
          <span class="success-lock" v-else>
            ?
          </span>
        </div>
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
  .success-content
    display: grid
    grid-gap: 10px
    grid-template-columns: repeat( auto-fit, minmax(120px, 1fr) )
  .success
    display: flex
    justify-content: center
    align-items: center
    height: 120px
  .container-success
    height: 73vh !important
</style>
