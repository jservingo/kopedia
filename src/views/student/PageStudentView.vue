<template>
    <div v-if="page" class ="container-fluid container-page">
        <Unauthorized v-if="auth_error"></Unauthorized>
        <Header v-else :title="page.title"></Header>        
        <Card v-for="(card,index) in page.cards" :card="card" :index="index" 
            :display_this="display_this" :display_last="display_last"
            @show-info="showModalInfo"
            @display-card="displayCard">
        </Card>
    </div>

    <ModalInfo></ModalInfo>
</template>

<script setup>
import Header from '@/components/student/PageHeader.vue'
import Card from '@/components/student/PageCard.vue'
import Unauthorized from '@/components/UnauthorizedUser.vue'
import ModalInfo from "@/components/modals/ModalInfo.vue";
import usePage from '@/composables/student/usePageStudent';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { Modal } from "bootstrap";
//import alertify from 'alertifyjs';

let info_modal = null
let display_this = ref(-1)
let display_last = ref(-1)
//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get page 
const { page, auth_error, getPage } = usePage()
//Get id_card
const id_card = ref(route.params.id_card)
//console.log("id_card",id_card)

onMounted(() => {
    info_modal = new Modal(document.getElementById('modalInfo'))
    getPage(token.value, id.value)
    if (id_card.value!=-1) {
        display_this.value = id_card.value
        display_last.value = id_card.value
    }
})

const displayCard = (card) => {
    display_this.value = card.id 
    display_last.value = -1;
}

function showModalInfo(info) {
    document.getElementById('info').innerHTML=info
    info_modal.show()
}
</script>

<style scoped>
.container-page {
    display: block;
}
</style>