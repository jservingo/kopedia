<template>
    <div class="container-header d-flex">
        <div class ="container-fluid container-card-button">
            <button @click="$emit('displayItems',card)" class="btn-display">
                <img :src="btnDisplay"/>
            </button>
        </div>
        <div class ="container-fluid container-card-title ml-auto">
            {{ card.title }}
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps(["card","display"]);

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
.container-card-title {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
}
.container-card-button { 
    font-size: 14px;
    color: whitesmoke;
    width: 35px;
}
.btn-display {
    width: 28px;
    height: 30px; 
    padding: 0;
    font-size: 18px;
    border-radius: 30%;
}
</style>