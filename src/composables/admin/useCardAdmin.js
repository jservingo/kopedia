import { ref } from 'vue'
import axios from "axios"
 
export default function useCardAdmin() {
    const card = ref({})
    const auth_error = ref('')

    const getCard = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/card/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.data.error)
                card.value = response.data.card;
            else
                auth_error.value = response.data.mensaje
        })
    } 

    return { card, auth_error, getCard } 
}