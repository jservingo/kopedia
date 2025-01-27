import { ref } from 'vue'
import axios from "axios"
import slugify from '@sindresorhus/slugify';
 
export default function useLastCardStudent() {
    const last_card = ref({})

    const getLastCard = async (token) => { 
        axios.get(`http://localhost:4000/api/student/last/card`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            last_card.value = response.data.last_card;
            last_card.value['title_slug'] = slugify(last_card.value.page_title)             
        })
    } 

    return { last_card, getLastCard } 
}