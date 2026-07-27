import { useState } from 'react'
import type {
  Location,
  TemperatureUnit,
  WeatherForecast,
} from '../types'
import { formatLocation } from '../utils'
import { CurrentWeatherHero } from '../components/CurrentWeatherHero'
import { DailyForecast } from '../components/DailyForecast'
import { DesktopToolbar } from '../components/DesktopToolbar'
import { HourlyForecast } from '../components/HourlyForecast'
import { Icon } from '../components/Icon'
import { SearchBar } from '../components/SearchBar'

interface ForecastPageProps {
  forecast: WeatherForecast | null
  isFavorite: boolean
  location: Location
  onLocationSelect: (location: Location) => void
  onRetry: () => void
  onToggleFavorite: () => void
  requestedLocation: Location
  status: 'error' | 'loading' | 'success'
  temperatureUnit: TemperatureUnit
}

export function ForecastPage({
  forecast,
  isFavorite,
  location,
  onLocationSelect,
  onRetry,
  onToggleFavorite,
  requestedLocation,
  status,
  temperatureUnit,
}: ForecastPageProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const currentHour = forecast?.current.time.slice(0, 13) ?? ''
  const currentHourIndex = forecast?.hourly.findIndex(
    (hour) => hour.time.slice(0, 13) === currentHour,
  ) ?? -1
  const visibleHourlyForecasts = forecast?.hourly.slice(
    Math.max(currentHourIndex, 0),
    Math.max(currentHourIndex, 0) + 24,
  ) ?? []
  const currentDate = forecast?.current.time.slice(0, 10) ?? ''

  return (
    <main className="forecast-page">
      <header className="mobile-header">
        <button aria-label="Open menu" type="button"><Icon name="menu" /></button>
        <button
          aria-expanded={isMobileSearchOpen}
          className="mobile-location"
          onClick={() => setIsMobileSearchOpen((isOpen) => !isOpen)}
          type="button"
        >
          {formatLocation(location.name, location.country)}
          <Icon name="down" size={14} />
        </button>
        <button
          aria-label={`${isFavorite ? 'Remove' : 'Add'} ${location.name} ${isFavorite ? 'from' : 'to'} favorites`}
          aria-pressed={isFavorite}
          className={isFavorite ? 'favorite-button--active' : ''}
          onClick={onToggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          type="button"
        >
          <Icon name="favorite" />
        </button>
      </header>

      {isMobileSearchOpen && (
        <div className="mobile-search">
          <SearchBar
            onLocationSelect={(nextLocation) => {
              onLocationSelect(nextLocation)
              setIsMobileSearchOpen(false)
            }}
          />
        </div>
      )}

      <DesktopToolbar onLocationSelect={onLocationSelect} />

      <section className="weather-hero" aria-labelledby="location-heading">
        {forecast && status !== 'success' && (
          <div
            aria-live="polite"
            className={`forecast-status forecast-status--${status}`}
            role={status === 'error' ? 'alert' : 'status'}
          >
            <span>
              {status === 'loading'
                ? `Loading weather for ${requestedLocation.name}…`
                : `Weather for ${requestedLocation.name} could not be loaded.`}
            </span>
            {status === 'error' && (
              <button onClick={onRetry} type="button">Try again</button>
            )}
          </div>
        )}

        {!forecast && (
          <div
            aria-live="polite"
            className={`forecast-state forecast-state--${status}`}
            role={status === 'error' ? 'alert' : 'status'}
          >
            <Icon name={status === 'error' ? 'alert' : 'sun'} size={30} />
            <h1 id="location-heading">
              {status === 'loading'
                ? `Loading weather for ${requestedLocation.name}`
                : `Weather for ${requestedLocation.name} is unavailable`}
            </h1>
            <p>
              {status === 'loading'
                ? 'Current conditions and forecasts are on the way.'
                : 'Check your connection and try the request again.'}
            </p>
            {status === 'error' && (
              <button className="primary-button" onClick={onRetry} type="button">
                Try again
              </button>
            )}
          </div>
        )}

        {forecast && (
          <>
            <CurrentWeatherHero
              forecast={forecast}
              isFavorite={isFavorite}
              location={location}
              onToggleFavorite={onToggleFavorite}
              temperatureUnit={temperatureUnit}
            />

            <div className="forecast-columns">
              <HourlyForecast
                forecasts={visibleHourlyForecasts}
                key={`hourly-${location.id}`}
                temperatureUnit={temperatureUnit}
              />
              <DailyForecast
                currentDate={currentDate}
                forecasts={forecast.daily}
                key={`daily-${location.id}`}
                temperatureUnit={temperatureUnit}
              />
            </div>
          </>
        )}
      </section>
    </main>
  )
}
