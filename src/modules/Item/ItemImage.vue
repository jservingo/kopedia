<template>
    <div class ="container-image" :style="options">
        <div><img v-if="item.file" :src="urlFile" :style="eoptions"></div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, computed } from 'vue';
import useItemOptions from '@/composables/useItemOptions';

const props = defineProps(["item"]);
const { options, eoptions, getItemOptions } = useItemOptions()

onMounted(() => {
    getItemOptions(props.item)
    console.log(eoptions.value)
})

const urlFile = computed(() => {
    return `http://localhost:4000/uploads/${props.item.file}`;
})
</script>

<style scoped>
.container-image {
    display: block;
    width:80%; min-width:300px;
    background:rgb(228, 230, 236);
    color:rgb(8, 19, 51);
    border: 4px solid rgb(8, 19, 51);
    border-radius: 10px;
    font-size: 16px; line-height: 20px !important;
    margin-left: auto; margin-right: auto;
    margin-bottom: 6px;    
}
img {
    width:80%;
    display:block;
    margin-left: auto;
    margin-right: auto;
}
</style>