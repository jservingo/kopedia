import { ref } from 'vue'
import axios from "axios"
 
export default function usePageGuest() {
    const page = ref({})

    const getPage = async (id) => { 
        axios.get(`http://localhost:4000/api/guest/page/${id}`)
        .then(response => {
            page.value = response.data.page[0];
        })
    } 

    return { page, getPage } 
}