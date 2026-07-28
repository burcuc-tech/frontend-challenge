import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Location, WeatherForecast } from '../types'
import { ForecastPage } from './ForecastPage'

const OSLO: Location = {
  id: 3143244,
  name: 'Oslo',
  country: 'Norway',
  countryCode: 'NO',
  latitude: 59.91,
  longitude: 10.75,
  timezone: 'Europe/Oslo',
}

const FORECAST: WeatherForecast = {
  current: {
    time: '2026-07-28T11:00',
    temperature: 20,
    apparentTemperature: 19,
    humidity: 60,
    pressure: 1015,
    windDirection: 180,
    windSpeed: 12,
    visibility: 10_000,
    weatherCode: 1,
  },
  hourly: [
    {
      time: '2026-07-28T11:00',
      temperature: 20,
      weatherCode: 1,
    },
    {
      time: '2026-07-28T12:00',
      temperature: 21,
      weatherCode: 1,
    },
    {
      time: '2026-07-29T00:00',
      temperature: 15,
      weatherCode: 2,
    },
    {
      time: '2026-07-29T01:00',
      temperature: 14,
      weatherCode: 2,
    },
  ],
  daily: [
    {
      date: '2026-07-28',
      minimumTemperature: 13,
      maximumTemperature: 24,
      sunrise: '2026-07-28T05:00',
      sunset: '2026-07-28T21:30',
      uvIndex: 5,
      weatherCode: 1,
    },
    {
      date: '2026-07-29',
      minimumTemperature: 12,
      maximumTemperature: 22,
      sunrise: '2026-07-29T05:01',
      sunset: '2026-07-29T21:29',
      uvIndex: 4,
      weatherCode: 2,
    },
  ],
  timezone: 'Europe/Oslo',
}

describe('ForecastPage', () => {
  it('shows an honest initial error state and retries without mock weather', async () => {
    const onRetry = vi.fn()
    const user = userEvent.setup()

    render(
      <ForecastPage
        forecast={null}
        isFavorite={false}
        location={OSLO}
        onLocationSelect={vi.fn()}
        onRetry={onRetry}
        onToggleFavorite={vi.fn()}
        requestedLocation={OSLO}
        status="error"
        temperatureUnit="celsius"
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Weather for Oslo is unavailable',
    )
    expect(screen.queryByText('Hourly forecast')).not.toBeInTheDocument()
    expect(
      screen.queryByText('30-day weather timeline'),
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('shows the API hourly records for the selected calendar date', async () => {
    const user = userEvent.setup()

    render(
      <ForecastPage
        forecast={FORECAST}
        isFavorite={false}
        location={OSLO}
        onLocationSelect={vi.fn()}
        onRetry={vi.fn()}
        onToggleFavorite={vi.fn()}
        requestedLocation={OSLO}
        status="success"
        temperatureUnit="celsius"
      />,
    )

    expect(document.querySelector('time[datetime="2026-07-28T11:00"]'))
      .toHaveTextContent('Now')

    const selectedDay = document
      .querySelector('time[datetime="2026-07-29"]')
      ?.closest('button')

    expect(selectedDay).not.toBeNull()
    await user.click(selectedDay!)

    expect(
      screen.getByRole('heading', { name: 'Hourly · Wed, Jul 29' }),
    ).toBeInTheDocument()
    expect(
      document.querySelector('time[datetime="2026-07-28T11:00"]'),
    ).not.toBeInTheDocument()
    expect(document.querySelector('time[datetime="2026-07-29T00:00"]'))
      .toHaveTextContent('00:00')
    expect(document.querySelector('time[datetime="2026-07-29T01:00"]'))
      .toHaveTextContent('01:00')
    expect(screen.queryByText('Now')).not.toBeInTheDocument()
  })
})
