<template>
    <div class="container-text" v-html="content" :style="options"></div>
</template>

<script setup>
import useItemOptions from '@/composables/useItemOptions';
import useScript from '@/composables/useScript';
import { defineProps, onMounted, ref, computed } from 'vue';

const props = defineProps(["item"]);
const { options, getItemOptions } = useItemOptions()
const refreshkey = ref(0)

onMounted(async () => {
    getItemOptions(props.item)
    await useScript("https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML");
    refreshkey.value++
})

const content = computed(() => {
    refreshkey.value
    let content = props.item.content
    content = content.replaceAll('font:strong', 'font-weight:700')
    //content = content.replaceAll('color:#blue', 'color:rgb(163, 184, 230)')
    return content
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
.prueba-de-colores {
    background-color: rgb(124, 124, 124);
    border-radius: 20px;
    border: 10px double;
}
</style>