<template>
    <div class="container-header d-flex">
        <div class ="container-fluid container-unit-button">
            <button @click="$emit('displayPages',unit)" class="btn-display">
                <img :src="btnDisplay"/>
            </button>
        </div>
        <div class ="container-fluid container-unit-title ml-auto">
            {{ unit.title }}
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';

const props = defineProps(["unit","display"]);

//Change button - or +
const btnDisplay = computed(() => {
    if (props.display)
        return("/src/assets/minus.svg")
    return("/src/assets/plus.svg")
})
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-unit-title {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
    padding-left: 6px;
}
.container-unit-button { 
    font-size: 14px;
    color: whitesmoke;
    width: 40px;
    padding-left: 12px;
    padding-right: 0px;
}
.btn-display {
    width: 28px;
    height: 30px; 
    padding: 0;
    font-size: 18px;
    border-radius: 30%;
}
</style>