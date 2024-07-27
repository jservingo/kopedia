import {useWeatherStore} from '../stores/weatherStore'
import {getTemperatura} from '@/helpers/getWeather'

export const useWeather = async() => {
    const temperatura =  await getTemperatura()
    const weatherSore = useWeatherStore()
    weatherSore.temperatura = temperatura
}