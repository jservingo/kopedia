<template>
  <div class="modal fade" id="modalEditItem" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar item</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
              <div class="row">
                  <div class="xcol-lg-12">
                      <div class="form-floating mb-2">
                          <textarea class="form-control item-content" id="econtent" rows="8" cols="40" placeholder=""></textarea>
                          <label for="econtent">Content</label>
                      </div>
                  </div>
              </div>
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
              <div v-if="eitem.type=='image' && eurl_image">
                  <img :src="eurl_image" width="50%">
              </div>
          </form>  
        </div>
        <div class="modal-footer">
          <input type="hidden" id="eid" name="edit_id">
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
defineProps(["eitem","eurl_image"]);
</script>

<style scoped>
.item-content {
    height: 200px;
}
</style>