import {
  DEFAULT_LOCATION,
  getWeatherCondition,
  MOCK_CURRENT,
  MOCK_DAILY,
} from '../constants'
import {
  formatDate,
  formatLocation,
  formatTemperature,
  formatTime,
  formatVisibility,
  formatWindDirection,
} from '../utils'
import { Icon } from './Icon'
import { MetricCard } from './MetricCard'
import { WeatherIcon } from './WeatherIcon'

export function CurrentWeatherHero() {
  const condition = getWeatherCondition(MOCK_CURRENT.weatherCode)
  const currentDay = MOCK_DAILY[0]

  return (
    <div className="weather-hero__content">
      <div className="location-heading">
        <div>
          <h1 id="location-heading">
            {formatLocation(DEFAULT_LOCATION.name, DEFAULT_LOCATION.country)}
          </h1>
          <p>
            {formatDate(MOCK_CURRENT.time, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>
        <button
          aria-label="Add Oslo to favorites"
          className="favorite-button"
          type="button"
        >
          <Icon name="favorite" size={26} />
        </button>
      </div>

      <div className="current-weather">
        <span className="current-weather__temperature">
          {formatTemperature(MOCK_CURRENT.temperature)}
        </span>
        <span className="current-weather__unit">C</span>
      </div>
      <h2>{condition.label}</h2>
      <p>Feels like {formatTemperature(MOCK_CURRENT.apparentTemperature)}C</p>

      <article className="now-card">
        <span>NOW</span>
        <WeatherIcon code={MOCK_CURRENT.weatherCode} />
        <strong>{formatTemperature(MOCK_CURRENT.temperature)}</strong>
      </article>

      <div className="weather-metrics">
        <div>
          <Icon name="wind" />
          <strong>{MOCK_CURRENT.windSpeed} km/h</strong>
          <span>{formatWindDirection(MOCK_CURRENT.windDirection)}</span>
        </div>
        <div>
          <Icon name="humidity" />
          <strong>{MOCK_CURRENT.humidity}%</strong>
          <span>Humidity</span>
        </div>
        <div>
          <Icon name="pressure" />
          <strong>{MOCK_CURRENT.pressure} hPa</strong>
          <span>Pressure</span>
        </div>
      </div>

      <div className="metric-cards">
        <MetricCard
          detail="Moderate"
          icon="sun"
          kind="uv"
          label="UV Index"
          value={String(Math.round(currentDay.uvIndex))}
        />
        <MetricCard
          icon="visibility"
          kind="visibility"
          label="Visibility"
          value={formatVisibility(MOCK_CURRENT.visibility)}
        />
        <MetricCard
          icon="sunrise"
          kind="sunrise"
          label="Sunrise"
          value={formatTime(currentDay.sunrise)}
        />
        <MetricCard
          icon="sunset"
          kind="sunset"
          label="Sunset"
          value={formatTime(currentDay.sunset)}
        />
      </div>
    </div>
  )
}
