<template>
  <div>
    <div class="truc">{{ currency }} truc(s)</div>
    <div>{{ tps }} truc(s) par seconde</div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    currency: String,
    tps: String
  }
}
</script>