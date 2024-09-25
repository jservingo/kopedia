import { ref } from 'vue'
import axios from "axios"
 
export default function useHomeGuest() {
    const info = ref({})

    const getInfoGuest = async () => {
        axios.get('http://localhost:4000/api/guest')
        .then(response => {
            info.value = response.data;
        })
    } 

    const getInfoStudent = async (token) => {
        //console.log("Enviar token", token); 
        axios.get('http://localhost:4000/api/student/courses', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            info.value = response.data;
        })
    }

    return { info, getInfoGuest, getInfoStudent } 
}