import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.REACT_APP_API_KEY;
interface WeatherAPIResponse {
   main:{
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
   }
weather: [{
    description: string;
    }]

  name: string;

}
const fetchWeatherByCity = async (city: string): Promise<WeatherAPIResponse | null >  => {
    console.log("fetch weather by city has run ")
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        q: city,
        units: 'imperial',
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    // Always have API calls return something
    return null;
  }
};

export { fetchWeatherByCity };

