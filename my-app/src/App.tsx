import { useState, useEffect } from 'react';
import { fetchWeatherByCity } from './services/weatherServices';
//define weather api response shape
interface WeatherData {
  temperature:number,
  humidity:number,
  tempMin:number,
  tempMax:number,
  description:string,
  name:string,
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
     humidity: weatherResponse.main.humidity,
      tempMax: weatherResponse.main.temp_max,
      tempMin: weatherResponse.main.temp_min,
      description: weatherResponse.weather[0].description,
      
      name: `${weatherResponse.name}, ${weatherResponse.sys.country}`
    })

  }
}catch (error) {
  console.log(error);
}
  }
  getWeather();
},[]);
  
 

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <h2 className="card-title">{weather ? weather.name : 'loading...'}</h2>
            
              <h2 className="card-title">Temperature</h2>
              <p className="card-text">
                {weather ? `Current: ${weather.temperature}°F` : 'loading...'}
              </p>
              <p className="card-text">
                {weather ? `Min: ${weather.tempMin}°F` : 'loading...'}
              </p>
              <p className="card-text">
                {weather ? `Max: ${weather.tempMax}°F` : 'loading...'}
              </p>
              <p className="card-text">
                {weather ? `Max: ${weather.humidity}%` : 'loading...'}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Description</h2>
              <p className="card-text">
                {weather ? weather.description : 'loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
