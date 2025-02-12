import { ref } from 'vue'
import axios from "axios"
 
export default function useUnitAdmin() {
    const unit = ref({})
    const auth_error = ref('')

    const getUnit = async (token, id) => { 
        axios.get(`http://localhost:4000/api/admin/unit/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.data.error)
                unit.value = response.data.unit;
            else
                auth_error.value = response.data.mensaje
        })
    } 

    return { unit, auth_error, getUnit } 
}