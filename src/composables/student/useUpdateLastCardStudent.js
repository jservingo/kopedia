import { ref } from 'vue'
import axios from "axios"
 
export default function useUpdateLastCardStudent() {
    const items = ref({})

    const getItems = async (token, id) => { 
        axios.get(`http://localhost:4000/api/student/card/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            items.value = response.data.card.items;
        })
    } 

    const updateUserLastCard = async (token, id) => { 
        axios.get(`http://localhost:4000/api/student/user/update/card/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            //items.value = response.data.card.items;
        })
    } 

    return { items, getItems, updateUserLastCard } 
}