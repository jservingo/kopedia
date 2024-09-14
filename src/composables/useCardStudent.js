import { ref } from 'vue'
import axios from "axios"
 
export default function useCard() {
    const items = ref({})

    const getItems = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/card/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            items.value = response.data.card.items;
        })
    } 

    return { items, getItems } 
}