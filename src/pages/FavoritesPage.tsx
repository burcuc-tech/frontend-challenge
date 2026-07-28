import { getWeatherCondition } from '../constants'
import { useFavoriteForecasts } from '../hooks'
import type { Location, TemperatureUnit } from '../types'
import { formatTemperature } from '../utils'
import { Icon } from '../components/Icon'
import { WeatherIcon } from '../components/WeatherIcon'

interface FavoritesPageProps {
  favorites: Location[]
  onAddFavorite: () => void
  onLocationSelect: (location: Location) => void
  onRemoveFavorite: (locationId: number) => void
  temperatureUnit: TemperatureUnit
}

export function FavoritesPage({
  favorites,
  onAddFavorite,
  onLocationSelect,
  onRemoveFavorite,
  temperatureUnit,
}: FavoritesPageProps) {
  const { forecasts, isLoading } = useFavoriteForecasts(favorites)

  return (
    <main className="favorites-page">
      <header className="mobile-header">
        <strong>My favorites</strong>
        <button aria-label="Add favorite" onClick={onAddFavorite} type="button">
          <Icon name="plus" />
        </button>
      </header>

      <section className="favorites-card">
        <header className="favorites-card__header">
          <div>
            <h1>My favorites</h1>
            <p>Check the weather in your favorite places</p>
          </div>
          <button className="primary-button" onClick={onAddFavorite} type="button">
            <Icon name="plus" size={18} /> Add favorite
          </button>
        </header>

        <div className="favorites-table" role="table" aria-label="Favorite cities">
          <div className="favorites-table__head" role="row">
            <span role="columnheader">Location</span>
            <span role="columnheader">Current condition</span>
            <span role="columnheader">Temperature</span>
            <span role="columnheader">Min / Max</span>
            <span role="columnheader">Actions</span>
          </div>
          {favorites.map((location) => {
            const favorite = forecasts[location.id]
            const condition = favorite
              ? getWeatherCondition(favorite.weatherCode)
              : null

            return (
              <article className="favorite-row" key={location.id} role="row">
                <div className="favorite-location" role="cell">
                  <span className={`city-thumbnail city-thumbnail--${location.countryCode.toLowerCase()}`} aria-hidden="true" />
                  <button
                    className="favorite-location__button"
                    onClick={() => onLocationSelect(location)}
                    type="button"
                  >
                    <strong>{location.name}</strong>
                    <small>{location.country}</small>
                  </button>
                </div>
                <div className="favorite-condition" role="cell">
                  {favorite && <WeatherIcon code={favorite.weatherCode} />}
                  <span>
                    {condition?.label ?? (isLoading ? 'Loading…' : 'Unavailable')}
                  </span>
                </div>
                <strong role="cell">
                  {favorite
                    ? formatTemperature(
                        favorite.temperature,
                        temperatureUnit,
                        true,
                      )
                    : '—'}
                </strong>
                <span role="cell">
                  {favorite
                    ? `${formatTemperature(favorite.maximumTemperature, temperatureUnit)} / ${formatTemperature(favorite.minimumTemperature, temperatureUnit)}`
                    : '—'}
                </span>
                <div className="favorite-actions" role="cell">
                  <button
                    aria-label={`Remove ${location.name} from favorites`}
                    aria-pressed="true"
                    className="favorite-button favorite-button--active"
                    onClick={() => onRemoveFavorite(location.id)}
                    type="button"
                  >
                    <Icon name="favorite" />
                  </button>
                  <button
                    aria-label={`Delete ${location.name}`}
                    onClick={() => onRemoveFavorite(location.id)}
                    type="button"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </article>
            )
          })}
          {favorites.length === 0 && (
            <div className="favorites-empty" role="row">
              <div role="cell">
                <Icon name="favorite" size={28} />
                <strong>No favorite cities yet</strong>
                <p>Add a city to see its weather here.</p>
                <button className="primary-button" onClick={onAddFavorite} type="button">
                  <Icon name="plus" size={18} /> Add favorite
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
