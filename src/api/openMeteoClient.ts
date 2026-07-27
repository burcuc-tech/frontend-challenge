const OPEN_METEO_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const OPEN_METEO_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

export class OpenMeteoApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'OpenMeteoApiError'
    this.status = status
  }
}

interface RequestOptions {
  params: URLSearchParams
  signal?: AbortSignal
}

async function request<T>(url: string, { params, signal }: RequestOptions): Promise<T> {
  const response = await fetch(`${url}?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    let message = `Weather service request failed (${response.status})`

    try {
      const error = (await response.json()) as { reason?: string }
      message = error.reason || message
    } catch {
      // The fallback message already contains the useful HTTP status.
    }

    throw new OpenMeteoApiError(message, response.status)
  }

  return (await response.json()) as T
}

export function requestGeocoding<T>(options: RequestOptions): Promise<T> {
  return request<T>(OPEN_METEO_GEOCODING_URL, options)
}

export function requestForecast<T>(options: RequestOptions): Promise<T> {
  return request<T>(OPEN_METEO_FORECAST_URL, options)
}
