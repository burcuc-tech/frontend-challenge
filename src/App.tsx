import { useState } from 'react'
import { Navigation, type ViewName } from './components/Navigation'
import { DEFAULT_LOCATION, MOCK_FORECAST } from './constants'
import { useWeatherForecast } from './hooks'
import { FavoritesPage } from './pages/FavoritesPage'
import { ForecastPage } from './pages/ForecastPage'
import type { Location } from './types'
import './App.css'
import './styles/premium.css'

function App() {
  const [activeView, setActiveView] = useState<ViewName>('forecast')
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION)
  const { forecast, status } = useWeatherForecast(location)

  return (
    <div className="app-shell">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      {activeView === 'forecast' ? (
        <ForecastPage
          forecast={forecast ?? MOCK_FORECAST}
          location={location}
          onLocationSelect={setLocation}
          status={status}
        />
      ) : (
        <FavoritesPage />
      )}
    </div>
  )
}

export default App
