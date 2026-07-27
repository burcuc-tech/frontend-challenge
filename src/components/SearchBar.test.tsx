import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCitySearch } from '../hooks'
import type { Location } from '../types'
import { SearchBar } from './SearchBar'

vi.mock('../hooks', () => ({
  useCitySearch: vi.fn(),
}))

const BARCELONA: Location = {
  id: 3128760,
  name: 'Barcelona',
  country: 'Spain',
  countryCode: 'ES',
  latitude: 41.38879,
  longitude: 2.15899,
  timezone: 'Europe/Madrid',
}

describe('SearchBar', () => {
  beforeEach(() => {
    vi.mocked(useCitySearch).mockReturnValue({
      results: [BARCELONA],
      status: 'success',
    })
  })

  it('selects a search suggestion with the keyboard', async () => {
    const onLocationSelect = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar onLocationSelect={onLocationSelect} />)

    const input = screen.getByRole('combobox')
    await user.type(input, 'Barcelona')
    await user.keyboard('{ArrowDown}{Enter}')

    expect(onLocationSelect).toHaveBeenCalledWith(BARCELONA)
    expect(input).toHaveValue('')
  })
})
