import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
// index.tsx or index.ts
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the FontAwesome styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake, faThunderstorm } from '@fortawesome/free-solid-svg-icons';

library.add(faSun, faCloud, faCloudSun, faCloudRain, faSnowflake, faThunderstorm);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

