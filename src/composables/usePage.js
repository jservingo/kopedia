import { ref } from 'vue'
import axios from "axios"
 
export default function usePage() {
    const page = ref({})

    const getPage = async () => { 
        axios.get('http://localhost:4000/api/courses/page/21')
            .then(response => {
                page.value = response.data;
            })
    } 

    return { page, getPage } 
}