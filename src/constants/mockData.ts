import type {
  CurrentWeather,
  DailyForecast,
  FavoriteLocation,
  HourlyForecast,
  Location,
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
  windSpeed: 16,
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
  { date: '2025-05-30', minimumTemperature: 10, maximumTemperature: 18, weatherCode: 2 },
  { date: '2025-05-31', minimumTemperature: 9, maximumTemperature: 16, weatherCode: 61 },
  { date: '2025-06-01', minimumTemperature: 8, maximumTemperature: 17, weatherCode: 0 },
  { date: '2025-06-02', minimumTemperature: 11, maximumTemperature: 19, weatherCode: 2 },
  { date: '2025-06-03', minimumTemperature: 12, maximumTemperature: 20, weatherCode: 3 },
  { date: '2025-06-04', minimumTemperature: 11, maximumTemperature: 18, weatherCode: 1 },
  { date: '2025-06-05', minimumTemperature: 9, maximumTemperature: 17, weatherCode: 61 },
  { date: '2025-06-06', minimumTemperature: 9, maximumTemperature: 16, weatherCode: 2 },
]

export interface FavoriteWeather {
  location: FavoriteLocation
  temperature: number
  minimumTemperature: number
  maximumTemperature: number
  weatherCode: number
}

export const MOCK_FAVORITES: FavoriteWeather[] = [
  {
    location: { ...DEFAULT_LOCATION, id: 1850147, name: 'Tokyo', country: 'Japan', countryCode: 'JP' },
    temperature: 22,
    minimumTemperature: 18,
    maximumTemperature: 26,
    weatherCode: 2,
  },
  {
    location: { ...DEFAULT_LOCATION, id: 2988507, name: 'Paris', country: 'France', countryCode: 'FR' },
    temperature: 18,
    minimumTemperature: 12,
    maximumTemperature: 22,
    weatherCode: 0,
  },
  {
    location: { ...DEFAULT_LOCATION, id: 5128581, name: 'New York', country: 'USA', countryCode: 'US' },
    temperature: 16,
    minimumTemperature: 11,
    maximumTemperature: 20,
    weatherCode: 3,
  },
  {
    location: { ...DEFAULT_LOCATION, id: 2147714, name: 'Sydney', country: 'Australia', countryCode: 'AU' },
    temperature: 20,
    minimumTemperature: 16,
    maximumTemperature: 24,
    weatherCode: 0,
  },
  {
    location: { ...DEFAULT_LOCATION, id: 360630, name: 'Cairo', country: 'Egypt', countryCode: 'EG' },
    temperature: 28,
    minimumTemperature: 20,
    maximumTemperature: 33,
    weatherCode: 0,
  },
  {
    location: { ...DEFAULT_LOCATION, id: 3413829, name: 'Reykjavik', country: 'Iceland', countryCode: 'IS' },
    temperature: 9,
    minimumTemperature: 6,
    maximumTemperature: 11,
    weatherCode: 61,
  },
]
