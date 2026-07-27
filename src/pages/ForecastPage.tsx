import { useState } from 'react'
import type { Location, WeatherForecast } from '../types'
import { formatLocation } from '../utils'
import { CurrentWeatherHero } from '../components/CurrentWeatherHero'
import { DailyForecast } from '../components/DailyForecast'
import { DesktopToolbar } from '../components/DesktopToolbar'
import { HourlyForecast } from '../components/HourlyForecast'
import { Icon } from '../components/Icon'
import { SearchBar } from '../components/SearchBar'

interface ForecastPageProps {
  forecast: WeatherForecast
  location: Location
  onLocationSelect: (location: Location) => void
  requestedLocation: Location
  status: 'error' | 'loading' | 'success'
}

export function ForecastPage({
  forecast,
  location,
  onLocationSelect,
  requestedLocation,
  status,
}: ForecastPageProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const currentHour = forecast.current.time.slice(0, 13)
  const currentHourIndex = forecast.hourly.findIndex(
    (hour) => hour.time.slice(0, 13) === currentHour,
  )
  const visibleHourlyForecasts = forecast.hourly.slice(
    Math.max(currentHourIndex, 0),
    Math.max(currentHourIndex, 0) + 24,
  )
  const currentDate = forecast.current.time.slice(0, 10)

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
        <button aria-label="Add to favorites" type="button"><Icon name="favorite" /></button>
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
        {status !== 'success' && (
          <div className={`forecast-status forecast-status--${status}`} role="status">
            {status === 'loading'
              ? `Loading weather for ${requestedLocation.name}…`
              : `Weather for ${requestedLocation.name} could not be loaded.`}
          </div>
        )}

        <CurrentWeatherHero forecast={forecast} location={location} />

        <div className="forecast-columns">
          <HourlyForecast
            forecasts={visibleHourlyForecasts}
            key={`hourly-${location.id}`}
          />
          <DailyForecast
            currentDate={currentDate}
            forecasts={forecast.daily}
            key={`daily-${location.id}`}
          />
        </div>
      </section>
    </main>
  )
}
