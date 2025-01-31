import { ref } from 'vue'
import axios from "axios"
import slugify from '@sindresorhus/slugify';
 
export default function useLastCardStudent() {
    const cards = ref({})

    const getLastCards = async (token) => { 
        axios.get(`http://localhost:4000/api/student/last/cards`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            cards.value = response.data.cards;
            //last_card.value['title_slug'] = slugify(last_card.value.page_title)             
        })
    } 

    return { cards, getLastCards } 
}