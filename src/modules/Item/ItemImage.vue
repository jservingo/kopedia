<template>
    <div class ="container-image">
        <div><img v-if="item.file" :src="urlFile" :style="options"></div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, computed } from 'vue';
import useItemOptions from '@/composables/useItemOptions';

const props = defineProps(["item"]);
const { options, getItemOptions } = useItemOptions()

onMounted(() => {
    getItemOptions(props.item)
})

const urlFile = computed(() => {
    return `http://localhost:4000/uploads/${props.item.file}`;
})
</script>

<style scoped>
.container-image {
    display: block;
    font-size: 16px;
    color: floralwhite;
    margin-bottom: 6px;    
}
</style>