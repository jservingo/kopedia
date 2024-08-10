<template>
    <div class ="container-page">
        <Header :title="page.title" :id="id"></Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"></Card>
    </div>
</template>

<script setup>
import Header from '../modules/page/admin/Header.vue'
import Card from '../modules/card/admin/Card.vue'
import { ref, onMounted } from 'vue';
import usePage from '../composables/usePageAdmin';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const store = useAuthStore()
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