import { MOCK_HOURLY } from '../constants'
import { formatTemperature } from '../utils'
import { Panel } from './Panel'
import { WeatherIcon } from './WeatherIcon'

export function HourlyForecast() {
  return (
    <Panel title="Hourly forecast" action={<button className="text-button" type="button">View more</button>}>
      <div className="hourly-list">
        {MOCK_HOURLY.map((forecast, index) => (
          <article className={`hourly-item${index === 0 ? ' hourly-item--active' : ''}`} key={forecast.time}>
            <time dateTime={forecast.time}>
              {index === 0 ? 'Now' : forecast.time.slice(11, 16)}
            </time>
            <WeatherIcon code={forecast.weatherCode} />
            <strong>{formatTemperature(forecast.temperature)}</strong>
          </article>
        ))}
      </div>
    </Panel>
  )
}
