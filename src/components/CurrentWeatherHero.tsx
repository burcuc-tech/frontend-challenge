import { getWeatherCondition } from '../constants'
import type { Location, TemperatureUnit, WeatherForecast } from '../types'
import {
  formatDate,
  formatLocation,
  formatTemperature,
  formatTime,
  formatVisibility,
  formatWindDirection,
  getUvIndexLabel,
} from '../utils'
import { Icon } from './Icon'
import { MetricCard } from './MetricCard'
import { WeatherIcon } from './WeatherIcon'

interface CurrentWeatherHeroProps {
  forecast: WeatherForecast
  isFavorite: boolean
  location: Location
  onToggleFavorite: () => void
  temperatureUnit: TemperatureUnit
}

export function CurrentWeatherHero({
  forecast,
  isFavorite,
  location,
  onToggleFavorite,
  temperatureUnit,
}: CurrentWeatherHeroProps) {
  const { current, daily } = forecast
  const condition = getWeatherCondition(current.weatherCode)
  const currentDate = current.time.slice(0, 10)
  const currentDay = daily.find((day) => day.date === currentDate) ?? daily[0]
  const uvIndex = currentDay?.uvIndex

  return (
    <div className="weather-hero__content">
      <div className="location-heading">
        <div>
          <div className="location-title">
            <h1 id="location-heading">
              {formatLocation(location.name, location.country)}
            </h1>
            <button
              aria-label={`${isFavorite ? 'Remove' : 'Add'} ${location.name} ${isFavorite ? 'from' : 'to'} favorites`}
              aria-pressed={isFavorite}
              className={`favorite-button${isFavorite ? ' favorite-button--active' : ''}`}
              onClick={onToggleFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              type="button"
            >
              <Icon name="favorite" size={22} />
            </button>
          </div>
          <p>
            {formatDate(current.time, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      <div className="current-weather">
        <span className="current-weather__temperature">
          {formatTemperature(current.temperature, temperatureUnit)}
        </span>
        <span className="current-weather__unit">
          {temperatureUnit === 'fahrenheit' ? 'F' : 'C'}
        </span>
      </div>
      <h2>{condition.label}</h2>
      <p>
        Feels like{' '}
        {formatTemperature(current.apparentTemperature, temperatureUnit, true)}
      </p>

      <article className="now-card">
        <span>NOW</span>
        <WeatherIcon code={current.weatherCode} />
        <strong>{formatTemperature(current.temperature, temperatureUnit)}</strong>
      </article>

      <div className="weather-metrics">
        <div>
          <Icon name="wind" />
          <strong>{Math.round(current.windSpeed)} km/h</strong>
          <span>{formatWindDirection(current.windDirection)}</span>
        </div>
        <div>
          <Icon name="humidity" />
          <strong>{Math.round(current.humidity)}%</strong>
          <span>Humidity</span>
        </div>
        <div>
          <Icon name="pressure" />
          <strong>{Math.round(current.pressure)} hPa</strong>
          <span>Pressure</span>
        </div>
      </div>

      <div className="metric-cards">
        <MetricCard
          detail={uvIndex === undefined ? undefined : getUvIndexLabel(uvIndex)}
          icon="sun"
          kind="uv"
          label="UV Index"
          value={uvIndex === undefined ? '—' : String(Math.round(uvIndex))}
        />
        <MetricCard
          icon="visibility"
          kind="visibility"
          label="Visibility"
          value={formatVisibility(current.visibility)}
        />
        <MetricCard
          icon="sunrise"
          kind="sunrise"
          label="Sunrise"
          value={currentDay ? formatTime(currentDay.sunrise) : '—'}
        />
        <MetricCard
          icon="sunset"
          kind="sunset"
          label="Sunset"
          value={currentDay ? formatTime(currentDay.sunset) : '—'}
        />
      </div>
    </div>
  )
}
