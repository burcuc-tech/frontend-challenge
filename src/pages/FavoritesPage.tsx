import { getWeatherCondition, MOCK_FAVORITES } from '../constants'
import { formatTemperature } from '../utils'
import { Icon } from '../components/Icon'
import { WeatherIcon } from '../components/WeatherIcon'

export function FavoritesPage() {
  return (
    <main className="favorites-page">
      <header className="mobile-header">
        <button aria-label="Open menu" type="button"><Icon name="menu" /></button>
        <strong>My favorites</strong>
        <button aria-label="Add favorite" type="button"><Icon name="plus" /></button>
      </header>

      <section className="favorites-card">
        <header className="favorites-card__header">
          <div>
            <h1>My favorites</h1>
            <p>Check the weather in your favorite places</p>
          </div>
          <button className="primary-button" type="button"><Icon name="plus" size={18} /> Add favorite</button>
        </header>

        <div className="favorites-table" role="table" aria-label="Favorite cities">
          <div className="favorites-table__head" role="row">
            <span role="columnheader">Location</span>
            <span role="columnheader">Current condition</span>
            <span role="columnheader">Temperature</span>
            <span role="columnheader">Min / Max</span>
            <span role="columnheader">Actions</span>
          </div>
          {MOCK_FAVORITES.map((favorite) => {
            const condition = getWeatherCondition(favorite.weatherCode)

            return (
              <article className="favorite-row" key={favorite.location.id} role="row">
                <div className="favorite-location" role="cell">
                  <span className={`city-thumbnail city-thumbnail--${favorite.location.countryCode.toLowerCase()}`} aria-hidden="true" />
                  <span><strong>{favorite.location.name}</strong><small>{favorite.location.country}</small></span>
                </div>
                <div className="favorite-condition" role="cell">
                  <WeatherIcon code={favorite.weatherCode} />
                  <span>{condition.label}</span>
                </div>
                <strong role="cell">{formatTemperature(favorite.temperature)}C</strong>
                <span role="cell">{formatTemperature(favorite.maximumTemperature)} / {formatTemperature(favorite.minimumTemperature)}</span>
                <div className="favorite-actions" role="cell">
                  <button aria-label={`Remove ${favorite.location.name} from favorites`} className="favorite-button favorite-button--active" type="button"><Icon name="favorite" /></button>
                  <button aria-label={`Delete ${favorite.location.name}`} type="button"><Icon name="trash" /></button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
