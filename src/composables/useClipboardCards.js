import { ref } from 'vue'
import axios from "axios"
 
export default function useClipboardCards() {
    const cards = ref({})

    const getClipboard = async (token) => { 
        console.log("getClipboard Cards")
        axios.get(`http://localhost:4000/api/admin/clipboard/cards`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            cards.value = response.data.cards;
        })
    } 

    return { cards, getClipboard } 
}