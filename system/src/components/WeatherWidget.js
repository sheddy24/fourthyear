import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [location, setLocation] = useState('');
  const [locationName, setLocationName] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchLocationSuggestions = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=6d769194ad2004d4982322af7634c9fa`);
      if (!response.ok) {
        throw new Error('Failed to fetch location suggestions');
      }
      const data = await response.json();
      setSuggestions(data.map(suggestion => suggestion.name));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch location name');
      }
      const data = await response.json();
      setLocationName(data.display_name);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchForecastData = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;

        await fetchLocationName(latitude, longitude);

        let url = '';
        if (location) {
          url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=6d769194ad2004d4982322af7634c9fa&units=metric`;
        } else {
          url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=6d769194ad2004d4982322af7634c9fa&units=metric`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        const data = await response.json();
        setForecastData(data);
        setLoading(false);
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchLocationSuggestions();
    }
  }, [location]);

  const handleSubmit = e => {
    e.preventDefault();
    fetchForecastData();
  };

  const handleInputChange = e => {
    setLocation(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            list="suggestions"
          />
          <datalist id="suggestions">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
        </label>
        <button type="submit">Search</button>
      </form>
      {forecastData && (
        <div>
          <h2>Weather Forecast for {locationName}</h2>
          <h3>Noon Forecast</h3>
          <ul>
            {forecastData.list.map((item, index) => {
              const forecastTime = new Date(item.dt * 1000);
              const forecastHour = forecastTime.getHours();
              if (forecastHour === 12) {
                return (
                  <li key={index}>
                    <p>Date and Time: {forecastTime.toLocaleString()}</p>
                    <p>Temperature: {item.main.temp} °C</p>
                    <p>Description: {item.weather[0].description}</p>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
          <h3>Afternoon Forecast</h3>
          <ul>
            {forecastData.list.map((item, index) => {
              const forecastTime = new Date(item.dt * 1000);
              const forecastHour = forecastTime.getHours();
              if (forecastHour === 15) {
                return (
                  <li key={index}>
                    <p>Date and Time: {forecastTime.toLocaleString()}</p>
                    <p>Temperature: {item.main.temp} °C</p>
                    <p>Description: {item.weather[0].description}</p>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
