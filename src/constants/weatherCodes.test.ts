import { describe, expect, it } from 'vitest'
import { getWeatherCondition } from './weatherCodes'

describe('getWeatherCondition', () => {
  it.each([
    [0, 'Clear sky'],
    [2, 'Partly cloudy'],
    [61, 'Light rain'],
    [71, 'Light snow'],
    [95, 'Thunderstorm'],
  ])('maps WMO code %s to %s', (code, label) => {
    expect(getWeatherCondition(code).label).toBe(label)
  })

  it('returns a safe fallback for unknown codes', () => {
    expect(getWeatherCondition(999).label).toBe('Unknown conditions')
  })
})
