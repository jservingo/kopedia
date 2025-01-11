<template>
    <!-- Modal -->
    <div class="modal fade" id="modalNew" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fs-5">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form name="formNew">
                <div class="row">
                    <div class="xcol-lg-12">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="new_title" placeholder="">
                            <label for="new_tilte">Título</label>
                        </div>
                    </div>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" 
                @click="$emit('save')">
                Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
defineProps(["title"]);
</script>