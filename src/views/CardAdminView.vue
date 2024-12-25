<template>
    <div v-if="card" class ="container-fluid container-page">
        <Header :card="card"
            @add-item="showModalAddItem"
            @show-clipboard="showModalClipboard">
        </Header>
        <!--:voptions="{...videoOptions, sources:[{...videoOptions.sources[0], src:'http://localhost:4000/uploads/'+item.file}]}"-->
        <Item v-for="(item,index) in card.items" :item="item" :index="index"            
            @down-item="downItem"
            @up-item="upItem"
            @edit-item="showModalEditItem" 
            @add-item-to-clipboard="addItemToClipboard"
            @delete-item="deleteItem">
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
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <select v-model="item.type">
                                <option value="text">Texto</option>
                                <option value="image">Imagen</option>
                                <option value="audio">Audio</option>
                                <option value="video">Video</option>
                                <option value="formula">Formula</option>
                            </select>
                            <!--<input type="text" v-model="item.type" class="form-control" id="type" placeholder="">
                            <label for="type">Tipo</label>
                            -->
                        </div>
                    </div>
                </div>
                <!-- v-show="item.type=='text' || item.type=='formula'" -->
                <div class="row">
                    <div class="x-12">
                        <div class="form-floating mb-2">
                            <textarea class="form-control item-content" id="content" rows="8" cols="40" placeholder=""></textarea>
                            <label for="content">Texto</label>
                        </div>
                    </div>
                </div>
                <div v-show="item.type=='image' || item.type=='audio' || item.type=='video'" class="row">
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <input type="file" class="form-control" id="file" placeholder=""
                                v-on:change="showAddImage()">
                            <label for="file">File</label>
                        </div>
                    </div>
                </div>
                <div v-show="item.type=='link'" class="row">
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="url" placeholder="">
                            <label for="url">URL</label>
                        </div>
                    </div>
                </div>
                <div class="xcol-lg-12">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="options" height="96" placeholder="">
                        <label for="options">Options</label>
                    </div>
                </div>
                <div v-if="item.type=='image' && url_image">
                    <img :src="url_image" width="50%">
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
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <span>{{ eitem.type }}</span>
                        </div>
                    </div>
                </div>
                <!-- v-show="eitem.type=='text' || eitem.type=='formula'" -->
                <div class="row">
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <textarea class="form-control item-content" id="econtent" rows="8" cols="40" placeholder=""></textarea>
                            <label for="econtent">Content</label>
                        </div>
                    </div>
                </div>
                <!--
                <div v-show="eitem.type=='image'" class="row">
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <input type="file" class="form-control" id="efile" placeholder=""
                                v-on:change="showEditImage()">
                            <label for="efile">Image</label>
                        </div>
                    </div>
                </div>
                -->
                <div v-show="eitem.type=='url'" class="row">
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="eurl" placeholder="">
                            <label for="eurl">URL</label>
                        </div>
                    </div>
                </div>
                <div class="xcol-lg-12">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="eoptions" height="96" placeholder="">
                        <label for="eoptions">Options</label>
                    </div>
                </div>
                <div v-if="eitem.type=='image' && url_image">
                    <img :src="eurl_image" width="50%">
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

    <div class="modal fade" tabindex="-1" id="modalClipboard">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Papelera</h5>
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalClipboard"> 
            </button>
          </div>
          <div class="modal-body">
            <form name="formClipboard">
                <div v-for="item in items" class="row">
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <input type='checkbox' name='option' :value="item.id"/>
                            {{ item.type }} 
                            <span v-if="item.content">- {{ scontent(item) }}</span>
                            <span v-if="item.file">- {{ item.file }}</span>
                        </div>
                    </div>
                </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" 
                @click="closeModalClipboard">Close
            </button>
            <button type="button" class="btn btn-primary"  
                @click="saveModalClipboard">
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
import useClipboardItems from '@/composables/useClipboardItems';
import { useRoute } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

let modal = null
let edit_modal = null
let clipboard_modal = null
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
//Get Clipboard items
const { items, getClipboard } = useClipboardItems()
const router = useRouter()
//Video Player options
/*
const videoOptions = ref({
    language: 'es',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    width: '800px',
    autoplay: true,
    controls: true,
    sources: [
        {     
            type: 'video/mp4'
        }
    ]
})
*/

onMounted(() => {
    modal = new Modal(document.getElementById('modalNewItem'))
    edit_modal = new Modal(document.getElementById('modalEditItem'))
    clipboard_modal = new Modal(document.getElementById('modalClipboard'))
    getCard(token.value, id.value)
    getClipboard(token.value)
})

const urlFile = computed((item) => {
    console.log(item)
    return `http://localhost:4000/uploads/${item.file}`;
})

const scontent = (item) => {
    let content = item.content
    content = content.replace(/<[^>]*>/g, '')
    content = content.substring(0,100)
    return content
}

