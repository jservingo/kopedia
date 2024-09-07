import { ref } from 'vue'
import axios from "axios"
 
export default function useCourseGuest() {
    const course = ref({})

    const getCourse = async (id) => { 
        console.log(`http://localhost:4000/api/guest/course/${id}`)
        axios.get(`http://localhost:4000/api/guest/course/${id}`)
        .then(response => {
            course.value = response.data.course[0];
        })
    } 

    return { course, getCourse } 
}