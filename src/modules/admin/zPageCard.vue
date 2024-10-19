<template>
    <div class="card card-container" :style="{background:bgGradient }">
        <div class="card-body">
            <Header :card="card" :display="display" @display-items="displayItems"></Header>        
            <Item v-for="item in items" :item="item" v-show="display"></Item>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" id="modalNewItem">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear item</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" 
                @click="closeModalAddItem">
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
                @click="closeModalAddItem">Close
            </button>
            <button type="button" class="btn btn-primary" id="btnSave" 
                @click="saveModalAddItem">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="modalEditItem">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar item</h5>
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalEditItem">
            </button>
          </div>
          <div class="modal-body">
            <form name="formEdit">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="econtent" placeholder="">
                            <label for="econtent">Content</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="eurl" placeholder="">
                            <label for="eurl">URL</label>
                        </div>
                    </div>
                </div>
            </form>  
          </div>
          <div class="modal-footer">
            <input type="hidden" id="eid" name="eid" v-model="eitem.id">
            <button type="button" class="btn btn-secondary" 
                @click="closeModalEditItem">Close
            </button>
            <button type="button" class="btn btn-primary"  
                @click="saveModalEditItem">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import Header from './CardHeader.vue'
import Item from './CardItem.vue'
import { defineProps, ref, computed, onMounted } from 'vue';
import useCard from '@/composables/useCardAdmin';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

const props = defineProps(["card","index"]);
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#baac7f","#a8a8b5","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6]
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get card
const { items, getItems } = useCard()
let modal = null
let emodal = null
let eitem = ref({})

onMounted(() => {
    modal = new Modal(document.getElementById('modalNewItem'))
    emodal = new Modal(document.getElementById('modalEditItem'))
    getItems(token.value, props.card.id)
})

//Show or hide items
const display = ref(true);
const displayItems = (mode) => {
    display.value = !display.value;
}

const showModalAddItem = () => {
    console.log(eitem.value)
    modal.show()
}

const closeModalAddItem = () => {
    modal.hide()
}

const saveModalAddItem = () => {
    if (isAuthenticated.value) {
        let content = document.getElementById("content").value
        let url = document.getElementById("url").value
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/item/create`, 
            data: {
                "id_unit": unit.value.id,
                "content": content,
                "url": url
            }, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.item.error) {
                alertify.success("El item fue creado exitosamente")
                document.getElementById('content').value = ""
                document.getElementById('url').value = ""
                card.value.items.push(response.data.item)
                modal.hide()           
            }
            else {
                alertify.error("Error: No se pudo crear el item")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const showModalEditItem = (item) => {
    console.log('showModalEditItem')
    eitem.value = item;
    document.getElementById("eid").value = item.id
    document.getElementById("econtent").value = item.content
    document.getElementById("eurl").value = item.url
    emodal.show()
}

const closeModalEditItem = () => {
    console.log("closeModal")
    emodal.hide()
}

const saveModalEditItem = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid").value
        let content = document.getElementById("econtent").value
        let url = document.getElementById("eurl").value
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/item/update`, 
            data: {"id":id, "content":content, "url":url}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                eitem.value.content = content
                eitem.value.url = url
                alertify.success("El item fue modificado exitosamente")
                emodal.hide()            
            }
            else {
                alertify.error("Error: No se pudo modificar el item")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const deleteItem = (item) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar item', 'Esta seguro que desea eliminar este item?', function() { 
            card.value.items = card.value.items.filter((loopItem) => loopItem !== item);
            axios({
                method: "post",
                url: `http://localhost:4000/api/admin/item/delete`, 
                data: {"id": item.id}, 
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })
            .then(response => {
                if (!response.data.error) {
                    alertify.success("El item fue eliminado")
                }
                else {
                    alertify.error("Error: No se pudo eliminar el item")
                }
            })
        }, function() { 
            alertify.error('Cancel')
        });
    }
    else {
  		alertify.error("Please login first");
    }
};
</script>

<style>
.card-container {
    display: block;
    padding: 0px;
    padding-top: 3px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
</style>