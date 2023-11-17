import React, { useState, useEffect } from 'react';
import fetchWeatherByCity from './services/weatherServices';


interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  // Add more properties as needed
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchWeatherByCity('New York');
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {weatherData ? (
        <div>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°F</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
