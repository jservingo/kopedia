import { ref } from 'vue'
import axios from "axios"
 
export default function usePageStudent() {
    const page = ref({})

    const getPage = async (token, id) => { 
        axios.get(`http://localhost:4000/api/student/page/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            page.value = response.data.page;
        })
    } 

    return { page, getPage } 
}