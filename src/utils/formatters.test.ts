import { describe, expect, it } from 'vitest'
import {
  convertTemperature,
  formatTemperature,
  formatVisibility,
  formatWindDirection,
  getUvIndexLabel,
} from './formatters'

describe('temperature formatting', () => {
  it('keeps Celsius values unchanged', () => {
    expect(convertTemperature(12, 'celsius')).toBe(12)
    expect(formatTemperature(12.4, 'celsius', true)).toBe('12°C')
  })

  it('converts Celsius values to Fahrenheit', () => {
    expect(convertTemperature(0, 'fahrenheit')).toBe(32)
    expect(convertTemperature(-20, 'fahrenheit')).toBe(-4)
    expect(formatTemperature(12, 'fahrenheit', true)).toBe('54°F')
  })
})

describe('weather metric formatting', () => {
  it('formats visibility in kilometers', () => {
    expect(formatVisibility(10000)).toBe('10 km')
    expect(formatVisibility(1250)).toBe('1.3 km')
  })

  it.each([
    [0, 'N'],
    [45, 'NE'],
    [90, 'E'],
    [135, 'SE'],
    [180, 'S'],
    [225, 'SW'],
    [270, 'W'],
    [315, 'NW'],
    [360, 'N'],
    [-45, 'NW'],
    [22.49, 'N'],
    [22.5, 'NE'],
    [337.5, 'N'],
  ])('maps %s degrees to %s', (degrees, direction) => {
    expect(formatWindDirection(degrees)).toBe(direction)
  })

  it.each([
    [0, 'Low'],
    [2, 'Low'],
    [3, 'Moderate'],
    [5, 'Moderate'],
    [6, 'High'],
    [7, 'High'],
    [8, 'Very high'],
    [10, 'Very high'],
    [11, 'Extreme'],
  ])('maps UV index %s to %s', (value, label) => {
    expect(getUvIndexLabel(value)).toBe(label)
  })
})
