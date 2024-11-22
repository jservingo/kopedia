<template>
    <div class ="container-header d-flex">
        <div class ="container-fluid container-page-header">
            <span>{{ title }} - PageHeader</span>
        </div> 
        <div class ="container-fluid container-page-progress ml-auto">
            <div class="progress" style="height: 20px;">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </div>  
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["title"]);
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-page-header {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
}
.container-page-progress { 
    font-size: 14px;
    color: whitesmoke;
    width: 120px;
    padding-left: 0;
}
</style>