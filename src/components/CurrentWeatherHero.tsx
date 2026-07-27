import { getWeatherCondition } from '../constants'
import type { Location, WeatherForecast } from '../types'
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

interface CurrentWeatherHeroProps {
  forecast: WeatherForecast
  location: Location
}

export function CurrentWeatherHero({
  forecast,
  location,
}: CurrentWeatherHeroProps) {
  const { current, daily } = forecast
  const condition = getWeatherCondition(current.weatherCode)
  const currentDate = current.time.slice(0, 10)
  const currentDay = daily.find((day) => day.date === currentDate) ?? daily[0]

  return (
    <div className="weather-hero__content">
      <div className="location-heading">
        <div>
          <h1 id="location-heading">
            {formatLocation(location.name, location.country)}
          </h1>
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
        <button
          aria-label={`Add ${location.name} to favorites`}
          className="favorite-button"
          type="button"
        >
          <Icon name="favorite" size={26} />
        </button>
      </div>

      <div className="current-weather">
        <span className="current-weather__temperature">
          {formatTemperature(current.temperature)}
        </span>
        <span className="current-weather__unit">C</span>
      </div>
      <h2>{condition.label}</h2>
      <p>Feels like {formatTemperature(current.apparentTemperature)}C</p>

      <article className="now-card">
        <span>NOW</span>
        <WeatherIcon code={current.weatherCode} />
        <strong>{formatTemperature(current.temperature)}</strong>
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
          value={formatVisibility(current.visibility)}
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
