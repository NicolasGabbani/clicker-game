<template>
  <div>
    <a href="#" @click.prevent="$emit('buy', build)" v-for="build in builds" :key="build.name" class="build" :class="{ disable: !build.buyable }">
      <h2>{{ build.name }}</h2>
      <p>inc: {{ build.inc }}</p>
      <p>prix: {{ build.price }}</p>
      <p>nombre: {{ build.number }}</p>
      <p>buyable: {{build.buyable ? 'oui' : 'non' }}</p>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Builds',
  props: {
    builds: Array,
    buy: Function
  }
}
</script>