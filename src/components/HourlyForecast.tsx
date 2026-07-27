import { getWeatherCondition, MOCK_HOURLY } from '../constants'
import { formatTemperature } from '../utils'
import { Panel } from './Panel'

export function HourlyForecast() {
  return (
    <Panel title="Hourly forecast" action={<button className="text-button" type="button">View more</button>}>
      <div className="hourly-list">
        {MOCK_HOURLY.map((forecast, index) => (
          <article className="hourly-item" key={forecast.time}>
            <time dateTime={forecast.time}>
              {index === 0 ? 'Now' : forecast.time.slice(11, 16)}
            </time>
            <span className="weather-icon" role="img" aria-label={getWeatherCondition(forecast.weatherCode).label}>
              {getWeatherCondition(forecast.weatherCode).icon}
            </span>
            <strong>{formatTemperature(forecast.temperature)}</strong>
          </article>
        ))}
      </div>
    </Panel>
  )
}
