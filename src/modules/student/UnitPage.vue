<template>
    <div class ="container-header">
        <div class ="d-flex">
            <div class ="container-fluid container-unit-page-header">
                <RouterLink class="link-unit-page link-underline link-underline-opacity-0" 
                    :to="`/student/page/${page.id}/-1/${titleSlug}`">{{ page.title }}
                </RouterLink>
            </div>
            <div class ="container-fluid container-unit-page-progress ml-auto">
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';
import slugify from '@sindresorhus/slugify';

const props = defineProps(["page"]);
const titleSlug = computed(() => { return slugify(props.page.title)})
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-unit-page-header {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
}
.container-unit-page-progress { 
    font-size: 14px;
    color: whitesmoke;
    width: 120px;
    padding-left: 0;
}
.link-unit-page {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
}
.link-unit-page:hover {
  color: rgb(30, 30, 255);;
}
</style>