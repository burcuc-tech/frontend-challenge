export interface CurrentWeather {
  time: string
  temperature: number
  apparentTemperature: number
  humidity: number
  pressure: number
  windSpeed: number
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
  icon: string
}
