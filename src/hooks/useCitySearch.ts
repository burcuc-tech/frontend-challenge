import { useEffect, useState } from 'react'
import { searchCities } from '../services'
import type { Location } from '../types'

const MINIMUM_QUERY_LENGTH = 2
const SEARCH_DELAY_MS = 350

type SearchStatus = 'error' | 'idle' | 'loading' | 'success'

interface SearchState {
  query: string
  results: Location[]
  status: SearchStatus
}

export function useCitySearch(query: string) {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    results: [],
    status: 'idle',
  })

  useEffect(() => {
    const normalizedQuery = query.trim()

    if (normalizedQuery.length < MINIMUM_QUERY_LENGTH) {
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      setSearchState({
        query: normalizedQuery,
        results: [],
        status: 'loading',
      })

      try {
        const locations = await searchCities(normalizedQuery, {
          signal: controller.signal,
        })

        setSearchState({
          query: normalizedQuery,
          results: locations,
          status: 'success',
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setSearchState({
          query: normalizedQuery,
          results: [],
          status: 'error',
        })
      }
    }, SEARCH_DELAY_MS)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [query])

  const normalizedQuery = query.trim()

  if (normalizedQuery.length < MINIMUM_QUERY_LENGTH) {
    return {
      results: [],
      status: 'idle' as const,
    }
  }

  if (searchState.query !== normalizedQuery) {
    return {
      results: [],
      status: 'loading' as const,
    }
  }

  return {
    results: searchState.results,
    status: searchState.status,
  }
}
