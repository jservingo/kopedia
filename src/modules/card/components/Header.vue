<template>
    <div class ="container-header">
        <button @click="$emit('displayItems')"  class="btn-display">{{ btnDisplay }}</button> {{ title }}
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
//@click="greet"
/*
const name = ref('Vue.js')
function greet() {
  alert(`Hello ${name.value}!`)
}
*/
</script>

<style scoped>
.container-header {
    display: block;
    width: 100%;
    font-size: 18px;
}
.btn-display {
    width:
    font-size: 18px;
}
</style>