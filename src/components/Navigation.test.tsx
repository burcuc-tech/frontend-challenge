import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Navigation } from './Navigation'

describe('Navigation', () => {
  it('changes the temperature unit from the sidebar control', async () => {
    const onTemperatureUnitChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Navigation
        activeView="forecast"
        onTemperatureUnitChange={onTemperatureUnitChange}
        onViewChange={vi.fn()}
        temperatureUnit="celsius"
      />,
    )

    const fahrenheitButton = screen.getByRole('button', { name: '°F' })
    expect(fahrenheitButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(fahrenheitButton)

    expect(onTemperatureUnitChange).toHaveBeenCalledWith('fahrenheit')
  })

  it('disables features outside the MVP scope', () => {
    render(
      <Navigation
        activeView="forecast"
        onTemperatureUnitChange={vi.fn()}
        onViewChange={vi.fn()}
        temperatureUnit="celsius"
      />,
    )

    for (const label of ['World Map', 'Alerts', 'Settings']) {
      screen.getAllByRole('button', { name: label }).forEach((button) => {
        expect(button).toBeDisabled()
      })
    }
  })
})
