import { useEffect, useState } from 'react'
import type { Location } from '../types'

const FAVORITES_STORAGE_KEY = 'weather-forecast:favorites'

function isLocation(value: unknown): value is Location {
  if (!value || typeof value !== 'object') {
    return false
  }

  const location = value as Partial<Location>

  return (
    typeof location.id === 'number' &&
    typeof location.name === 'string' &&
    typeof location.country === 'string' &&
    typeof location.countryCode === 'string' &&
    typeof location.latitude === 'number' &&
    typeof location.longitude === 'number'
  )
}

function loadFavorites(): Location[] {
  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY)

    if (!storedFavorites) {
      return []
    }

    const parsedFavorites: unknown = JSON.parse(storedFavorites)

    if (!Array.isArray(parsedFavorites)) {
      return []
    }

    const uniqueFavorites = new Map<number, Location>()
    parsedFavorites.filter(isLocation).forEach((location) => {
      uniqueFavorites.set(location.id, location)
    })

    return [...uniqueFavorites.values()]
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Location[]>(loadFavorites)

  useEffect(() => {
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites),
      )
    } catch {
      // Favorites remain available for the current session.
    }
  }, [favorites])

  function isFavorite(locationId: number): boolean {
    return favorites.some((favorite) => favorite.id === locationId)
  }

  function toggleFavorite(location: Location) {
    setFavorites((currentFavorites) => (
      currentFavorites.some((favorite) => favorite.id === location.id)
        ? currentFavorites.filter((favorite) => favorite.id !== location.id)
        : [...currentFavorites, location]
    ))
  }

  function removeFavorite(locationId: number) {
    setFavorites((currentFavorites) => (
      currentFavorites.filter((favorite) => favorite.id !== locationId)
    ))
  }

  return {
    favorites,
    isFavorite,
    removeFavorite,
    toggleFavorite,
  }
}
