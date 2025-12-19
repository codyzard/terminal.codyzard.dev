'use client'
import {useQuery} from '@tanstack/react-query'
import type {Command} from '../types'

// ============================================================================
// Constants
// ============================================================================

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast'
const CACHE_TIME_MS = 60 * 1000 // 1 minute

// ============================================================================
// Types
// ============================================================================

type WeatherData = {
  location: string
  country: string
  temperature: string
  condition: string
  humidity: string
  windSpeed: string
  icon: string
}

type GeocodingResult = {
  results?: Array<{
    name: string
    country: string
    admin1?: string
    latitude: number
    longitude: number
  }>
}

type WeatherApiResponse = {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
  }
}

type WeatherInfo = {
  icon: string
  description: string
}

type LocationData = {
  name: string
  country: string
  latitude: number
  longitude: number
}

// ============================================================================
// Weather Code Mapping
// ============================================================================

// Open-Meteo weather code mapping
// https://open-meteo.com/en/docs
const WEATHER_CODE_MAP: Record<number, WeatherInfo> = {
  0: {icon: '☀️', description: 'Clear sky'},
  1: {icon: '🌤️', description: 'Mainly clear'},
  2: {icon: '⛅', description: 'Partly cloudy'},
  3: {icon: '☁️', description: 'Overcast'},
  45: {icon: '🌫️', description: 'Foggy'},
  48: {icon: '🌫️', description: 'Depositing rime fog'},
  51: {icon: '🌦️', description: 'Light drizzle'},
  53: {icon: '🌦️', description: 'Moderate drizzle'},
  55: {icon: '🌦️', description: 'Dense drizzle'},
  61: {icon: '🌧️', description: 'Slight rain'},
  63: {icon: '🌧️', description: 'Moderate rain'},
  65: {icon: '🌧️', description: 'Heavy rain'},
  71: {icon: '❄️', description: 'Slight snow'},
  73: {icon: '❄️', description: 'Moderate snow'},
  75: {icon: '❄️', description: 'Heavy snow'},
  80: {icon: '🌧️', description: 'Slight rain showers'},
  81: {icon: '🌧️', description: 'Moderate rain showers'},
  82: {icon: '🌧️', description: 'Violent rain showers'},
  95: {icon: '⛈️', description: 'Thunderstorm'},
  96: {icon: '⛈️', description: 'Thunderstorm with slight hail'},
  99: {icon: '⛈️', description: 'Thunderstorm with heavy hail'},
}

const getWeatherInfo = (code: number): WeatherInfo => {
  return WEATHER_CODE_MAP[code] || {icon: '🌤️', description: 'Unknown'}
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Geocode a city name to get coordinates and location info
 */
const geocodeCity = async (city: string): Promise<LocationData> => {
  const params = new URLSearchParams({
    name: city,
    count: '1',
    language: 'en',
    format: 'json',
  })

  const response = await fetch(`${GEOCODING_API_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Failed to connect to geocoding service')
  }

  const data: GeocodingResult = await response.json()

  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" not found. Please check the spelling.`)
  }

  return data.results[0]
}

/**
 * Fetch current weather data for given coordinates
 */
const fetchWeatherByCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<WeatherApiResponse> => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    timezone: 'auto',
  })

  const response = await fetch(`${WEATHER_API_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }

  return response.json()
}

/**
 * Transform API response to display format
 */
const transformWeatherData = (
  location: LocationData,
  weatherResponse: WeatherApiResponse,
): WeatherData => {
  const {current} = weatherResponse
  const {icon, description} = getWeatherInfo(current.weather_code)

  return {
    location: location.name,
    country: location.country,
    temperature: `${Math.round(current.temperature_2m)}°C`,
    condition: description,
    humidity: `${current.relative_humidity_2m}%`,
    windSpeed: `${Math.round(current.wind_speed_10m)} km/h`,
    icon,
  }
}

/**
 * Main function to fetch weather for a city
 */
const fetchWeather = async (city: string): Promise<WeatherData> => {
  if (!city.trim()) {
    throw new Error('Please enter a city name.')
  }

  // Step 1: Geocoding
  const location = await geocodeCity(city)

  // Step 2: Fetch weather
  const weatherData = await fetchWeatherByCoordinates(location.latitude, location.longitude)

  // Step 3: Transform data
  return transformWeatherData(location, weatherData)
}

// ============================================================================
// Components
// ============================================================================

const WeatherDisplay = ({city}: {city: string}) => {
  const {
    data: weather,
    isLoading,
    error,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    retry: 1,
    staleTime: 0, // Always fetch fresh data
    gcTime: CACHE_TIME_MS,
  })

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-cyan-400">
        <span>⏳</span>
        <span>Fetching weather data for {city}...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded border border-red-500 bg-red-900/20 p-3 text-red-400">
        ❌ {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    )
  }

  if (!weather) {
    return <div className="text-gray-400">No weather data available.</div>
  }

  return (
    <div className="space-y-4">
      {/* Main Weather Card */}
      <div className="rounded-lg border border-cyan-400/50 bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6">
        {/* Location & Icon */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">
              📍 {weather.location}, {weather.country}
            </h3>
            <p className="text-sm text-gray-300">Current Weather</p>
            <p className="text-xs text-gray-500">
              Updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="text-6xl">{weather.icon}</div>
        </div>

        {/* Temperature */}
        <div className="mb-4">
          <div className="text-5xl font-bold text-cyan-400">{weather.temperature}</div>
          <div className="text-xl text-gray-300">{weather.condition}</div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-black/30 p-3">
            <div className="text-sm text-gray-400">💧 Humidity</div>
            <div className="text-xl font-bold text-blue-400">{weather.humidity}</div>
          </div>
          <div className="rounded-lg bg-black/30 p-3">
            <div className="text-sm text-gray-400">💨 Wind Speed</div>
            <div className="text-xl font-bold text-green-400">{weather.windSpeed}</div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="text-sm text-gray-400">
        💡 Powered by Open-Meteo • Try: &quot;weather Tokyo&quot;, &quot;weather Hanoi&quot;,
        &quot;weather Paris&quot;
      </div>
    </div>
  )
}

// ============================================================================
// Command Export
// ============================================================================

export const weatherCommand: Command = {
  name: 'weather',
  description: 'Get current weather information for any city. Usage: weather <city>',
  execute: (args) => {
    const city = args?.join(' ')

    if (!city || city.trim() === '') {
      return {
        content: (
          <div className="space-y-2">
            <div className="text-yellow-400">⚠️ Usage: weather &lt;city&gt;</div>
            <div className="text-gray-400">
              Example: <span className="text-cyan-400">weather Tokyo</span> or{' '}
              <span className="text-cyan-400">weather New York</span>
            </div>
          </div>
        ),
        isError: true,
      }
    }

    return {
      content: <WeatherDisplay city={city} />,
    }
  },
}
