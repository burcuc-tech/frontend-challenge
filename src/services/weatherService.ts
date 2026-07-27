import {
  requestForecast,
  requestGeocoding,
} from '../api/openMeteoClient'
import type {
  OpenMeteoDailyWeather,
  OpenMeteoForecastResponse,
  OpenMeteoGeocodingResponse,
  OpenMeteoHourlyWeather,
} from '../api/openMeteo.types'
import type {
  DailyForecast,
  HourlyForecast,
  Location,
  WeatherForecast,
} from '../types'

const CURRENT_VARIABLES = [
  'temperature_2m',
  'apparent_temperature',
  'relative_humidity_2m',
  'surface_pressure',
  'wind_direction_10m',
  'wind_speed_10m',
  'weather_code',
].join(',')

const HOURLY_VARIABLES = [
  'temperature_2m',
  'visibility',
  'weather_code',
].join(',')

const DAILY_VARIABLES = [
  'sunrise',
  'sunset',
  'temperature_2m_max',
  'temperature_2m_min',
  'uv_index_max',
  'weather_code',
].join(',')

const DEFAULT_RESULT_COUNT = 5
const FORECAST_DAYS = 16
const PAST_DAYS = 14

export interface SearchCitiesOptions {
  count?: number
  language?: string
  signal?: AbortSignal
}

export interface GetForecastOptions {
  signal?: AbortSignal
}

function mapHourlyForecast(hourly: OpenMeteoHourlyWeather): HourlyForecast[] {
  return hourly.time.map((time, index) => ({
    time,
    temperature: hourly.temperature_2m[index],
    weatherCode: hourly.weather_code[index],
  }))
}

function mapDailyForecast(daily: OpenMeteoDailyWeather): DailyForecast[] {
  return daily.time.map((date, index) => ({
    date,
    minimumTemperature: daily.temperature_2m_min[index],
    maximumTemperature: daily.temperature_2m_max[index],
    sunrise: daily.sunrise[index],
    sunset: daily.sunset[index],
    uvIndex: daily.uv_index_max[index],
    weatherCode: daily.weather_code[index],
  }))
}

function findCurrentVisibility(
  hourly: OpenMeteoHourlyWeather,
  currentTime: string,
): number {
  const currentHour = currentTime.slice(0, 13)
  const currentHourIndex = hourly.time.findIndex(
    (time) => time.slice(0, 13) === currentHour,
  )

  return hourly.visibility[currentHourIndex === -1 ? 0 : currentHourIndex]
}

function mapForecast(response: OpenMeteoForecastResponse): WeatherForecast {
  return {
    timezone: response.timezone,
    current: {
      time: response.current.time,
      temperature: response.current.temperature_2m,
      apparentTemperature: response.current.apparent_temperature,
      humidity: response.current.relative_humidity_2m,
      pressure: response.current.surface_pressure,
      windDirection: response.current.wind_direction_10m,
      windSpeed: response.current.wind_speed_10m,
      visibility: findCurrentVisibility(response.hourly, response.current.time),
      weatherCode: response.current.weather_code,
    },
    hourly: mapHourlyForecast(response.hourly),
    daily: mapDailyForecast(response.daily),
  }
}

export async function searchCities(
  query: string,
  {
    count = DEFAULT_RESULT_COUNT,
    language = 'en',
    signal,
  }: SearchCitiesOptions = {},
): Promise<Location[]> {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return []
  }

  const params = new URLSearchParams({
    name: normalizedQuery,
    count: String(count),
    language,
    format: 'json',
  })

  const response = await requestGeocoding<OpenMeteoGeocodingResponse>({
    params,
    signal,
  })

  return (response.results ?? []).map((result) => ({
    id: result.id,
    name: result.name,
    country: result.country ?? '',
    countryCode: result.country_code ?? '',
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  }))
}

export async function getWeatherForecast(
  location: Pick<Location, 'latitude' | 'longitude'>,
  { signal }: GetForecastOptions = {},
): Promise<WeatherForecast> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: CURRENT_VARIABLES,
    hourly: HOURLY_VARIABLES,
    daily: DAILY_VARIABLES,
    forecast_days: String(FORECAST_DAYS),
    past_days: String(PAST_DAYS),
    timezone: 'auto',
  })

  const response = await requestForecast<OpenMeteoForecastResponse>({
    params,
    signal,
  })

  return mapForecast(response)
}
