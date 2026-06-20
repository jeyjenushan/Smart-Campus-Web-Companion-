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
      const data = await fetchWeather();
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