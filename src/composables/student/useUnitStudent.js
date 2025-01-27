import { ref } from 'vue'
import axios from "axios"
 
export default function useUnitStudent() {
    const pages = ref({})

    const getPages = async (token, id) => { 
        axios.get(`http://localhost:4000/api/student/unit/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            pages.value = response.data.unit.pages;
        })
    } 

    return { pages, getPages } 
}