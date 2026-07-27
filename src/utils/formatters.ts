const DEFAULT_LOCALE = 'en-US'

export function formatTemperature(value: number): string {
  return `${Math.round(value)}°`
}

export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions,
  locale = DEFAULT_LOCALE,
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}

export function formatLocation(name: string, country: string): string {
  return [name, country].filter(Boolean).join(', ')
}

export function formatTime(value: string, locale = DEFAULT_LOCALE): string {
  return formatDate(value, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }, locale)
}

export function formatVisibility(valueInMeters: number): string {
  const valueInKilometers = valueInMeters / 1000
  return `${Number(valueInKilometers.toFixed(1))} km`
}

export function formatWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const normalizedDegrees = ((degrees % 360) + 360) % 360
  const index = Math.round(normalizedDegrees / 45) % directions.length

  return directions[index]
}
