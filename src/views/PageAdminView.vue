<template>
    <div v-if="page" class ="container-fluid container-page">
        <Header :page="page"
            @add-card="showModalAddCard">
        </Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"
            @edit-card="showModalEditCard" @delete-card="deleteCard">
        </Card>
    </div>

    <div class="modal fade" tabindex="-1" id="modalNewCard">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear tarjeta</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" 
                @click="closeModalAddCard">
            </button>
          </div>
          <div class="modal-body">
            <form name="formNew">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="title" placeholder="">
                            <label for="tilte">Titulo</label>
                        </div>
                    </div>
                </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" 
                @click="closeModalAddCard">Close
            </button>
            <button type="button" class="btn btn-primary" id="btnSave" 
                @click="saveModalAddCard">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="modalEditCard">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar tarjeta</h5>
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalEditCard">
            </button>
          </div>
          <div class="modal-body">
            <form name="formEdit">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="etitle" placeholder="">
                            <label for="etilte">Titulo</label>
                        </div>
                    </div>
                </div>
            </form>  
          </div>
          <div class="modal-footer">
            <input type="hidden" id="eid" name="eid" v-model="ecard.id">
            <button type="button" class="btn btn-secondary" 
                @click="closeModalEditCard">Close
            </button>
            <button type="button" class="btn btn-primary"  
                @click="saveModalEditCard">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import Header from '../modules/admin/PageHeader.vue'
import Card from '../modules/admin/PageCard.vue'
import { ref, onMounted } from 'vue';
import usePage from '../composables/usePageAdmin';
import { useRoute } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

let modal = null
let emodal = null
let ecard = ref({})

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get page 
const { page, getPage } = usePage()
const router = useRouter()

onMounted(() => {
    modal = new Modal(document.getElementById('modalNewCard'))
    emodal = new Modal(document.getElementById('modalEditCard'))
    getPage(token.value, id.value)
})

const showModalAddCard = () => {
    modal.show()
}

const closeModalAddCard = () => {
    modal.hide()
}

const saveModalAddCard = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("title").value
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
                document.getElementById('title').value = ""
                router.push(`/admin/card/${response.data.card.id}`) 
                //page.value.cards.push(response.data.card)
                modal.hide()           
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

const showModalEditCard = (card) => {
    ecard.value = card;
    document.getElementById("eid").value = card.id
    document.getElementById("etitle").value = card.title
    emodal.show()
}

const closeModalEditCard = () => {
    emodal.hide()
}

const saveModalEditCard = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid").value
        let title = document.getElementById("etitle").value
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
                ecard.value.title = title
                alertify.success("La tarjeta fue modificada exitosamente")
                emodal.hide()            
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

const deleteCard = (card) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar tarjeta', 'Esta seguro que desea eliminar esta tarjeta?', function() { 
            page.value.cards = page.value.cards.filter((loopItem) => loopItem !== card);
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