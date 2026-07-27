import { getWeatherCondition, MOCK_FAVORITES } from '../constants'
import { formatTemperature } from '../utils'
import { Icon } from '../components/Icon'

export function FavoritesPage() {
  return (
    <main className="favorites-page">
      <header className="mobile-header">
        <button aria-label="Open menu" type="button"><Icon name="menu" /></button>
        <strong>My favorites</strong>
        <button aria-label="Add favorite" type="button">＋</button>
      </header>

      <section className="favorites-card">
        <header className="favorites-card__header">
          <div>
            <h1>My favorites</h1>
            <p>Check the weather in your favorite places</p>
          </div>
          <button className="primary-button" type="button">＋ Add favorite</button>
        </header>

        <div className="favorites-table" role="table" aria-label="Favorite cities">
          <div className="favorites-table__head" role="row">
            <span>Location</span><span>Current condition</span><span>Temperature</span><span>Min / Max</span><span>Actions</span>
          </div>
          {MOCK_FAVORITES.map((favorite) => {
            const condition = getWeatherCondition(favorite.weatherCode)

            return (
              <article className="favorite-row" key={favorite.location.id} role="row">
                <div className="favorite-location">
                  <span className="city-thumbnail" aria-hidden="true">🏙️</span>
                  <span><strong>{favorite.location.name}</strong><small>{favorite.location.country}</small></span>
                </div>
                <div className="favorite-condition">
                  <span className="weather-icon" role="img" aria-label={condition.label}>{condition.icon}</span>
                  <span>{condition.label}</span>
                </div>
                <strong>{formatTemperature(favorite.temperature)}C</strong>
                <span>{formatTemperature(favorite.maximumTemperature)} / {formatTemperature(favorite.minimumTemperature)}</span>
                <div className="favorite-actions">
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
