import { useState, useEffect } from 'react';
import { fetchWeatherByCity, fetchForecastByLatLong } from './services/weatherServices';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake, faThunderstorm, faMoon, faCloudMoon } from '@fortawesome/free-solid-svg-icons';
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

function App() {
  // create state variable for weather information 
const [weather, setWeather]= useState<WeatherData | null>(null);
const [forecast, setForecast] = useState<ForecastData | null>(null);
//create use Effect that will run when weather loads 
// to do this it runs async fetchWeatherByCity function so also needs to be async
//but we are not allowed to turn useEffect into async function directly 
//define a separate async function within the useEffect 
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
useEffect(() => {
  const getForecast = async () => {
    try {
      const forecastResponse = await fetchForecastByLatLong(41.977, -91.66);
      
      if (forecastResponse) {
       
        

        setForecast({
          temperature: forecastResponse.list[0].main.temp,
          humidity: forecastResponse.list[0].main.humidity,
          tempMax: forecastResponse.list[0].main.temp_max,
          tempMin: forecastResponse.list[0].main.temp_min,
          description: forecastResponse.list[0].weather[0].description,
          name: forecastResponse.city.name,
          date: forecastResponse.list[0].dt_txt,
        });
        
        
        
        
      }   
       
    } catch (error) {
      console.log(error);
    }
  }
  
  getForecast();
}, []);
  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case '01d':
        return <FontAwesomeIcon icon={faSun} />;
      case '02d':
        return <FontAwesomeIcon icon={faCloudSun} />;
      case '03d':
      case '04d':
        return <FontAwesomeIcon icon={faCloud} />;
      case '09d':
        return <FontAwesomeIcon icon={faCloudRain} />;
      case '10d':
        return <FontAwesomeIcon icon={faCloudSun} />;
      case '11d':
        return <FontAwesomeIcon icon={faThunderstorm} />;
      case '13d':
        return <FontAwesomeIcon icon={faSnowflake} />;
        case '01n':
          return <FontAwesomeIcon icon={faMoon} />;
        case '02n':
          return <FontAwesomeIcon icon={faCloudMoon} />;
      default:
        return null;
    }
  };
  
 

  return (
    <div className="container mt-5">
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
                {weather ? getWeatherIcon(weather.icon) : 'loading...'}
              </p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body>
          <h2 className="card-title">{forecast? forecast.name : 'loading...'}</h2>
            <h2 className="card-title">Extended</h2>
            <p className="card-text">
              {forecast ? `Date is : ${forecast.date}` : 'loading...'}
            </p>
            <p className="card-text">
              {forecast ? `Current: ${forecast.temperature}°F` : 'loading...'}
            </p>
            <p className="card-text">
              {forecast ? `Min: ${forecast.tempMin}°F` : 'loading...'}
            </p>
            <p className="card-text">
              {forecast? `Max: ${forecast.tempMax}°F` : 'loading...'}
            </p>
            <p className="card-text">
              {forecast? `Max: ${forecast.humidity}%` : 'loading...'}
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
  );
}

export default App;
