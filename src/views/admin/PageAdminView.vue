<template>
    <div v-if="page" class ="container-fluid container-page">
        <Header :page="page"
            @add-card="showModalAddCard"
            @show-clipboard="showModalClipboard">
        </Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"
            @down-card="downCard"
            @up-card="upCard"
            @edit-card="showModalEditCard" 
            @add-card-to-clipboard="addCardToClipboard"
            @delete-card="deleteCard">
        </Card>
    </div>

    <ModalNew title="Crear unidad"
        @save="saveModalAddCard">
    </ModalNew>
    
    <ModalEdit title="Editar unidad"
        @save="saveModalEditCard">
    </ModalEdit>
    
    <ModalClipboard @save="saveModalClipboard">
        <div v-for="card in cards" class="row">
            <div class="xcol-lg-12">
                <div class="form-floating mb-2">
                    <input type='checkbox' name='option' :value="card.id"/>
                    {{ card.title }}
                </div>
            </div>
        </div>
    </ModalClipboard>
</template>

<script setup>
import Header from '@/modules/admin/PageHeader.vue'
import Card from '@/modules/admin/PageCard.vue'
import ModalNew from "@/modules/modals/ModalNew.vue";
import ModalEdit from "@/modules/modals/ModalEdit.vue";
import ModalClipboard from "@/modules/modals/ModalClipboard.vue";
import { ref, onMounted } from 'vue';
import usePage from '@/composables/admin/usePageAdmin';
import useClipboardCards from '@/composables/admin/useClipboardCards';
import { useRoute } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

let new_modal = null
let edit_modal = null
let clipboard_modal = null
let edit_card = ref({})

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get page 
const { page, getPage } = usePage()
//Get Clipboard cards
const { cards, getClipboard } = useClipboardCards()
const router = useRouter()

onMounted(() => {
    new_modal = new Modal(document.getElementById('modalNew'))
    edit_modal = new Modal(document.getElementById('modalEdit'))
    clipboard_modal = new Modal(document.getElementById('modalClipboard'))
    getPage(token.value, id.value)
    getClipboard(token.value)
})

const showModalAddCard = () => {
    new_modal.show()
}

const saveModalAddCard = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("new_title").value
        title = title.substr(0,255)
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/card/create`, 
            data: {"id_page":page.value.id, "title":title}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.card.error) {
                alertify.success("La tarjeta fue creada exitosamente")
                document.getElementById('new_title').value = ""
                router.push(`/admin/card/${response.data.card.id}`) 
                //page.value.cards.push(response.data.card)
                new_modal.hide()           
            }
            else {
                //alertify.error("Error: No se pudo crear la tarjeta")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const addCardToClipboard = (card) => {
    if (isAuthenticated.value) {
        if (cards.value.find(loopCard => loopCard.id==card.id)) {
            alertify.warning("Esta unidad ya fue añadida al portapapeles")
            return; 
        }
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/clipboard/card/add`, 
            data: {"id_card":card.id}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                cards.value.push(card)
                alertify.success("La tarjeta fue añadida al portapapeles")       
            }
            else {
                alertify.error("Error: No se pudo añadir la tarjeta al portapapeles")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
}

const showModalClipboard = () => {
    clipboard_modal.show()
}

const saveModalClipboard = () => {
    if (isAuthenticated.value) {
        let checkboxes = document.getElementsByName('option');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                const card_id = checkboxes[i].value
                if (page.value.cards.find(card => card.id==card_id)) {
                    break;
                }
                axios({
                    method: "post",
                    url: `http://localhost:4000/api/admin/card/update/page`, 
                    data: {"id_card":card_id,"id_page":page.value.id}, 
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    }
                })
                .then(response => {
                    if (!response.data.error) {
                        const card = response.data.card
                        page.value.cards.push(card)
                        cards.value = cards.value.filter(loopItem => loopItem.id !== card.id)
                        alertify.success("La tarjeta fue añadida a la página")                               
                    }
                    else {
                        alertify.error("Error: No se pudo añadir la tajeta a la página")
                    }
                })
            }
        }        
    }
    else {
  		alertify.error("Please login first");
    }
    clipboard_modal.hide()
};

const showModalEditCard = (card) => {
    edit_card.value = card;
    document.getElementById("edit_id").value = card.id
    document.getElementById("edit_title").value = card.title
    edit_modal.show()
}

const saveModalEditCard = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("edit_id").value
        let title = document.getElementById("edit_title").value
        title = title.substr(0,255)
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/card/update`, 
            data: {"id":id, "title":title}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                edit_card.value.title = title
                alertify.success("La tarjeta fue modificada exitosamente")
                edit_modal.hide()            
            }
            else {
                alertify.error("Error: No se pudo modificar la tarjeta")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const upCard = (card) => {
    if (isAuthenticated.value) {
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/card/update/up`, 
            data: {"id":card.id,"id_page":id.value}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                getPage(token.value, id.value)
                //alertify.success("La unidad fue modificada exitosamente")          
            }
            else {
                //alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
}

const downCard = (card) => {
    if (isAuthenticated.value) {
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/card/update/down`, 
            data: {"id":card.id,"id_page":id.value}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                getPage(token.value, id.value)
                //alertify.success("La unidad fue modificada exitosamente")        
            }
            else {
                //alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
}

const deleteCard = (card) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar tarjeta', 'Esta seguro que desea eliminar esta tarjeta?', function() { 
            axios({
                method: "post",
                url: `http://localhost:4000/api/admin/card/delete`, 
                data: {"id": card.id}, 
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })
            .then(response => {
                if (!response.data.error) {
                    page.value.cards = page.value.cards.filter((loopItem) => loopItem !== card)
                    alertify.success("La tarjeta fue eliminada")
                }
                else {
                    alertify.error("Error: No se pudo eliminar la tarjeta")
                }
            })
        }, function() { 
            //alertify.error('Cancel')
        });
    }
    else {
  		alertify.error("Please login first");
    }
};
</script>

<style scoped>
.container-page {
    display: block;
}
</style>