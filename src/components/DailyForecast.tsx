import { MOCK_DAILY } from '../constants'
import { formatDate, formatTemperature } from '../utils'
import { Panel } from './Panel'
import { WeatherIcon } from './WeatherIcon'
import { Icon } from './Icon'

export function DailyForecast() {
  return (
    <Panel title="30-day forecast" action={<button className="text-button" type="button">View more</button>}>
      <div className="daily-list">
        {MOCK_DAILY.map((forecast, index) => {
          return (
            <article className={`daily-row${index === 0 ? ' daily-row--active' : ''}`} key={forecast.date}>
              <time dateTime={forecast.date}>
                {formatDate(`${forecast.date}T12:00`, { weekday: 'short', month: 'short', day: 'numeric' })}
              </time>
              <WeatherIcon code={forecast.weatherCode} />
              <span>{formatTemperature(forecast.minimumTemperature)}</span>
              <span className="temperature-range" aria-hidden="true" />
              <strong>{formatTemperature(forecast.maximumTemperature)}</strong>
            </article>
          )
        })}
      </div>
      <div className="pagination" aria-label="Forecast pagination">
        <button aria-label="Previous page" disabled type="button"><Icon name="left" size={16} /></button>
        <button className="pagination__active" type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <span>…</span>
        <button type="button">30</button>
        <button aria-label="Next page" type="button"><Icon name="right" size={16} /></button>
      </div>
    </Panel>
  )
}
