import React, { useState } from 'react';

import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {
  /*
  We are creating the responseObj variable and the function to change the responseObj variable by calling the useState function.

  Wrapping the responseObj and setResponseObj in an array is called destructuring and is commonly used to easily access values 
  inside arrays or objects. We can destructure this function call because we know the useState function returns an array with a 
  variable as the first element and a function as the second.
  */
  let [responseObj, setResponseObj] = useState({});

  let [city, setCity] = useState('');
  let [unit, setUnit] = useState('imperial');

  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  function getForecast(e) {
    // weather data fetch function will go here
    e.preventDefault();

    if (city.length === 0) {
      return setError(true);
    }

    setError(false);
    setResponseObj({});
    setLoading(false);

    const uriEncodedCity = encodeURIComponent(city);

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      }
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      if (response.cod !== 200) {
        throw new Error()
      }
      setResponseObj(response);
      setLoading(false);
    })
    .catch(err => {
      setError(true);
      setLoading(false);
      console.log(err);
    });
   }

   return (
      // JSX code will go here
      <div>
          <h2>Find Current Weather Conditions</h2>
          {/* <div>
              {JSON.stringify(responseObj)}
          </div> */}
          <Conditions 
            responseObj={responseObj} 
            error={error}
            loading={loading}
          />
          <form onSubmit={getForecast}>
            <input 
              type="text" 
              placeholder="Enter City" 
              maxLength="50" 
              className={classes.TextInput}
              value={city} 
              onChange = {(e) => setCity(e.target.value)}
            />

            <label className={classes.Radio}>
              <input
                type="radio"
                name="units"
                checked={unit === "imperial"}
                value="imperial"
                onChange={(e) => setUnit(e.target.value)} 
              />
              Fahrenheit
            </label>

            <label className={classes.Radio}>
              <input
                type="radio"
                name="units"
                checked={unit === "metric"}
                value="metric"
                onChange={(e) => setUnit(e.target.value)}
              />
              Celcius
            </label>

            <button className={classes.Button} type="submit">Get Forecast</button>
            
          </form>

          {/* <button onClick={getForecast}>Get Forecast</button> */}

       </div>
   )
}
export default Forecast;