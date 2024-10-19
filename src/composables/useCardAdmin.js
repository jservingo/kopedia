import { ref } from 'vue'
import axios from "axios"
 
export default function useCard() {
    const card = ref({})

    const getCard = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/card/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            card.value = response.data.card;
        })
    } 

    return { card, getCard } 
}