const showModalAddItem = () => {
    item.value.type = "text"
    document.getElementById("content").value = ""
    document.getElementById("options").value = ""
    document.getElementById("file").value = ""
    document.getElementById("url").value = ""
    url_image.value = null
    modal.show()
}

const closeModalAddItem = () => {
    item.value.type = ""
    document.getElementById('content').value = ""
    document.getElementById('options').value = ""
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
    let type = item.value.type
    if (type=="text" || type=="formula" || type=="url")
        saveModalAddContent()
    else if (type=="image" || type=="audio" || type=="video")
        saveModalAddFile()
}

const saveModalAddContent = () => {
    if (isAuthenticated.value) {
        let type = item.value.type
        let content = document.getElementById("content").value
        let options = document.getElementById("options").value
        let url = document.getElementById("url").value   
        axios({
            method: "post",
            url: "http://localhost:4000/api/admin/item/create/content",
            data: {
                "id_card": card.value.id,
                "type": type,
                "content": content,
                "options": options,
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
                item.value.type = ""
                document.getElementById('content').value = ""
                document.getElementById('options').value = ""
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
        let type = item.value.type
        let content = document.getElementById("content").value
        let options = document.getElementById("options").value
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
                "options": options,
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
                item.value.type = ""
                document.getElementById('content').value = ""
                document.getElementById('options').value = ""
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

const addItemToClipboard = (item) => {
    if (isAuthenticated.value) {
        if (items.value.find(loopItem => loopItem.id==item.id)) {
            alertify.warning("Este item ya fue añadido al portapapeles")
            return; 
        }
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/clipboard/item/add`, 
            data: {"id_item":item.id}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                items.value.push(item)
                alertify.success("El item fue añadido al portapapeles")       
            }
            else {
                alertify.error("Error: No se pudo añadir el item al portapapeles")
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

const closeModalClipboard = () => {
    clipboard_modal.hide()
}

const saveModalClipboard = () => {
    if (isAuthenticated.value) {
        let checkboxes = document.getElementsByName('option');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                const item_id = checkboxes[i].value
                if (card.value.items.find(item => item.id==item_id)) {
                    break;
                }
                axios({
                    method: "post",
                    url: `http://localhost:4000/api/admin/item/update/card`, 
                    data: {"id_item":item_id,"id_card":card.value.id}, 
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    }
                })
                .then(response => {
                    if (!response.data.error) {
                        const item = response.data.item
                        card.value.items.push(item)
                        items.value = items.value.filter(loopItem => loopItem.id !== item.id)
                        alertify.success("El item fue añadido a la tarjeta")                               
                    }
                    else {
                        alertify.error("Error: No se pudo añadir el item a la tarjeta")
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

const showModalEditItem = (item) => {
    console.log(item.file)
    eitem.value = item;
    eurl_image.value = null
    if (item.type=="image" || item.type=="audio" || item.type=="video")
        eurl_image.value = `http://localhost:4000/uploads/${item.file}`
    document.getElementById("eid").value = item.id
    //document.getElementById("etype").value = item.type
    document.getElementById("econtent").value = item.content
    document.getElementById("eoptions").value = item.options
    document.getElementById("eurl").value = item.url
    edit_modal.show()
}

const closeModalEditItem = () => {
    //document.getElementById('etype').value = ""
    document.getElementById('econtent').value = ""
    document.getElementById('options').value = ""
    document.getElementById('eurl').value = ""
    eurl_image.value = null
    edit_modal.hide()
} 

const showEditImage = () => {
    const file = document.getElementById("efile").files[0]
    eurl_image.value = URL.createObjectURL(file); 
}

const saveModalEditItem = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid").value
        let type = eitem.value.type
        let content = document.getElementById("econtent").value
        let options = document.getElementById("eoptions").value
        let file = ""
        /*
        (OJO) ELIMINAR ESTO 
        if (type=="video" || type=="audio")
            file = document.getElementById("efile").files[0]
        */
        let url = document.getElementById("eurl").value
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/item/update`, 
            data: {"id":id, "type":type, "content":content, "options":options, "file":file, "url":url}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                eitem.value.content = content
                eitem.value.fcontent = response.data.fcontent
                eitem.value.options = options                
                eitem.value.url = url
                alertify.success("El item fue modificado exitosamente")
                edit_modal.hide()            
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

const upItem = (item) => {
    if (isAuthenticated.value) {
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/item/update/up`, 
            data: {"id":item.id,"id_card":id.value}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                getCard(token.value, id.value)
                //alertify.success("La unidad fue modificada exitosamente")          
            }
            else {
                //alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
}

const downItem = (item) => {
    if (isAuthenticated.value) {
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/item/update/down`, 
            data: {"id":item.id,"id_card":id.value}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                getCard(token.value, id.value)
                //alertify.success("La unidad fue modificada exitosamente")        
            }
            else {
                //alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
}

const deleteItem = (item) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar item', 'Esta seguro que desea eliminar este item?', function() {             
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
                    card.value.items = card.value.items.filter((loopItem) => loopItem !== item)
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
.item-content {
    height: 200px;
}
</style>