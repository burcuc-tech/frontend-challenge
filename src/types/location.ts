export interface Location {
  id: number
  name: string
  country: string
  countryCode: string
  latitude: number
  longitude: number
  timezone?: string
}

export type FavoriteLocation = Location
