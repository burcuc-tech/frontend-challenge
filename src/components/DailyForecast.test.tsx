import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
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
  it('labels past days without labeling current or future forecast days', () => {
    render(
      <DailyForecast
        currentDate="2026-01-03"
        forecasts={createForecasts(5)}
        onDateSelect={vi.fn()}
        selectedDate="2026-01-03"
        temperatureUnit="celsius"
      />,
    )

    expect(screen.getAllByText('Past')).toHaveLength(2)
    expect(screen.queryByText('Forecast')).not.toBeInTheDocument()

    const pastRow = document
      .querySelector('time[datetime="2026-01-02"]')
      ?.closest('button')
    const currentRow = document
      .querySelector('time[datetime="2026-01-03"]')
      ?.closest('button')

    expect(pastRow).toHaveClass('daily-row--past')
    expect(currentRow).toHaveClass('daily-row--active')
    expect(currentRow).not.toHaveClass('daily-row--past')
  })

  it('navigates pages and enforces previous and next boundaries', async () => {
    const user = userEvent.setup()

    render(
      <DailyForecast
        currentDate="2026-01-01"
        forecasts={createForecasts(15)}
        onDateSelect={vi.fn()}
        selectedDate="2026-01-01"
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

  it('selects a date for its hourly forecast', async () => {
    const onDateSelect = vi.fn()
    const user = userEvent.setup()

    render(
      <DailyForecast
        currentDate="2026-01-03"
        forecasts={createForecasts(5)}
        onDateSelect={onDateSelect}
        selectedDate="2026-01-03"
        temperatureUnit="celsius"
      />,
    )

    await user.click(screen.getByRole('button', { name: /Thu, Jan 1/i }))

    expect(onDateSelect).toHaveBeenCalledWith('2026-01-01')
  })
})
