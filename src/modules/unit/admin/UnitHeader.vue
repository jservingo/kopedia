<template>
    <div class ="container-fluid container-card-header">
        <button @click="$emit('displayItems')" class="btn-display">{{ btnDisplay }}</button> {{ title }}
        <button @click="handleEditUnit"
            class="btn">
            Edit
        </button>
        <button @click="handleDeleteUnit"
            class="btn">
            Delete
        </button>
        <button @click="handleAddPage"
            class="btn">
            Add Page
        </button>
    </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps(["title","display"]);
//Change button - or +
const btnDisplay = computed(() => {
    if (props.display)
        return("-")
    return("+")
})
</script>

<style>
.container-card-header {
    display: block;
    width: 100%;
    font-size: 17px;
    color:floralwhite;
}
.btn-display {
    width: 26px;
    padding: 0 8px;
    font-size: 18px;
}
</style>