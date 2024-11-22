import { ref } from 'vue'
import axios from "axios"
 
export default function useClipboardItems() {
    const items = ref({})

    const getClipboard = async (token) => { 
        console.log("getClipboard Items")
        axios.get(`http://localhost:4000/api/admin/clipboard/items`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            items.value = response.data.items;
        })
    } 

    return { items, getClipboard } 
}