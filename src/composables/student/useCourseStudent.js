import { ref } from 'vue'
import axios from "axios"
 
export default function useCourseStudent() {
    const course = ref({})

    const getCourse = async (token, id) => { 
        axios.get(`http://localhost:4000/api/student/course/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            course.value = response.data.course;
        })
    } 

    return { course, getCourse } 
}