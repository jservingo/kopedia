<template>
    <div class ="container-header">
        <div class ="d-flex">
            <div class ="container-fluid container-unit-page-header">
                <RouterLink class="link-unit-page link-underline link-underline-opacity-0" :to="`/student/page/${page.id}`">{{ page.title }}</RouterLink>
            </div>
            <div class ="container-fluid container-unit-page-progress ml-auto">
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    <div>UnitPage</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
defineProps(["page"]);
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-unit-page-header {
    font-size: 14px;
    color: whitesmoke;
    line-height: 16px !important;
}
.container-unit-page-progress { 
    font-size: 14px;
    color: whitesmoke;
    width: 120px;
    padding-left: 0;
}
.link-unit-page {
    font-size: 14px;
    color: whitesmoke;
    line-height: 15px !important;
}
</style>