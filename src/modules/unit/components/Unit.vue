<template>
    <div class ="container-unit" :style="{background:bgGradient }">
        <Header :title="unit.title" :display="display" @display-items="displayItems"></Header>
        <Page v-for="(page) in unit.pages" :page="page" v-show="display"></Page>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import Page from './Page.vue'
import { defineProps, ref, computed } from 'vue';
const props = defineProps(["unit","index"]);
//Change bgColor
//backgroundColor:bgColor
//const bgColors=["#8ED6D5","#EFC7C5","#c8d4b6","#CFCDE2","#e5ce89","#FDD6AB"]
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
.container-unit {
    display: block;
    font-size: 17px;
    padding: 10px;
    padding-top: 3px;
    margin-bottom: 12px;
}
</style>