<template>
    <div v-if="page" class ="container-fluid container-page">
        <Header :title="page.title"></Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"></Card>
    </div>
</template>

<script setup>
import Header from '../modules/guest/PageHeader.vue'
import Card from '../modules/guest/PageCard.vue'
import { ref, onMounted } from 'vue';
import usePage from '../composables/usePageGuest';
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
    getPage(id.value)
})
</script>

<style scoped>
.container-page {
    display: block;
}
</style>