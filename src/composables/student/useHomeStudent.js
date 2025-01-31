import { ref } from 'vue'
import axios from "axios"
 
export default function useHomeStudent() {
    const infoStudent = ref({})
    const infoGuest = ref({})

    const getInfoStudent = async (token) => {
        //console.log("Enviar token", token); 
        axios.get('http://localhost:4000/api/student', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            infoStudent.value = response.data;
        })
    } 

    const getInfoGuest = async (token) => {
        //console.log("Enviar token", token); 
        axios.get('http://localhost:4000/api/student/courses', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            infoGuest.value = response.data;
        })
    }

    return { infoStudent, infoGuest, getInfoStudent, getInfoGuest } 
}