import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faThunderstorm,
  faMoon,
  faCloudMoon,
} from '@fortawesome/free-solid-svg-icons';

interface WeatherIconProps {
  icon: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon }) => {
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

  return <>{getWeatherIcon(icon)}</>;
};

export default WeatherIcon;
