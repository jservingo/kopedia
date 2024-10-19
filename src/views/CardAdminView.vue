<template>
    <div v-if="card" class ="container-fluid container-page">
        <Header :card="card"
            @add-item="showModalAddItem">
        </Header>
        <!--:options="options" :autoplay="autoplay" :videoPlayerId="videoPlayerId"-->
        <Item v-for="(item,index) in card.items" :item="item" :index="index"
            :voptions="{...videoOptions, sources:[{...videoOptions.sources[0], src:'http://localhost:4000/uploads/'+item.file}]}"
            @edit-item="showModalEditItem" @delete-item="deleteItem">
        </Item>
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
                            <input type="text" v-model="item.type" class="form-control" id="type" placeholder="">
                            <label for="type">Tipo</label>
                        </div>
                    </div>
                </div>
                <div v-show="item.type=='text'" class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="content" placeholder="">
                            <label for="content">Texto</label>
                        </div>
                    </div>
                </div>
                <div v-show="item.type=='image' || item.type=='audio' || item.type=='video'" class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="file" class="form-control" id="file" placeholder=""
                                v-on:change="showAddImage()">
                            <label for="file">File</label>
                        </div>
                    </div>
                </div>
                <div><img v-if="url_image" :src="url_image" width="50%"></div>
                <div v-show="item.type=='link'" class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="url" placeholder="">
                            <label for="url">URL</label>
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
                            <input type="text" v-model="eitem.type" readonly class="form-control" id="etype" placeholder="">
                            <label for="etype">Tipo</label>
                        </div>
                    </div>
                </div>
                <div v-show="eitem.type=='text'" class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="econtent" placeholder="">
                            <label for="econtent">Content</label>
                        </div>
                    </div>
                </div>
                <!--
                <div v-show="eitem.type=='image'" class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="file" class="form-control" id="efile" placeholder=""
                                v-on:change="showEditImage()">
                            <label for="efile">Image</label>
                        </div>
                    </div>
                </div>
                -->
                <div><img v-if="eurl_image" :src="eurl_image" width="50%"></div>
                <div v-show="eitem.type=='url'" class="row">
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
import Header from '../modules/admin/CardHeader.vue'
import Item from '../modules/admin/CardItem.vue'
import { ref, onMounted, computed } from 'vue';
import useCard from '@/composables/useCardAdmin';
import { useRoute } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

let modal = null
let emodal = null
const item = ref({})
const eitem = ref({})
const url_image = ref(null)
const eurl_image = ref(null)

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get card
const { card, getCard } = useCard()
const router = useRouter()
//Video
const videoOptions = ref({
    autoplay: true,
    controls: true,
    sources: [
        {     
            type: 'video/mp4'
        }
    ]
})

onMounted(() => {
    modal = new Modal(document.getElementById('modalNewItem'))
    emodal = new Modal(document.getElementById('modalEditItem'))
    getCard(token.value, id.value)
})

const urlFile = computed((item) => {
    console.log(item)
    return `http://localhost:4000/uploads/${item.file}`;
})

const showModalAddItem = () => {
    document.getElementById("type").value = ""
    document.getElementById("content").value = ""
    document.getElementById("file").value = ""
    document.getElementById("url").value = ""
    url_image.value = null
    modal.show()
}

const closeModalAddItem = () => {
    document.getElementById('type').value = ""
    document.getElementById('content').value = ""
    document.getElementById('file').value = ""
    document.getElementById('url').value = ""
    url_image.value = null
    modal.hide()
}

const showAddImage = () => {
    const file = document.getElementById("file").files[0]
    url_image.value = URL.createObjectURL(file); 
}

const saveModalAddItem = () => {
    let type = document.getElementById("type").value
    if (type=="text" || type=="formula" || type=="url")
        saveModalAddContent()
    else if (type=="image" || type=="audio" || type=="video")
        saveModalAddFile()
}

const saveModalAddContent = () => {
    if (isAuthenticated.value) {
        let type = document.getElementById("type").value
        let content = document.getElementById("content").value
        let url = document.getElementById("url").value   
        axios({
            method: "post",
            url: "http://localhost:4000/api/admin/item/create/content",
            data: {
                "id_card": card.value.id,
                "type": type,
                "content": content,
                "file": file, 
                "url": url
            }, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.item.error) {
                alertify.success("El item fue creado exitosamente")
                document.getElementById('type').value = ""
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

const saveModalAddFile = () => {
    if (isAuthenticated.value) {
        let type = document.getElementById("type").value
        let content = document.getElementById("content").value
        let file = document.getElementById("file").files[0]
        let url = document.getElementById("url").value
        let gurl = ""
        if (type=="image") {            
            gurl = "http://localhost:4000/api/admin/item/create/image"
        } else if (type=="video") {
            gurl = "http://localhost:4000/api/admin/item/create/video"
        } else if (type=="audio") {
            gurl = "http://localhost:4000/api/admin/item/create/audio"
        }      
        axios({
            method: "post",
            url: gurl,
            data: {
                "id_card": card.value.id,
                "type": type,
                "content": content,
                "file": file, 
                "url": url
            }, 
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.item.error) {
                alertify.success("El item fue creado exitosamente")
                document.getElementById('type').value = ""
                document.getElementById('content').value = ""
                document.getElementById('file').value = ""
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
    console.log(item.file)
    eitem.value = item;
    eurl_image.value = null
    if (item.type=="image" || item.type=="audio" || item.type=="video")
        eurl_image.value = `http://localhost:4000/uploads/${item.file}`
    document.getElementById("eid").value = item.id
    document.getElementById("etype").value = item.type
    document.getElementById("econtent").value = item.content
    document.getElementById("eurl").value = item.url
    emodal.show()
}

const closeModalEditItem = () => {
    document.getElementById('etype').value = ""
    document.getElementById('econtent').value = ""
    document.getElementById('eurl').value = ""
    eurl_image.value = null
    emodal.hide()
} 

const showEditImage = () => {
    const file = document.getElementById("efile").files[0]
    eurl_image.value = URL.createObjectURL(file); 
}

const saveModalEditItem = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid").value
        let type = document.getElementById("etype").value
        let content = document.getElementById("econtent").value
        let file = document.getElementById("efile").files[0]
        let url = document.getElementById("eurl").value
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/item/update`, 
            data: {"id":id, "type":type, "content":content, "file":file, "url":url}, 
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
                data: {"id":item.id,"type":item.type,"file":item.file}, 
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