<template>
    <div class ="container-card-header">
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

<style>
.container-card-header {
    display: block;
    width: 100%;
    font-size: 17px;
    color:floralwhite;
}
.btn-display {
    width: 25px;
    font-size: 18px;
}
</style>