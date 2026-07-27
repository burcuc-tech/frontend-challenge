import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { DailyForecast as DailyForecastData } from '../types'
import { DailyForecast } from './DailyForecast'

function createForecasts(count: number): DailyForecastData[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(Date.UTC(2026, 0, index + 1))
      .toISOString()
      .slice(0, 10)

    return {
      date,
      minimumTemperature: 5 + index,
      maximumTemperature: 10 + index,
      sunrise: `${date}T08:00`,
      sunset: `${date}T17:00`,
      uvIndex: 2,
      weatherCode: 2,
    }
  })
}

describe('DailyForecast', () => {
  it('navigates pages and enforces previous and next boundaries', async () => {
    const user = userEvent.setup()

    render(
      <DailyForecast
        currentDate="2026-01-01"
        forecasts={createForecasts(15)}
        temperatureUnit="celsius"
      />,
    )

    const previousButton = screen.getByRole('button', {
      name: 'Previous page',
    })
    const nextButton = screen.getByRole('button', { name: 'Next page' })

    expect(previousButton).toBeDisabled()
    expect(document.querySelector('time[datetime="2026-01-01"]')).toBeVisible()

    await user.click(nextButton)
    expect(document.querySelector('time[datetime="2026-01-08"]')).toBeVisible()

    await user.click(nextButton)
    expect(document.querySelector('time[datetime="2026-01-15"]')).toBeVisible()
    expect(nextButton).toBeDisabled()

    await user.click(previousButton)
    expect(document.querySelector('time[datetime="2026-01-08"]')).toBeVisible()
  })
})
