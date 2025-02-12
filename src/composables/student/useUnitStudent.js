import { ref } from 'vue'
import axios from "axios"
 
export default function useUnitStudent() {
    const pages = ref({})
    const auth_error = ref('')

    const getPages = async (token, id) => { 
        axios.get(`http://localhost:4000/api/student/unit/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.data.error) 
                pages.value = response.data.unit.pages;
            else
                auth_error.value = response.data.mensaje
        })
    } 

    return { pages, auth_error, getPages } 
}