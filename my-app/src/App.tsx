import { useState, useEffect } from 'react';
import { fetchWeatherByCity, fetchForecastByLatLong } from './services/weatherServices';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Card, Col, Row } from 'react-bootstrap';
import WeatherIcon from './WeatherIcon'; 
import SearchBar from './SearchBar';

interface WeatherData {
  temperature:number,
  humidity:number,
  tempMin:number,
  tempMax:number,
  description:string,
  name:string,
  icon:string,
}
interface ForecastData {
  temperature:number,
  humidity:number,
  tempMin:number,
  tempMax:number,
  description:string,
  name:string,
  date: string,
}



interface HourlyForecast {
  temperature: number;
  humidity: number;
  tempMin: number;
  tempMax: number;
  description: string;
  name: string;
  date: string;
}

function App() {
  // create state variable for weather information 
const [weather, setWeather]= useState<WeatherData | null>(null);
const [forecast, setForecast] = useState<HourlyForecast[] | null>(null);
//create use Effect that will run when weather loads 
// to do this it runs async fetchWeatherByCity function so also needs to be async
//but we are not allowed to turn useEffect into async function directly 
//define a separate async function within the useEffect 
const onSearch = async (query: string) => {
  try {
    const weatherResponse = await fetchWeatherByCity(query);
    if (weatherResponse) {
      setWeather({
        temperature: weatherResponse.main.temp,
        humidity: weatherResponse.main.humidity,
        tempMax: weatherResponse.main.temp_max,
        tempMin: weatherResponse.main.temp_min,
        description: weatherResponse.weather[0].description,
        icon: weatherResponse.weather[0].icon,
        name: `${weatherResponse.name}, ${weatherResponse.sys.country}`
      });
    }
    const forecastResponse = await fetchForecastByLatLong(query); // Use default location or replace with user's location
    if (forecastResponse) {
      const hourlyForecasts = forecastResponse.list.slice(0, 8).map((forecastItem) => ({
        temperature: forecastItem.main.temp,
        humidity: forecastItem.main.humidity,
        tempMax: forecastItem.main.temp_max,
        tempMin: forecastItem.main.temp_min,
        description: forecastItem.weather[0].description,
        name: forecastResponse.city.name,
        date: forecastItem.dt_txt,
      }));
      setForecast(hourlyForecasts);
    }
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  onSearch('Cedar Rapids');
}, [])
/*
useEffect(()=> {
  const getWeather = async () => {
    try{
    const weatherResponse = await fetchWeatherByCity('Cedar Rapids');
    if (weatherResponse){
    setWeather({
      temperature: weatherResponse.main.temp,
      humidity: weatherResponse.main.humidity,
      tempMax: weatherResponse.main.temp_max,
      tempMin: weatherResponse.main.temp_min,
      description: weatherResponse.weather[0].description,
      icon: weatherResponse.weather[0].icon,
      name: `${weatherResponse.name}, ${weatherResponse.sys.country}`
    })

  }
}catch (error) {
  console.log(error);
}
  }
  getWeather();
},[]);
// ...

useEffect(() => {
  const getForecast = async () => {
    try {
      const forecastResponse = await fetchForecastByLatLong(41.977, -91.66);

      if (forecastResponse) {
        const hourlyForecasts = forecastResponse.list.slice(0, 8).map((forecastItem) => ({
          temperature: forecastItem.main.temp,
          humidity: forecastItem.main.humidity,
          tempMax: forecastItem.main.temp_max,
          tempMin: forecastItem.main.temp_min,
          description: forecastItem.weather[0].description,
          name: forecastResponse.city.name,
          date: forecastItem.dt_txt,
        }));

        setForecast(hourlyForecasts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getForecast();
}, []);*/




 

  return (
    <>
    
    <div className="container mt-5">
    <SearchBar onSearch={onSearch}/>
      
    <Row>
    
      <Col md={6}>
        <Card>
        <Card.Body>
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
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h2 className="card-title">Description</h2>
            <p className="card-text">{weather ? weather.description : 'loading...'}</p>
            <p className="card-text">
              {weather ? <WeatherIcon icon={weather.icon} /> : 'loading...'}
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
        <Card.Body>
      <h2 className="card-title">{forecast ? (forecast.length > 0 ? forecast[0].name : 'loading...') : 'loading...'}</h2>
      <h2 className="card-title">Extended</h2>
      <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
        {forecast
          ? forecast.map((hourlyForecast: HourlyForecast, index: number) => (
              <div key={index} style={{ marginRight: '10px', minWidth: '150px' }}>
                <p className="card-text">{`Date is: ${hourlyForecast.date}`}</p>
                <p className="card-text">{`Current: ${hourlyForecast.temperature}°F`}</p>
                <p className="card-text">{`Min: ${hourlyForecast.tempMin}°F`}</p>
                <p className="card-text">{`Max: ${hourlyForecast.tempMax}°F`}</p>
                <p className="card-text">{`Max: ${hourlyForecast.humidity}%`}</p>
                <hr />
              </div>
            ))
          : 'loading...'}
      </div>
    </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
  </>
  );
}

export default App;
