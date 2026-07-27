import type { Location } from '../types'
import { Icon } from './Icon'
import { SearchBar } from './SearchBar'

interface DesktopToolbarProps {
  onLocationSelect: (location: Location) => void
}

export function DesktopToolbar({ onLocationSelect }: DesktopToolbarProps) {
  return (
    <header className="desktop-toolbar">
      <SearchBar onLocationSelect={onLocationSelect} />
      <div className="toolbar-actions">
        <button aria-label="Display settings" type="button">
          <Icon name="sun" />
        </button>
        <button aria-label="Application settings" type="button">
          <Icon name="settings" />
        </button>
      </div>
    </header>
  )
}
