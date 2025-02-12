import { ref } from 'vue'
import axios from "axios"
 
export default function useCourseAdmin() {
    const course = ref({})
    const auth_error = ref('')

    const getCourse = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/course/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.data.error)
                course.value = response.data.course;
            else
                auth_error.value = response.data.mensaje
        })
    } 

    return { course, auth_error, getCourse } 
}