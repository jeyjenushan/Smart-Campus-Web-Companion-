import { useCallback, useEffect, useState } from 'react';
import { fetchWeather } from '../../lib/api';


export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [weatherLoad, setWeatherLoad] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  const loadWeather = useCallback(async () => {
    setWeatherLoad(true);
    setWeatherError(null);

    try {
      const { lat, lon } = await getCurrentPosition();
      const data = await fetchWeather(lat, lon);
      setWeather(data);
    } catch (e) {
      setWeatherError(e.message);
    } finally {
      setWeatherLoad(false);
    }
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  return {
    weather,
    weatherLoad,
    weatherError,
    loadWeather,
  };
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position =>
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      reject
    );
  });
}