import { ref } from 'vue'
import axios from "axios"
 
export default function useCourse() {
    const course = ref({})

    const getCourse = async () => { 
        axios.get('http://localhost:4000/api/courses/course/1')
            .then(response => {
                course.value = response.data;
            })
    } 

    return { course, getCourse } 
}