<template>
    <div class ="card card-unit" :style="{background:bgGradient }">
        <div class="card-body">
            <RouterLink class="link-unit-page link-underline link-underline-opacity-0" :to="`/admin/page/${page.id}`">{{ page.title }}</RouterLink>
            <button  @click="$emit('edit-page',page)" class="btn btn-primary">
                Edit page
            </button>
            <button @click="$emit('add-page-to-clipboard',page)" class="btn btn-primary">
                add page to clipboard
            </button>
            <button @click="$emit('delete-page',page)" class="btn btn-danger">
                Delete page 
            </button>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';

const props = defineProps(["page","index"]);
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
.card-unit {
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
.link-unit-page {
    font-size: 15px;
    color: floralwhite;
    border-bottom: 0;
}
</style>