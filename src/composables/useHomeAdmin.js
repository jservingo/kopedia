import { ref } from 'vue'
import axios from "axios"
 
export default function useHomeAdmin() {
    const info = ref({})

    const getInfo = async (token) => {
        //console.log("Enviar token", token); 
        axios.get('http://localhost:4000/api/admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
                info.value = response.data;
        })
    } 

    return { info, getInfo } 
}