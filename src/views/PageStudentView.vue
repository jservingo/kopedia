<template>
    <div v-if="page" class ="container-fluid container-page">
        <Header :title="page.title" :id="id"></Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"></Card>
    </div>
    <div v-else>
        Este curso no esta terminado.
    </div>
</template>

<script setup>
import Header from '../modules/page/student/PageHeader.vue'
import Card from '../modules/card/student/CardStudent.vue'
import { ref, onMounted } from 'vue';
import usePage from '../composables/usePageStudent';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get page 
const { page, getPage } = usePage()

onMounted(() => {
    getPage(token.value, id.value)
})
</script>

<style scoped>
.container-page {
    display: block;
}
</style>