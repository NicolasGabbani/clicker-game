<template>
  <div class="success">
    <h2>Succès</h2>
    <div class="success" v-for="succ in success" :key="succ.id">
      <p>{{succ.name}}</p>
      <p>done: {{succ.done ? 'oui' : 'non' }}</p>
      <hr>
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
  .success
    display: none
</style>