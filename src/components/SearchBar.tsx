import { useId, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { useCitySearch } from '../hooks'
import type { Location } from '../types'
import { formatLocation } from '../utils'
import { Icon } from './Icon'

interface SearchBarProps {
  onLocationSelect: (location: Location) => void
}

export function SearchBar({ onLocationSelect }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const { results, status } = useCitySearch(query)
  const listboxId = useId()
  const hasQuery = query.trim().length >= 2
  const isOpen = isFocused && hasQuery

  function selectLocation(location: Location) {
    onLocationSelect(location)
    setQuery('')
    setIsFocused(false)
    setActiveIndex(-1)
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextFocusedElement = event.relatedTarget

    if (
      !(nextFocusedElement instanceof Node) ||
      !event.currentTarget.contains(nextFocusedElement)
    ) {
      setIsFocused(false)
      setActiveIndex(-1)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) {
      if (event.key === 'Escape') {
        setIsFocused(false)
      }
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (
        current <= 0 ? results.length - 1 : current - 1
      ))
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      selectLocation(results[activeIndex])
    } else if (event.key === 'Escape') {
      setIsFocused(false)
    }
  }

  return (
    <div className="search" onBlur={handleBlur}>
      <label className="search-bar">
        <Icon name="search" size={18} />
        <input
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-label="Search for a city or country"
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city or country..."
          role="combobox"
          type="search"
          value={query}
        />
      </label>

      {isOpen && (
        <div className="search-results" id={listboxId} role="listbox">
          {status === 'loading' && (
            <p className="search-results__status">Searching cities…</p>
          )}
          {status === 'error' && (
            <p className="search-results__status search-results__status--error">
              City search is unavailable. Please try again.
            </p>
          )}
          {status === 'success' && results.length === 0 && (
            <p className="search-results__status">No matching cities found.</p>
          )}
          {results.map((location, index) => (
            <button
              aria-selected={index === activeIndex}
              className={`search-result${index === activeIndex ? ' search-result--active' : ''}`}
              key={location.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectLocation(location)}
              role="option"
              type="button"
            >
              <span>{location.name}</span>
              <small>{formatLocation(location.country, location.countryCode)}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
