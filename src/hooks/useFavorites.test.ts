import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Location } from '../types'
import { useFavorites } from './useFavorites'

const PARIS: Location = {
  id: 2988507,
  name: 'Paris',
  country: 'France',
  countryCode: 'FR',
  latitude: 48.85,
  longitude: 2.35,
  timezone: 'Europe/Paris',
}

describe('useFavorites', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('adds, persists, and removes a favorite without duplicates', () => {
    const { result, unmount } = renderHook(() => useFavorites())

    act(() => result.current.toggleFavorite(PARIS))

    expect(result.current.favorites).toEqual([PARIS])
    expect(JSON.parse(
      window.localStorage.getItem('weather-forecast:favorites') ?? '[]',
    )).toEqual([PARIS])

    unmount()

    const restoredHook = renderHook(() => useFavorites())
    expect(restoredHook.result.current.favorites).toEqual([PARIS])

    act(() => restoredHook.result.current.toggleFavorite(PARIS))
    expect(restoredHook.result.current.favorites).toEqual([])
  })
})
