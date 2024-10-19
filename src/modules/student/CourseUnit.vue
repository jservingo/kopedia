<template>
    <div class ="card card-container" :style="{background:bgGradient }">
        <div class="card-body">
            <Header :title="unit.title" :display="display" @display-items="displayItems"></Header>
            <Page v-for="(page) in pages" :page="page" v-show="display"></Page>
        </div>
    </div>
</template>

<script setup>
import Header from './UnitHeader.vue'
import Page from './UnitPage.vue'
import { defineProps, ref, computed, onMounted } from 'vue';
import useUnit from '@/composables/useUnitStudent';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const props = defineProps(["unit","index"]);
//const bgColors=["#8ED6D5","#EFC7C5","#c8d4b6","#CFCDE2","#e5ce89","#FDD6AB"]
const bgColors=["#7facab","#bba4a2","#a3ab99","#baac7f","#a8a8b5","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6]
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);

//Get unit
const { pages, getPages } = useUnit()

onMounted(() => {
    //console.log("Unit id:", props.unit.id)
    getPages(token.value, props.unit.id)
})

//Show or hide items
const display = ref(true);
const displayItems = (mode) => {
    display.value = !display.value;
}
</script>

<style>
.card-container {
    display: block;
    font-size: 17px;
    padding: 0px;
    padding-top: 3px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
</style>