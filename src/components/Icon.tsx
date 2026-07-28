import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Eye,
  Gauge,
  Home,
  Map,
  Plus,
  Search,
  Settings,
  Star,
  Sun,
  Sunrise,
  Sunset,
  Wind,
  type LucideIcon,
} from 'lucide-react'

export type IconName =
  | 'alert'
  | 'favorite'
  | 'humidity'
  | 'home'
  | 'left'
  | 'map'
  | 'plus'
  | 'pressure'
  | 'right'
  | 'search'
  | 'settings'
  | 'sun'
  | 'sunrise'
  | 'sunset'
  | 'visibility'
  | 'wind'
  | 'down'

interface IconProps {
  name: IconName
  size?: number
}

const ICONS: Record<IconName, LucideIcon> = {
  alert: Bell,
  favorite: Star,
  humidity: Droplets,
  home: Home,
  left: ChevronLeft,
  map: Map,
  plus: Plus,
  pressure: Gauge,
  right: ChevronRight,
  search: Search,
  settings: Settings,
  sun: Sun,
  sunrise: Sunrise,
  sunset: Sunset,
  visibility: Eye,
  wind: Wind,
  down: ChevronDown,
}

export function Icon({ name, size = 20 }: IconProps) {
  const LucideIcon = ICONS[name]

  return (
    <LucideIcon
      aria-hidden="true"
      className="icon"
      size={size}
      strokeWidth={1.7}
    />
  )
}
