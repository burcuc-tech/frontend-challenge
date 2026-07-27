import { getWeatherCondition, MOCK_DAILY } from '../constants'
import { formatDate, formatTemperature } from '../utils'
import { Panel } from './Panel'

export function DailyForecast() {
  return (
    <Panel title="30-day forecast" action={<button className="text-button" type="button">View more</button>}>
      <div className="daily-list">
        {MOCK_DAILY.map((forecast) => {
          const condition = getWeatherCondition(forecast.weatherCode)

          return (
            <article className="daily-row" key={forecast.date}>
              <time dateTime={forecast.date}>
                {formatDate(`${forecast.date}T12:00`, { weekday: 'short', month: 'short', day: 'numeric' })}
              </time>
              <span className="weather-icon" role="img" aria-label={condition.label}>{condition.icon}</span>
              <span>{formatTemperature(forecast.minimumTemperature)}</span>
              <span className="temperature-range" aria-hidden="true" />
              <strong>{formatTemperature(forecast.maximumTemperature)}</strong>
            </article>
          )
        })}
      </div>
      <div className="pagination" aria-label="Forecast pagination">
        <button disabled type="button">‹</button>
        <button className="pagination__active" type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <span>…</span>
        <button type="button">30</button>
        <button type="button">›</button>
      </div>
    </Panel>
  )
}
