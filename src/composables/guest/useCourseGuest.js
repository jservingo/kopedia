import { ref } from 'vue'
import axios from "axios"
 
export default function useCourseGuest() {
    const course = ref({})

    const getCourse = async (id) => { 
        axios.get(`http://localhost:4000/api/guest/course/${id}`)
        .then(response => {
            course.value = response.data.course;
        })
    } 

    return { course, getCourse } 
}