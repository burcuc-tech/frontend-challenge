import { useState } from 'react'
import type {
  HourlyForecast as HourlyForecastData,
  TemperatureUnit,
} from '../types'
import { formatTemperature } from '../utils'
import { Panel } from './Panel'
import { WeatherIcon } from './WeatherIcon'

interface HourlyForecastProps {
  forecasts: HourlyForecastData[]
  isCurrentDay: boolean
  temperatureUnit: TemperatureUnit
  title: string
}

export function HourlyForecast({
  forecasts,
  isCurrentDay,
  temperatureUnit,
  title,
}: HourlyForecastProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleForecasts = forecasts.slice(0, isExpanded ? 24 : 8)

  return (
    <Panel
      title={title}
      action={(
        <button
          className="text-button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          type="button"
        >
          {isExpanded ? 'View less' : 'View more'}
        </button>
      )}
    >
      <div
        className={`hourly-list${isExpanded ? ' hourly-list--expanded' : ''}`}
      >
        {visibleForecasts.map((forecast, index) => (
          <article className={`hourly-item${index === 0 ? ' hourly-item--active' : ''}`} key={forecast.time}>
            <time dateTime={forecast.time}>
              {isCurrentDay && index === 0
                ? 'Now'
                : forecast.time.slice(11, 16)}
            </time>
            <WeatherIcon code={forecast.weatherCode} />
            <strong>
              {formatTemperature(forecast.temperature, temperatureUnit)}
            </strong>
          </article>
        ))}
        {visibleForecasts.length === 0 && (
          <p className="forecast-empty">No hourly forecast available.</p>
        )}
      </div>
    </Panel>
  )
}
