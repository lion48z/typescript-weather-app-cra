import { useState, useEffect } from 'react';
import { fetchWeatherByCity } from './services/weatherServices';
import './styles.css';
//define weather api response shape
interface WeatherData {
  temperature:number,
  
  tempMin:number,
  tempMax:number,
  description:string
}

function App() {
  // create state variable for weather information 
const [weather, setWeather]= useState<WeatherData | null>(null);
//create use Effect that will run when weather loads 
// to do this it runs async fetchWeatherByCity function so also needs to be async
//but we are not allowed to turn useEffect into async function directly 
//define a separate async function within the useEffect 
useEffect(()=> {
  const getWeather = async () => {
    try{
    const weatherResponse = await fetchWeatherByCity('Boston');
    if (weatherResponse){
    setWeather({
      temperature: weatherResponse.main.temp,
     
      tempMax: weatherResponse.main.temp_max,
      tempMin: weatherResponse.main.temp_min,
      description: weatherResponse.weather[0].description,
    })

  }
}catch (error) {
  console.log(error);
}
  }
  getWeather();
},[]);
  
 

  return (
    <>
        <h2>Temperature</h2>
        <h4>{weather ? weather.temperature : 'loading...'}</h4>
        <h4>{weather ? weather.tempMin : 'loading...'}</h4>
        <h4>{weather ? weather.tempMax : 'loading...'}</h4>
   

      
        <h2>Description</h2>
        <h4>{weather ? weather.description : 'loading...'}</h4>
    </>
    
  );
}

export default App;
