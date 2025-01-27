import { ref } from 'vue'
import axios from "axios"
 
export default function useClipboardUnits() {
    const units = ref({})

    const getClipboard = async (token) => { 
        //console.log("getClipboard Units")
        axios.get(`http://localhost:4000/api/admin/clipboard/units`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            units.value = response.data.units;
        })
    } 

    return { units, getClipboard } 
}