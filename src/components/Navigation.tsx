import { Icon, type IconName } from './Icon'
import { WeatherIcon } from './WeatherIcon'
import mariaAvatar from '../assets/maria-avatar.webp'
import type { TemperatureUnit } from '../types'

export type ViewName = 'forecast' | 'favorites'

interface NavigationProps {
  activeView: ViewName
  onViewChange: (view: ViewName) => void
  onTemperatureUnitChange: (unit: TemperatureUnit) => void
  temperatureUnit: TemperatureUnit
}

interface NavigationItem {
  icon: IconName
  label: string
  view?: ViewName
}

const navigationItems: NavigationItem[] = [
  { icon: 'home', label: 'Home', view: 'forecast' },
  { icon: 'map', label: 'World Map' },
  { icon: 'favorite', label: 'Favorites', view: 'favorites' },
  { icon: 'alert', label: 'Alerts' },
  { icon: 'settings', label: 'Settings' },
]

export function Navigation({
  activeView,
  onTemperatureUnitChange,
  onViewChange,
  temperatureUnit,
}: NavigationProps) {
  return (
    <>
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Weather home">
          <WeatherIcon className="brand__mark" code={2} />
          <span>Weather</span>
        </a>

        <nav className="sidebar__nav" aria-label="Main navigation">
          {navigationItems.map((item) => {
            const isActive = item.view === activeView

            return (
              <button
                className={`nav-item${isActive ? ' nav-item--active' : ''}`}
                key={item.label}
                onClick={() => item.view && onViewChange(item.view)}
                type="button"
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar__footer">
          <div className="unit-switch" aria-label="Temperature unit">
            <button
              aria-pressed={temperatureUnit === 'celsius'}
              className={temperatureUnit === 'celsius' ? 'unit-switch__active' : ''}
              onClick={() => onTemperatureUnitChange('celsius')}
              type="button"
            >
              °C
            </button>
            <button
              aria-pressed={temperatureUnit === 'fahrenheit'}
              className={temperatureUnit === 'fahrenheit' ? 'unit-switch__active' : ''}
              onClick={() => onTemperatureUnitChange('fahrenheit')}
              type="button"
            >
              °F
            </button>
          </div>
          <div className="profile">
            <img className="profile__avatar" src={mariaAvatar} alt="" />
            <span><strong>Maria Garcia</strong><small>Premium</small></span>
          </div>
        </div>
      </aside>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigationItems.map((item) => {
          const isActive = item.view === activeView

          return (
            <button
              className={isActive ? 'mobile-nav__active' : ''}
              key={item.label}
              onClick={() => item.view && onViewChange(item.view)}
              type="button"
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label.replace('World ', '')}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
