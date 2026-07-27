import type {
  CurrentWeather,
  DailyForecast,
  FavoriteLocation,
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

export interface FavoriteWeather {
  location: FavoriteLocation
  temperature: number
  minimumTemperature: number
  maximumTemperature: number
  weatherCode: number
}

export const MOCK_FAVORITES: FavoriteWeather[] = [
  {
    location: {
      id: 1850147,
      name: 'Tokyo',
      country: 'Japan',
      countryCode: 'JP',
      latitude: 35.68,
      longitude: 139.76,
      timezone: 'Asia/Tokyo',
    },
    temperature: 22,
    minimumTemperature: 18,
    maximumTemperature: 26,
    weatherCode: 2,
  },
  {
    location: {
      id: 2988507,
      name: 'Paris',
      country: 'France',
      countryCode: 'FR',
      latitude: 48.85,
      longitude: 2.35,
      timezone: 'Europe/Paris',
    },
    temperature: 18,
    minimumTemperature: 12,
    maximumTemperature: 22,
    weatherCode: 0,
  },
  {
    location: {
      id: 5128581,
      name: 'New York',
      country: 'USA',
      countryCode: 'US',
      latitude: 40.71,
      longitude: -74.01,
      timezone: 'America/New_York',
    },
    temperature: 16,
    minimumTemperature: 11,
    maximumTemperature: 20,
    weatherCode: 3,
  },
  {
    location: {
      id: 2147714,
      name: 'Sydney',
      country: 'Australia',
      countryCode: 'AU',
      latitude: -33.87,
      longitude: 151.21,
      timezone: 'Australia/Sydney',
    },
    temperature: 20,
    minimumTemperature: 16,
    maximumTemperature: 24,
    weatherCode: 0,
  },
  {
    location: {
      id: 360630,
      name: 'Cairo',
      country: 'Egypt',
      countryCode: 'EG',
      latitude: 30.04,
      longitude: 31.24,
      timezone: 'Africa/Cairo',
    },
    temperature: 28,
    minimumTemperature: 20,
    maximumTemperature: 33,
    weatherCode: 0,
  },
  {
    location: {
      id: 3413829,
      name: 'Reykjavik',
      country: 'Iceland',
      countryCode: 'IS',
      latitude: 64.15,
      longitude: -21.94,
      timezone: 'Atlantic/Reykjavik',
    },
    temperature: 9,
    minimumTemperature: 6,
    maximumTemperature: 11,
    weatherCode: 61,
  },
]
