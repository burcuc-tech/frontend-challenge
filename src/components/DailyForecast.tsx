import { useState } from 'react'
import type {
  DailyForecast as DailyForecastData,
  TemperatureUnit,
} from '../types'
import { formatDate, formatTemperature } from '../utils'
import { Panel } from './Panel'
import { WeatherIcon } from './WeatherIcon'
import { Icon } from './Icon'

interface DailyForecastProps {
  currentDate: string
  forecasts: DailyForecastData[]
  temperatureUnit: TemperatureUnit
}

const FORECASTS_PER_PAGE = 7

export function DailyForecast({
  currentDate,
  forecasts,
  temperatureUnit,
}: DailyForecastProps) {
  const currentDayIndex = forecasts.findIndex(
    (forecast) => forecast.date === currentDate,
  )
  const initialPage = Math.floor(
    Math.max(currentDayIndex, 0) / FORECASTS_PER_PAGE,
  )
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isExpanded, setIsExpanded] = useState(false)
  const totalPages = Math.ceil(forecasts.length / FORECASTS_PER_PAGE)
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages - 1, 0))
  const pageStart = safeCurrentPage * FORECASTS_PER_PAGE
  const visibleForecasts = isExpanded
    ? forecasts
    : forecasts.slice(pageStart, pageStart + FORECASTS_PER_PAGE)
  const placeholderCount = !isExpanded && forecasts.length > 0
    ? FORECASTS_PER_PAGE - visibleForecasts.length
    : 0
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index)

  return (
    <Panel
      title="30-day forecast"
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
      <div className={`daily-list${isExpanded ? ' daily-list--expanded' : ''}`}>
        {visibleForecasts.map((forecast) => {
          const isPast = forecast.date < currentDate
          const isCurrentDay = forecast.date === currentDate

          return (
            <article
              className={`daily-row${isPast ? ' daily-row--past' : ''}${isCurrentDay ? ' daily-row--active' : ''}`}
              key={forecast.date}
            >
              <div className="daily-row__date">
                <time dateTime={forecast.date}>
                  {formatDate(`${forecast.date}T12:00`, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                {isPast && (
                  <span className="daily-row__label">Past</span>
                )}
              </div>
              <WeatherIcon code={forecast.weatherCode} />
              <span>
                {formatTemperature(
                  forecast.minimumTemperature,
                  temperatureUnit,
                )}
              </span>
              <span className="temperature-range" aria-hidden="true" />
              <strong>
                {formatTemperature(
                  forecast.maximumTemperature,
                  temperatureUnit,
                )}
              </strong>
            </article>
          )
        })}
        {Array.from({ length: placeholderCount }, (_, index) => (
          <div
            className="daily-row daily-row--placeholder"
            key={`placeholder-${index}`}
          >
            <span>Forecast unavailable</span>
            <span aria-hidden="true">—</span>
            <span aria-hidden="true">—</span>
            <span
              aria-hidden="true"
              className="temperature-range temperature-range--empty"
            />
            <span aria-hidden="true">—</span>
          </div>
        ))}
        {visibleForecasts.length === 0 && (
          <p className="forecast-empty">No daily forecast available.</p>
        )}
      </div>
      {!isExpanded && totalPages > 0 && (
        <nav className="pagination" aria-label="Forecast pagination">
          <button
            aria-label="Previous page"
            disabled={safeCurrentPage === 0}
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
            type="button"
          >
            <Icon name="left" size={16} />
          </button>
          {pageNumbers.map((page) => (
            <button
              aria-current={page === safeCurrentPage ? 'page' : undefined}
              aria-label={`Page ${page + 1}`}
              className={page === safeCurrentPage ? 'pagination__active' : ''}
              key={page}
              onClick={() => setCurrentPage(page)}
              type="button"
            >
              {page + 1}
            </button>
          ))}
          <button
            aria-label="Next page"
            disabled={safeCurrentPage === totalPages - 1}
            onClick={() => setCurrentPage((page) => (
              Math.min(page + 1, totalPages - 1)
            ))}
            type="button"
          >
            <Icon name="right" size={16} />
          </button>
        </nav>
      )}
    </Panel>
  )
}
