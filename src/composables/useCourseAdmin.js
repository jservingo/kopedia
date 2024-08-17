import { ref } from 'vue'
import axios from "axios"
 
export default function useCourseAdmin() {
    const course = ref({})

    const getCourse = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/course/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            course.value = response.data.course[0];
        })
    } 

    return { course, getCourse } 
}