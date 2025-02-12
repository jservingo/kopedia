<template>
  <div class="modal fade" id="modalNewItem" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5">Crear item</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="$emit('save')">
              Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["item"]);
</script>