<template>
    <div class="container-text" v-html="fcontent" :style="options"></div>
</template>

<script setup>
import useItemOptions from '@/composables/useItemOptions';
import { defineProps, onMounted, ref, computed } from 'vue';

const props = defineProps(["item"]);
const { options, getItemOptions } = useItemOptions()

onMounted(async () => {
    getItemOptions(props.item)
})

const fcontent = computed(() => {
    let fcontent = props.item.fcontent
    return fcontent
});
</script>

<style scoped>
.container-text {
    display: block;
    font-size: 16px;
    line-height: 18px !important;
    margin-bottom: 10px;
}
.subtitle {
    font-weight: 700;
    color: rgb(9, 25, 75);
}
ul li {
    list-style-type: square !important;
}
</style>