<template>
    <div class ="card card-card" :style="{background:bgGradient }">
        <div class="card-body">
            <RouterLink class="link-card-page link-underline link-underline-opacity-0" :to="`/admin/card/${card.id}`">Card {{ index }}</RouterLink>
            <button  @click="$emit('edit-card',card)" class="btn btn-primary">
                Edit card 
            </button>
            <button @click="$emit('delete-card',card)" class="btn btn-danger">
                Delete card
            </button>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';

const props = defineProps(["card","index"]);
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6] 
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})
</script>

<style>
.card-card {
    float: left;
    width: 260px;
    height: 140px;
    padding-left: 10px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
.link-card-page {
    font-size: 15px;
    color: floralwhite;
    border-bottom: 0;
}
</style>