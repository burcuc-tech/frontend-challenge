export interface OpenMeteoGeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country?: string
  country_code?: string
  timezone?: string
}

export interface OpenMeteoGeocodingResponse {
  results?: OpenMeteoGeocodingResult[]
  generationtime_ms?: number
}

export interface OpenMeteoCurrentWeather {
  time: string
  temperature_2m: number
  apparent_temperature: number
  relative_humidity_2m: number
  surface_pressure: number
  wind_direction_10m: number
  wind_speed_10m: number
  weather_code: number
}

export interface OpenMeteoHourlyWeather {
  time: string[]
  temperature_2m: number[]
  visibility: number[]
  weather_code: number[]
}

export interface OpenMeteoDailyWeather {
  time: string[]
  sunrise: string[]
  sunset: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  uv_index_max: number[]
  weather_code: number[]
}

export interface OpenMeteoForecastResponse {
  timezone: string
  current: OpenMeteoCurrentWeather
  hourly: OpenMeteoHourlyWeather
  daily: OpenMeteoDailyWeather
}
