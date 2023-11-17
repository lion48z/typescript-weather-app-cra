import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.REACT_APP_API_KEY;

const fetchWeatherByCity = async (city: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
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



export default fetchWeatherByCity;
