import type { HourlyForecast as HourlyForecastData } from '../types'
import { formatTemperature } from '../utils'
import { Panel } from './Panel'
import { WeatherIcon } from './WeatherIcon'

interface HourlyForecastProps {
  forecasts: HourlyForecastData[]
}

export function HourlyForecast({ forecasts }: HourlyForecastProps) {
  return (
    <Panel title="Hourly forecast" action={<button className="text-button" type="button">View more</button>}>
      <div className="hourly-list">
        {forecasts.map((forecast, index) => (
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
