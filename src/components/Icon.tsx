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
  Menu,
  Plus,
  Search,
  Settings,
  Star,
  Sun,
  Sunrise,
  Sunset,
  Trash2,
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
  | 'menu'
  | 'plus'
  | 'pressure'
  | 'right'
  | 'search'
  | 'settings'
  | 'sun'
  | 'sunrise'
  | 'sunset'
  | 'trash'
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
  menu: Menu,
  plus: Plus,
  pressure: Gauge,
  right: ChevronRight,
  search: Search,
  settings: Settings,
  sun: Sun,
  sunrise: Sunrise,
  sunset: Sunset,
  trash: Trash2,
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
