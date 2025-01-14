<template>
    <div v-if="page" class ="container-fluid container-page">
        <Header :title="page.title"></Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index" 
            :display_this="display_this"
            @show-info="showModalInfo"
            @display-card="displayCard">
        </Card>
    </div>

    <ModalInfo></ModalInfo>
</template>

<script setup>
import Header from '../modules/student/PageHeader.vue'
import Card from '../modules/student/PageCard.vue'
import ModalInfo from "../modules/modals/ModalInfo.vue";
import { ref, onMounted } from 'vue';
import usePage from '../composables/usePageStudent';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { Modal } from "bootstrap";
//import alertify from 'alertifyjs';

let info_modal = null
let display_this = ref(-1)
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
    info_modal = new Modal(document.getElementById('modalInfo'))
    getPage(token.value, id.value)
})

const displayCard = (card) => {
    display_this.value = card.id 
}

function showModalInfo(info) {
    console.log("showInfo",info)
    document.getElementById('info').innerHTML=info
    info_modal.show()
}
</script>

<style scoped>
.container-page {
    display: block;
}
</style>