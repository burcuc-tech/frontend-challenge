import { Icon } from './Icon'
import { SearchBar } from './SearchBar'

export function DesktopToolbar() {
  return (
    <header className="desktop-toolbar">
      <SearchBar />
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
