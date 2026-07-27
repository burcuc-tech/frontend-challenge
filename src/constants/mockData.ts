import type {
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
  Location,
  WeatherForecast,
} from '../types'

export const DEFAULT_LOCATION: Location = {
  id: 3143244,
  name: 'Oslo',
  country: 'Norway',
  countryCode: 'NO',
  latitude: 59.91,
  longitude: 10.75,
  timezone: 'Europe/Oslo',
}

export const MOCK_CURRENT: CurrentWeather = {
  time: '2025-05-29T09:41',
  temperature: 12,
  apparentTemperature: 10,
  humidity: 58,
  pressure: 1013,
  windDirection: 225,
  windSpeed: 16,
  visibility: 10000,
  weatherCode: 2,
}

export const MOCK_HOURLY: HourlyForecast[] = [
  { time: '2025-05-29T09:00', temperature: 12, weatherCode: 2 },
  { time: '2025-05-29T10:00', temperature: 13, weatherCode: 2 },
  { time: '2025-05-29T11:00', temperature: 14, weatherCode: 1 },
  { time: '2025-05-29T12:00', temperature: 15, weatherCode: 2 },
  { time: '2025-05-29T13:00', temperature: 15, weatherCode: 2 },
  { time: '2025-05-29T14:00', temperature: 16, weatherCode: 1 },
  { time: '2025-05-29T15:00', temperature: 16, weatherCode: 2 },
  { time: '2025-05-29T16:00', temperature: 15, weatherCode: 2 },
]

export const MOCK_DAILY: DailyForecast[] = [
  {
    date: '2025-05-30',
    minimumTemperature: 10,
    maximumTemperature: 18,
    sunrise: '2025-05-30T04:12',
    sunset: '2025-05-30T22:45',
    uvIndex: 3,
    weatherCode: 2,
  },
  {
    date: '2025-05-31',
    minimumTemperature: 9,
    maximumTemperature: 16,
    sunrise: '2025-05-31T04:10',
    sunset: '2025-05-31T22:47',
    uvIndex: 2,
    weatherCode: 61,
  },
  {
    date: '2025-06-01',
    minimumTemperature: 8,
    maximumTemperature: 17,
    sunrise: '2025-06-01T04:08',
    sunset: '2025-06-01T22:49',
    uvIndex: 4,
    weatherCode: 0,
  },
  {
    date: '2025-06-02',
    minimumTemperature: 11,
    maximumTemperature: 19,
    sunrise: '2025-06-02T04:06',
    sunset: '2025-06-02T22:51',
    uvIndex: 4,
    weatherCode: 2,
  },
  {
    date: '2025-06-03',
    minimumTemperature: 12,
    maximumTemperature: 20,
    sunrise: '2025-06-03T04:04',
    sunset: '2025-06-03T22:53',
    uvIndex: 3,
    weatherCode: 3,
  },
  {
    date: '2025-06-04',
    minimumTemperature: 11,
    maximumTemperature: 18,
    sunrise: '2025-06-04T04:02',
    sunset: '2025-06-04T22:55',
    uvIndex: 4,
    weatherCode: 1,
  },
  {
    date: '2025-06-05',
    minimumTemperature: 9,
    maximumTemperature: 17,
    sunrise: '2025-06-05T04:00',
    sunset: '2025-06-05T22:57',
    uvIndex: 2,
    weatherCode: 61,
  },
  {
    date: '2025-06-06',
    minimumTemperature: 9,
    maximumTemperature: 16,
    sunrise: '2025-06-06T03:58',
    sunset: '2025-06-06T22:59',
    uvIndex: 3,
    weatherCode: 2,
  },
]

export const MOCK_FORECAST: WeatherForecast = {
  current: MOCK_CURRENT,
  hourly: MOCK_HOURLY,
  daily: MOCK_DAILY,
  timezone: DEFAULT_LOCATION.timezone ?? 'Europe/Oslo',
}
