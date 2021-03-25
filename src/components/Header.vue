<template>
  <nav class="nav">
    <div class="nav-name">🦄Super Licorne Clicker🦄</div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="sass">
  .nav
    position: fixed
    top: 0
    left: 0
    width: 100%
    padding: 12px

    display: flex
    justify-content: center
    align-items: center

    &-name
      font-family: var(--font-train)
      font-size: 4rem
</style>