<template>
    <div class ="container-page">
        <Header :title="page.title" :id="id"></Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"></Card>
    </div>
</template>

<script setup>
import Header from '../modules/page/components/Header.vue'
import Card from '../modules/card/components/Card.vue'
import { ref, onMounted } from 'vue';
import usePage from '../composables/usePage';
import { useRoute } from 'vue-router';
//Get id
const route = useRoute()
const id = ref(route.params.id);
//Get page 
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