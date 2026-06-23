/**
 * External API integration layer.
 * 1. Open-Meteo weather API (free, no key required)
 * 2. Mock REST API : 'https://jsonplaceholder.typicode.com': This website
 * is a fake REST API provided for testing purpose.
 */

const WEATHER_BASE = 'https://api.open-meteo.com/v1';
const MOCK_API_BASE = 'https://jsonplaceholder.typicode.com';

// ─── Weather ─────────────────────────────────────────────────────────────────
/**
 * Fetch current weather for given coordinates.
 * Uses Open-Meteo free API — no API key required.
 */
export async function fetchWeather(lat = 7.0, lon = 80.0) {
  const url = `${WEATHER_BASE}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=auto&forecast_days=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  return res.json();
}

export function weatherCodeToDesc(code) {
  const map = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Icy fog', 51: 'Light drizzle', 61: 'Slight rain',
    63: 'Moderate rain', 65: 'Heavy rain', 71: 'Slight snow', 80: 'Rain showers',
    95: 'Thunderstorm', 96: 'Thunderstorm w/ hail',
  };
  return map[code] ?? 'Unknown';
}

export function weatherCodeToEmoji(code) {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2 || code === 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}

// ─── Mock Course Data API ─────────────────────────────────────────────────────
/**
 * Fetches "posts" from JSONPlaceholder and maps them to course announcements.
 * This satisfies the REST API async requirement.
 */
export async function fetchCourseAnnouncements(limit = 5) {
  const res = await fetch(`${MOCK_API_BASE}/posts?_limit=${limit}`);
  if (!res.ok) throw new Error(`Announcements API error: ${res.status}`);
  const posts = await res.json();
  // Map to announcement shape
  return posts.map(p => ({
    id:      p.id,
    title:   p.title.charAt(0).toUpperCase() + p.title.slice(1),
    body:    p.body,
    course:  ['SE 4121', 'SE 4122', 'SE 4123', 'SE 4124', 'SE 4125'][p.id % 5],
    postedAt: new Date(Date.now() - p.id * 3600000 * 4).toISOString(),
  }));
}

// ─── Generic fetch helper ─────────────────────────────────────────────────────
export async function apiFetch(url, options = {}) {
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}
