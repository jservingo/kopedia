import { ref } from 'vue'
import axios from "axios"
 
export default function usePageAdmin() {
    const page = ref({})

    const getPage = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/page/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            page.value = response.data.page[0];
        })
    } 

    return { page, getPage } 
}