import type { Location } from '../types'
import { SearchBar } from './SearchBar'

interface DesktopToolbarProps {
  onLocationSelect: (location: Location) => void
}

export function DesktopToolbar({ onLocationSelect }: DesktopToolbarProps) {
  return (
    <header className="desktop-toolbar">
      <SearchBar onLocationSelect={onLocationSelect} />
    </header>
  )
}
