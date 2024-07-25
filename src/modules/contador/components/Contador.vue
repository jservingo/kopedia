<template>
  <h1>Kopedia</h1>  
  <button @click="incrementar">Incrementar</button>
  <button @click="decrementar">Decrementar</button>
  <p>{{ contador }}</p>
</template>

<script setup>
import { ref } from 'vue'
const contador = ref(0)
const incrementar = () => {contador.value++}
const decrementar = () => {contador.value--}
</script>

<style scoped>
p {color: blue;}

</style>
