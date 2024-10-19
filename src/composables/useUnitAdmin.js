import { ref } from 'vue'
import axios from "axios"
 
export default function useUnit() {
    const unit = ref({})

    const getUnit = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/unit/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            unit.value = response.data.unit;
        })
    } 

    return { unit, getUnit } 
}