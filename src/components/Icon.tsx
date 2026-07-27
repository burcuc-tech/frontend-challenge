export type IconName =
  | 'alert'
  | 'favorite'
  | 'home'
  | 'map'
  | 'menu'
  | 'search'
  | 'settings'
  | 'trash'
  | 'wind'

interface IconProps {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20 }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    alert: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
    favorite: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />,
    home: <path d="m3 11 9-8 9 8v10h-6v-6H9v6H3Z" />,
    map: <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Zm6-3v15m6-12v15" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    search: <path d="m21 21-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />,
    settings: (
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7-3.5 2-1-2-3.5-2.2.4A8 8 0 0 0 15 6.3L14.2 4h-4.4L9 6.3A8 8 0 0 0 7.2 8L5 7.5 3 11l2 1-2 1 2 3.5 2.2-.4A8 8 0 0 0 9 17.7l.8 2.3h4.4l.8-2.3a8 8 0 0 0 1.8-1.6l2.2.4 2-3.5Z" />
    ),
    trash: <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" />,
    wind: <path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8" />,
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  )
}
