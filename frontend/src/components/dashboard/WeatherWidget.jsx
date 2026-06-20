import { RefreshCw, WifiOff } from "lucide-react";
import {  Spinner } from '@/components/ui';
import {  weatherCodeToDesc, weatherCodeToEmoji } from '@/lib/api';

export function WeatherWidget({ weather, loading, error, onRefresh }) {
  if (loading) return (
    <div className="card p-4 flex items-center gap-3">
      <Spinner size="sm" /><span className="text-sm text-ink-muted">Loading weather…</span>
    </div>
  );
  if (error) return (
    <div className="card p-4 flex items-center gap-3 text-ink-muted">
      <WifiOff className="w-4 h-4 text-danger" />
      <span className="text-sm flex-1">Weather unavailable</span>
      <button onClick={onRefresh} className="touch-target w-8 h-8 flex items-center justify-center hover:bg-surface-muted rounded-lg">
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
  if (!weather) return null;
  const c = weather.current;
  return (
    <div className="card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{weatherCodeToEmoji(c.weather_code)}</span>
        <div>
          <p className="text-lg font-bold text-ink">{Math.round(c.temperature_2m)}°C</p>
          <p className="text-xs text-ink-muted">{weatherCodeToDesc(c.weather_code)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-ink-muted">Humidity {c.relative_humidity_2m}%</p>
        <p className="text-xs text-ink-muted">Wind {Math.round(c.wind_speed_10m)} km/h</p>
        <button onClick={onRefresh} className="touch-target mt-1 w-8 h-8 flex items-center justify-center hover:bg-surface-muted rounded-lg ml-auto">
          <RefreshCw className="w-3 h-3 text-ink-faint" />
        </button>
      </div>
    </div>
  );
}