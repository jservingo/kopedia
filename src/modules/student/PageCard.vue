<template>
    <div class="card card-container" :style="{background:bgGradient }">
        <div class="card-body">
            <Header :title="card.title" :display="display" @display-items="displayItems"></Header>        
            <Item v-for="item in items" :item="item" v-show="display"></Item>
        </div>
    </div>
</template>

<script setup>
import Header from './CardHeader.vue'
import Item from './CardItem.vue'
import { defineProps, ref, computed, onMounted } from 'vue';
import useCard from '@/composables/useCardStudent';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const props = defineProps(["card","index"]);
//backgroundColor:bgColor
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

//Get card
const { items, getItems } = useCard()

onMounted(() => {
    getItems(token.value, props.card.id)
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
    padding: 0px;
    padding-top: 3px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
</style>