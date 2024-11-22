<template>
    <div class="container-header d-flex">
        <div class ="container-fluid container-unit-button">
            <button @click="$emit('displayItems')" class="btn-display">
                <img :src="btnDisplay"/>
            </button> 
        </div>
        <div class ="container-fluid container-unit-title ml-auto">
            {{ title }} - UnitHeader
        </div>
        <div class ="container-fluid container-unit-progress">
            <div class="progress" style="height: 20px;">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <diV>Hola</diV>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps(["title","display"]);

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
    font-size: 14px;
    color: whitesmoke;
    line-height: 16px !important;
    padding-left: 6px;
}
.container-unit-button { 
    font-size: 18px;
    color: whitesmoke;
    width: 40px;
    padding-left: 12px;
    padding-right: 0px;
}
.container-unit-progress { 
    font-size: 14px;
    color: whitesmoke;
    width: 127px;
    padding-left: 0;
}
.btn-display {
    width: 28px;
    height: 30px; 
    padding: 0;
    font-size: 18px;
    border-radius: 30%;
}
</style>