//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
import axios from "axios";
//const axios = require("axios"); 

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.REACT_APP_API_KEY;

const fetchWeatherByCity = async (city: string ) => {
    try{
    const response = await axios.get(`${BASE_URL}`, {
        params: {
            q: city,
            units: 'imperial',
            appid: API_KEY,
        }
    })
    return response.data;
}catch (error) {
    console.log(error);
    //always have api calls return something 
    return null;
}
    
};
//console.log(fetchWeatherByCity("Boston"));
export default fetchWeatherByCity;