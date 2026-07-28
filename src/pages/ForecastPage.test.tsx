import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Location } from '../types'
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
})
