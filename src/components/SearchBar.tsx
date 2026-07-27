import { Icon } from './Icon'

export function SearchBar() {
  return (
    <label className="search-bar">
      <Icon name="search" size={18} />
      <input
        aria-label="Search for a city or country"
        placeholder="Search for a city or country..."
        type="search"
      />
    </label>
  )
}
