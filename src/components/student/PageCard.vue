<template>
    <div class="card card-container" :style="{background:bgGradient }">
        <div class="card-body" :id="`card${card.id}`">
            <Header :card="card" :display="display" 
                @display-items="displayItems">
            </Header>        
            <Item v-for="item in items" :item="item" v-show="displayThis"
                @show-info="showInfo">
            </Item>
        </div>
    </div>
</template>

<script setup>
import Header from './CardHeader.vue'
import Item from './CardItem.vue'
import { defineProps, ref, computed, onMounted, onUpdated } from 'vue';
import useCard from '@/composables/student/useUpdateLastCardStudent';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const props = defineProps(["card","index","display_this","display_last"]);
const emit = defineEmits(['show-info','display-card']) 

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
const { items, getItems, updateUserLastCard } = useCard()

onMounted(() => {
    getItems(token.value, props.card.id)
    if(props.card.id==props.display_last) {
        display.value = true
    }
})

//Show or hide items
const display = ref(false)

const displayItems = (card) => {
    display.value = !display.value;
    if (display.value) {
        emit("display-card",card)
    }
}

const displayThis = computed(() => {
    if (display.value && props.card.id==props.display_this)
    {
        updateUserLastCard(token.value, props.card.id)
        return true
    }
    display.value = false
    return false
})

function showInfo(info) {
    emit("show-info",info)
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