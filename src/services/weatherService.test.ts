import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getFavoriteWeather,
  getWeatherForecast,
  searchCities,
} from './weatherService'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
    status,
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('searchCities', () => {
  it('does not request empty queries', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(searchCities('   ')).resolves.toEqual([])
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('builds the geocoding query and maps locations', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({
      results: [{
        id: 3128760,
        name: 'Barcelona',
        country: 'Spain',
        country_code: 'ES',
        latitude: 41.38879,
        longitude: 2.15899,
        timezone: 'Europe/Madrid',
      }],
    }))
    vi.stubGlobal('fetch', fetchMock)

    const locations = await searchCities(' Barcelona ')
    const requestUrl = new URL(fetchMock.mock.calls[0][0] as string)

    expect(requestUrl.hostname).toBe('geocoding-api.open-meteo.com')
    expect(requestUrl.searchParams.get('name')).toBe('Barcelona')
    expect(requestUrl.searchParams.get('count')).toBe('5')
    expect(locations).toEqual([{
      id: 3128760,
      name: 'Barcelona',
      country: 'Spain',
      countryCode: 'ES',
      latitude: 41.38879,
      longitude: 2.15899,
      timezone: 'Europe/Madrid',
    }])
  })

  it('returns an empty list when the API omits results', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ generationtime_ms: 0.1 })),
    )

    await expect(searchCities('No matching city')).resolves.toEqual([])
  })
})

describe('getWeatherForecast', () => {
  it('requests all forecast groups once and maps the response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({
      timezone: 'Europe/Oslo',
      current: {
        time: '2026-07-27T16:15',
        temperature_2m: 22.3,
        apparent_temperature: 21.2,
        relative_humidity_2m: 48,
        surface_pressure: 1008.4,
        wind_direction_10m: 225,
        wind_speed_10m: 15.3,
        weather_code: 2,
      },
      hourly: {
        time: ['2026-07-27T15:00', '2026-07-27T16:00'],
        temperature_2m: [22, 22.3],
        visibility: [9000, 10000],
        weather_code: [1, 2],
      },
      daily: {
        time: ['2026-07-27'],
        sunrise: ['2026-07-27T04:30'],
        sunset: ['2026-07-27T22:00'],
        temperature_2m_max: [24],
        temperature_2m_min: [14],
        uv_index_max: [4],
        weather_code: [2],
      },
    }))
    vi.stubGlobal('fetch', fetchMock)

    const forecast = await getWeatherForecast({
      latitude: 59.91,
      longitude: 10.75,
    })
    const requestUrl = new URL(fetchMock.mock.calls[0][0] as string)

    expect(fetchMock).toHaveBeenCalledOnce()
    expect(requestUrl.searchParams.get('current')).toContain('temperature_2m')
    expect(requestUrl.searchParams.get('hourly')).toContain('visibility')
    expect(requestUrl.searchParams.get('daily')).toContain('uv_index_max')
    expect(requestUrl.searchParams.get('forecast_days')).toBe('16')
    expect(requestUrl.searchParams.get('past_days')).toBe('14')
    expect(forecast.current.visibility).toBe(10000)
    expect(forecast.current.windDirection).toBe(225)
    expect(forecast.daily[0].uvIndex).toBe(4)
    expect(forecast.timezone).toBe('Europe/Oslo')
  })

  it('exposes API error messages', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({
        error: true,
        reason: 'Invalid coordinates',
      }, 400)),
    )

    await expect(getWeatherForecast({
      latitude: 999,
      longitude: 999,
    })).rejects.toMatchObject({
      message: 'Invalid coordinates',
      status: 400,
    })
  })

  it('uses an HTTP fallback when the error response is not JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('Service unavailable', {
        status: 503,
      })),
    )

    await expect(getWeatherForecast({
      latitude: 59.91,
      longitude: 10.75,
    })).rejects.toMatchObject({
      message: 'Weather service request failed (503)',
      status: 503,
    })
  })
})

describe('getFavoriteWeather', () => {
  it('requests only the favorite summary fields', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({
      current: {
        temperature_2m: 18,
        weather_code: 1,
      },
      daily: {
        temperature_2m_max: [21],
        temperature_2m_min: [12],
      },
    }))
    vi.stubGlobal('fetch', fetchMock)

    const location = {
      id: 2988507,
      name: 'Paris',
      country: 'France',
      countryCode: 'FR',
      latitude: 48.85,
      longitude: 2.35,
    }
    const favoriteWeather = await getFavoriteWeather(location)
    const requestUrl = new URL(fetchMock.mock.calls[0][0] as string)

    expect(requestUrl.searchParams.get('forecast_days')).toBe('1')
    expect(requestUrl.searchParams.has('hourly')).toBe(false)
    expect(favoriteWeather).toEqual({
      location,
      temperature: 18,
      minimumTemperature: 12,
      maximumTemperature: 21,
      weatherCode: 1,
    })
  })

  it('falls back to the current temperature when daily values are missing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({
      current: {
        temperature_2m: 18,
        weather_code: 1,
      },
      daily: {
        temperature_2m_max: [],
        temperature_2m_min: [],
      },
    })))

    const favoriteWeather = await getFavoriteWeather({
      id: 2988507,
      name: 'Paris',
      country: 'France',
      countryCode: 'FR',
      latitude: 48.85,
      longitude: 2.35,
    })

    expect(favoriteWeather.minimumTemperature).toBe(18)
    expect(favoriteWeather.maximumTemperature).toBe(18)
  })
})
