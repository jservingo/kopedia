<template>
    <div class="container-header d-flex">
        <div class ="container-fluid container-page-header"> 
            <span>{{ page.title }}</span>
        </div>
        <div class ="container-fluid container-page-buttons ml-auto">        
            <button @click="$emit('add-card')" class="btn btn-add">
                <img src="@/assets/add.svg"/>
            </button>&nbsp;
            <button @click="$emit('show-clipboard')" class="btn btn-clipboard">
                <img src="@/assets/clipboard.png"/>
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["page"]);
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-page-header {
    font-size: 22px;
    color: whitesmoke;
    line-height: 24px !important;
}
.container-page-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 120px;
}
.btn-add {
    background-color: #82a1c9 !important;
    padding: 0;
}
.btn-clipboard {
    background-color: #b8c57d !important;
    padding: 0;
}
</style>