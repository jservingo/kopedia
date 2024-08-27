<template>
    <div class="container-card" :style="{background:bgGradient }">
        <Header :title="card.title" :display="display" @display-items="displayItems"></Header>        
        <Item v-for="item in card.items" :item="item" v-show="display"></Item>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import Item from './Item.vue'
import { defineProps, ref, computed } from 'vue';
const props = defineProps(["card","index"]);
//Change bgColor
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#baac7f","#a8a8b5","#c9b194"]
const bgColor = bgColors[props.index % 6]
//console.log(bgColor)  
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})
//Show or hide items
const display = ref(true);
const displayItems = (mode) => {
    display.value = !display.value;
}
</script>

<style>
.container-card {
    display: block;
    padding: 10px;
    padding-top: 3px;
    margin-bottom: 12px;
}
</style>