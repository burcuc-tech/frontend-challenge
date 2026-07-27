import { useState } from 'react'
import { Navigation, type ViewName } from './components/Navigation'
import { DEFAULT_LOCATION, MOCK_FORECAST } from './constants'
import {
  useFavorites,
  useTemperatureUnit,
  useWeatherForecast,
} from './hooks'
import { FavoritesPage } from './pages/FavoritesPage'
import { ForecastPage } from './pages/ForecastPage'
import type { Location } from './types'
import './App.css'
import './styles/premium.css'

function App() {
  const [activeView, setActiveView] = useState<ViewName>('forecast')
  const [requestedLocation, setRequestedLocation] = useState<Location>(
    DEFAULT_LOCATION,
  )
  const {
    favorites,
    isFavorite,
    removeFavorite,
    toggleFavorite,
  } = useFavorites()
  const {
    setTemperatureUnit,
    temperatureUnit,
  } = useTemperatureUnit()
  const {
    forecast,
    forecastLocation,
    status,
  } = useWeatherForecast(requestedLocation)
  const displayedLocation = forecastLocation ?? DEFAULT_LOCATION
  const displayedLocationIsFavorite = isFavorite(displayedLocation.id)

  function openFavorite(location: Location) {
    setRequestedLocation(location)
    setActiveView('forecast')
  }

  return (
    <div className="app-shell">
      <Navigation
        activeView={activeView}
        onTemperatureUnitChange={setTemperatureUnit}
        onViewChange={setActiveView}
        temperatureUnit={temperatureUnit}
      />
      {activeView === 'forecast' ? (
        <ForecastPage
          forecast={forecast ?? MOCK_FORECAST}
          isFavorite={displayedLocationIsFavorite}
          location={displayedLocation}
          onLocationSelect={setRequestedLocation}
          onToggleFavorite={() => toggleFavorite(displayedLocation)}
          requestedLocation={requestedLocation}
          status={status}
          temperatureUnit={temperatureUnit}
        />
      ) : (
        <FavoritesPage
          favorites={favorites}
          onAddFavorite={() => setActiveView('forecast')}
          onLocationSelect={openFavorite}
          onRemoveFavorite={removeFavorite}
          temperatureUnit={temperatureUnit}
        />
      )}
    </div>
  )
}

export default App
