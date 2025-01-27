import { ref } from 'vue'
import axios from "axios"
 
export default function useCardGuest() {
    const items = ref({})

    const getItems = async (id) => { 
        axios.get(`http://localhost:4000/api/guest/card/${id}`)
        .then(response => {
            items.value = response.data.card.items;
        })
    } 

    return { items, getItems } 
}