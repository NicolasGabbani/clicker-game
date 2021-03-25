<template>
  <div class="success-content">
    <h2>Succès</h2>
    <div class="success" v-for="succ in success" :key="succ.id">
      <span class="success-name">{{succ.name}}</span>
      <span class="success-unlock" v-if="succ.done">
        déverouillé ! :D
      </span>
      <span class="success-lock" v-else>
        verouillé... :(
      </span>
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
    background: var(--clr-black)
    color: var(--clr-white)
    padding: 12px
    border-radius: var(--bor-ra)
    h2
      margin-bottom: 15px
    .success
      margin-bottom: 15px
      background: var(--clr-white)
      color: var(--clr-black)
      padding: 20px
      border-radius: var(--bor-ra)
      &:last-child
        margin-bottom: 0
      span
        display: block
      &-name
        font-size: 1.3rem
        margin-bottom: 20px
      &-lock
        color: red
      &-unlock
        color: blue
</style>