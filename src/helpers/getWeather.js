import axios from "axios"
const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=10.488&longitude=-66.8792&current=temperature_2m&timezone=auto&forecast_days=1"

export const getTemperatura = async() => {
    const resp = await axios.get(API_URL)
    const nuevaTemperatura = resp.data.current.temperature_2m
    return nuevaTemperatura
}
