import { useState } from 'react'
import { Navigation, type ViewName } from './components/Navigation'
import { FavoritesPage } from './pages/FavoritesPage'
import { ForecastPage } from './pages/ForecastPage'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState<ViewName>('forecast')

  return (
    <div className="app-shell">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      {activeView === 'forecast' ? <ForecastPage /> : <FavoritesPage />}
    </div>
  )
}

export default App
