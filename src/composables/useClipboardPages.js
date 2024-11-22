import { ref } from 'vue'
import axios from "axios"
 
export default function useClipboardPages() {
    const pages = ref({})

    const getClipboard = async (token) => { 
        console.log("getClipboard Pages")
        axios.get(`http://localhost:4000/api/admin/clipboard/pages`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            pages.value = response.data.pages;
        })
    } 

    return { pages, getClipboard } 
}