<template>
    <div class ="container-page">
        <Header :title="page.title"></Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"></Card>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import Card from '../../card/components/Card.vue'
import { ref, onMounted } from 'vue';
import usePage from '../../../composables/usePage';

const { page, getPage } = usePage()
onMounted(() => {
    getPage()
})
</script>

<style scoped>
.container-page {
    display: block;
}
</style>