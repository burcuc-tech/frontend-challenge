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
