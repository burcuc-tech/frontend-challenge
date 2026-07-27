import { DEFAULT_LOCATION, getWeatherCondition, MOCK_CURRENT } from '../constants'
import { formatDate, formatLocation, formatTemperature } from '../utils'
import { DailyForecast } from '../components/DailyForecast'
import { HourlyForecast } from '../components/HourlyForecast'
import { Icon } from '../components/Icon'

export function ForecastPage() {
  const condition = getWeatherCondition(MOCK_CURRENT.weatherCode)

  return (
    <main className="forecast-page">
      <header className="mobile-header">
        <button aria-label="Open menu" type="button"><Icon name="menu" /></button>
        <strong>{formatLocation(DEFAULT_LOCATION.name, DEFAULT_LOCATION.country)}</strong>
        <button aria-label="Add to favorites" type="button"><Icon name="favorite" /></button>
      </header>

      <div className="search-bar">
        <Icon name="search" size={18} />
        <input aria-label="Search for a city or country" placeholder="Search for a city or country..." type="search" />
      </div>

      <section className="weather-hero" aria-labelledby="location-heading">
        <div className="weather-hero__content">
          <div className="location-heading">
            <div>
              <h1 id="location-heading">{formatLocation(DEFAULT_LOCATION.name, DEFAULT_LOCATION.country)}</h1>
              <p>{formatDate(MOCK_CURRENT.time, { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
            </div>
            <button aria-label="Add Oslo to favorites" className="favorite-button" type="button">
              <Icon name="favorite" size={26} />
            </button>
          </div>

          <div className="current-weather">
            <span className="current-weather__temperature">{formatTemperature(MOCK_CURRENT.temperature)}</span>
            <span className="current-weather__unit">C</span>
            <span className="current-weather__icon" role="img" aria-label={condition.label}>{condition.icon}</span>
          </div>
          <h2>{condition.label}</h2>
          <p>Feels like {formatTemperature(MOCK_CURRENT.apparentTemperature)}C</p>

          <div className="weather-metrics">
            <div><Icon name="wind" /><strong>{MOCK_CURRENT.windSpeed} km/h</strong><span>SW</span></div>
            <div><span className="metric-symbol">♧</span><strong>{MOCK_CURRENT.humidity}%</strong><span>Humidity</span></div>
            <div><span className="metric-symbol">◉</span><strong>{MOCK_CURRENT.pressure} hPa</strong><span>Pressure</span></div>
          </div>
        </div>

        <div className="forecast-columns">
          <HourlyForecast />
          <DailyForecast />
        </div>
      </section>
    </main>
  )
}
