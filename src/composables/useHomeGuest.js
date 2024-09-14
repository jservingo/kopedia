import { ref } from 'vue'
import axios from "axios"
 
export default function useHomeGuest() {
    const info = ref({})

    const getInfo = async () => {
        axios.get('http://localhost:4000/api/guest')
        .then(response => {
            info.value = response.data;
        })
    } 

    return { info, getInfo } 
}