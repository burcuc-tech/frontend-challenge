export interface CurrentWeather {
  time: string
  temperature: number
  apparentTemperature: number
  humidity: number
  pressure: number
  windDirection: number
  windSpeed: number
  visibility: number
  weatherCode: number
}

export interface HourlyForecast {
  time: string
  temperature: number
  weatherCode: number
}

export interface DailyForecast {
  date: string
  minimumTemperature: number
  maximumTemperature: number
  sunrise: string
  sunset: string
  uvIndex: number
  weatherCode: number
}

export interface WeatherForecast {
  current: CurrentWeather
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  timezone: string
}

export interface WeatherCondition {
  label: string
}

export interface FavoriteWeather {
  location: Location
  temperature: number
  minimumTemperature: number
  maximumTemperature: number
  weatherCode: number
}
import type { Location } from './location'

export type TemperatureUnit = 'celsius' | 'fahrenheit'
