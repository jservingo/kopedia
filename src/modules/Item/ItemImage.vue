<template>
    <div class ="container-image">
        <div><img v-if="item.file" :src="urlFile" width="98%"></div>
        <p>File: {{ item.file }}</p>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps(["item"]);

const urlFile = computed(() => {
    return `http://localhost:4000/uploads/${props.item.file}`;
})


</script>

<style scoped>
.container-image {
    display: block;
    font-size: 15px;
    color: floralwhite;
    margin-bottom: 6px;
}
</style>