<template>
    <div class ="card card-course">
        <div class="card-body">
            <div class ="container-fluid container-last-card-header">
                <h2>Deseas continuar viendo?</h2>
                <div class="last-card" v-for="card in cards"> 
                    <RouterLink class="link-last-card link-underline link-underline-opacity-0" 
                        :to="`/student/page/${card.id_page}/${card.id_card}/ver-pagina#card1`">
                        &emsp;{{ card.course_title }}<br>
                        &emsp;{{ card.unit_title }}<br>
                        &emsp;{{ card.page_title }}?        
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//:to="`/student/page/${last_card.id_page}/${last_card.id_card}/${titleSlug}#card${last_card.id_card}`">    
//:to="`{ name: '/student/page/${last_card.id_page}/${last_card.id_card}/${titleSlug}', hash: '#card${last_card.id_card}'`">
//:to="`/student/page/${last_card.id_page}/${last_card.id_card}/${titleSlug}`">
import { defineProps, ref, computed, onMounted } from 'vue';
import useLastCardStudent from '@/composables/student/useLastCardStudent';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);

//Get last_card
const { cards, getLastCards } = useLastCardStudent()

onMounted(() => {
    getLastCards(token.value)
})
</script>

<style>
.card-course {
    display: block;
    float: left;
    width: 100%;
    background: linear-gradient(to right, rgb(33, 179, 130), #839e96);    
    padding-top: 6px;
    padding-bottom: 6px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
.last-card {
    background-color: rgb(188, 209, 187);
    margin-bottom: 10px;
}
.link-last-card {
    font-size: 18px;
    color: rgb(14, 13, 13);
    line-height: 18px !important;
}
.link-last-card:hover {
  color: rgb(30, 30, 255);;
}
.container-last-card-header {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
    margin-bottom: 6px;
}
.container-last-card-progress { 
    font-size: 14px;
    color: whitesmoke;
    width: 110px;
    padding-left: 0;
}
.bx {
    background-color: rgb(109, 218, 182);
}
.tag {
    background-color: red;
    border-radius: 10px;
    padding: 3px 10px; 
    margin-left: 10px;
    width: 150px;
}
h2 {
    font-size: 20px;
    margin-bottom: 6px;
}
</style>