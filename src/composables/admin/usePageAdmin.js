import { ref } from 'vue'
import axios from "axios"
 
export default function usePageAdmin() {
    const page = ref({})
    const auth_error = ref('')

    const getPage = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/page/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.data.error)
                page.value = response.data.page;
            else
                auth_error.value = response.data.mensaje
        })
    } 

    return { page, auth_error, getPage } 
}