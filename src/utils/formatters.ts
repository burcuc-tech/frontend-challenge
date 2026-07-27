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
