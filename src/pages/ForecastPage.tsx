import { DEFAULT_LOCATION } from '../constants'
import { formatLocation } from '../utils'
import { CurrentWeatherHero } from '../components/CurrentWeatherHero'
import { DailyForecast } from '../components/DailyForecast'
import { DesktopToolbar } from '../components/DesktopToolbar'
import { HourlyForecast } from '../components/HourlyForecast'
import { Icon } from '../components/Icon'

export function ForecastPage() {
  return (
    <main className="forecast-page">
      <header className="mobile-header">
        <button aria-label="Open menu" type="button"><Icon name="menu" /></button>
        <strong className="mobile-location">
          {formatLocation(DEFAULT_LOCATION.name, DEFAULT_LOCATION.country)}
          <Icon name="down" size={14} />
        </strong>
        <button aria-label="Add to favorites" type="button"><Icon name="favorite" /></button>
      </header>

      <DesktopToolbar />

      <section className="weather-hero" aria-labelledby="location-heading">
        <CurrentWeatherHero />

        <div className="forecast-columns">
          <HourlyForecast />
          <DailyForecast />
        </div>
      </section>
    </main>
  )
}
