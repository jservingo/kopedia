<template>
    <div class ="container">
        <Header :title="card.title"></Header>        
        <Item v-for="item in card.items" :item="item"></Item>
    </div>
</template>

<script setup>

import Header from './Header.vue'
import Item from './Item.vue'
import { defineProps } from 'vue';

defineProps(["card"]);
</script>

<style scoped>
.container {
    display: block;
}
</style>