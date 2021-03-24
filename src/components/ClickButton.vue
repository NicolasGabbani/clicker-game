<template>
  <button class="btn" @click.prevent="$emit('inc')">🍪</button>
</template>

<script>
export default {
  name: 'ClickButton',
  props: {
    inc: Function
  }
}
</script>