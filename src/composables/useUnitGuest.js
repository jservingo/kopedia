import { ref } from 'vue'
import axios from "axios"
 
export default function useUnit() {
    const pages = ref({})

    const getPages = async (id) => { 
        axios.get(`http://localhost:4000/api/guest/unit/${id}`)
        .then(response => {
            pages.value = response.data.unit.pages;
        })
    } 

    return { pages, getPages } 
}