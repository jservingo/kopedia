<template>
    <div class ="container-page">
        <Header :title="page.title"></Header>
        <Card v-for="(card,index) in page.cards" :card="card" :index="index"></Card>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import Card from '../../card/components/Card.vue'
import { ref } from 'vue';
/*
const data = fs.readFileSync('../../../../public/000001-01-01.json')
const page = ref(JSON.parse(data))
*/    
const page = ref({
    id: 1,
    id_course: 1,
    id_unit: 1,
    course: 'Curso de Matematicas - Prueba',
    unit: 'Trigonometria',
    title: 'Funciones Trigonométricas',
    cards: [
        {
            id: 1,
            title: 'Seno y coseno',
            items: [
                {
                    type: 'text',
                    text: 'texto 1'
                },
                {
                    type: 'audio',
                    url: 'url-audio 1'
                },
                {
                    type: 'formula',
                    formula: `        
                        <math>             
                        <mfrac>          
                            <msup>         
                            <mi>x</mi>   
                            <msqrt>      
                                <mn>5</mn> 
                            </msqrt>
                            </msup>
                            <mrow>         
                            <mi>α</mi>   
                            <mo>×</mo>   
                            <mn>7</mn>   
                            </mrow>
                        </mfrac>  
                        </math>`
                }
            ]   
        }, 
        {
            id: 2,
            title: 'Graficación',
            items: [
                {
                    type: 'text',
                    text: 'texto 2'
                },
                {
                    type: 'video',
                    url: 'url-video 2'
                },
                {
                    type: 'image',
                    url: 'url-image 2'
                }
            ]   
        }, 
    ]
})
</script>

<style scoped>
.container-page {
    display: block;
    font-size: 22px;
}
</style>