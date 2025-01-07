<template>
    <div v-if="page" class ="container-fluid container-page">
        <Header :title="page.title"></Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"
            @show-info="showModalInfo">
        </Card>
    </div>

    <div class="modal fade" tabindex="-1" id="modalInfo">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalInfo"> 
            </button>
          </div>
          <div class="modal-body">
            <div id="info"></div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
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
import { Modal } from "bootstrap";
//import alertify from 'alertifyjs';

let info_modal = null
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
    getPage(id.value)
})

function showModalInfo(info) {
    console.log("showInfo",info)
    document.getElementById('info').innerHTML=info
    info_modal.show()
}

const closeModalInfo = () => {
    info_modal.hide()
}
</script>

<style scoped>
.container-page {
    display: block;
}
</style>