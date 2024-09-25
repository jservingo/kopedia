<template>
    <div class ="container-fluid container-page-header">
        <div>{{ title }} </div>
        <button @click="handleAddCard"
            class="btn btn-primary">
            Add card
        </button>  
        PageHeader  
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["title"]);
</script>

<style>
.container-page-header {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
</style>