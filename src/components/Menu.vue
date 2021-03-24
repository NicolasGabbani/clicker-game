<template>
  <div>
    <button @click.prevent="$emit('reset')">reset game</button>
    <button @click.prevent="$emit('save')">save game</button>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    reset: Function,
    save: Function
  }
}
</script>