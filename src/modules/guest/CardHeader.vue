<template>
    <div class ="container-fluid  container-card-header">
        <!--<button @click="$emit('displayItems')" class="btn-display">{{ btnDisplay }}</button>--> 
        {{ title }} CardHeader
    </div>
</template>

<script setup>
import { defineProps} from 'vue';
const props = defineProps(["title"]);
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