<template>
    <div class ="container">
        <Header :title="info.title"></Header>
        <Unit v-for="unit in info.unidades" :unit="unit"></Unit>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import Unit from './Unit.vue'
import { ref } from 'vue';

const info = ref({
    id: 1,
    title: 'Matematicas - Curso de Prueba',
    unidades: [
        {
            id: 1,
            title: 'Trigonemetría',
            pages: []        
        }, 
        {
            id: 2,
            title: 'Fracciones',
            pages: []
        }, 
    ]
})
</script>

<style>
.container {
    display: block;
}
</style>