import { ref } from 'vue'
import axios from "axios"
 
export default function useHomeAdmin() {
    const info = ref({})

    const getInfo = async () => { 
        axios.get('http://localhost:4000/api/admin')
            .then(response => {
                info.value = response.data;
            })
    } 

    return { info, getInfo } 
}