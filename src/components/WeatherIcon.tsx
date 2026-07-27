import { getWeatherCondition } from '../constants'

interface WeatherIconProps {
  code: number
  className?: string
}

function Sun() {
  return (
    <>
      <circle cx="12" cy="12" r="4" fill="#ffc928" stroke="#ffc928" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="#ffc928"
      />
    </>
  )
}

function Cloud({ dark = false }: { dark?: boolean }) {
  return (
    <path
      d="M6.7 18.5h10.6a4.2 4.2 0 0 0 .3-8.4A6 6 0 0 0 6.2 9a4.8 4.8 0 0 0 .5 9.5Z"
      fill={dark ? '#91a9c1' : '#e7f2fc'}
      stroke={dark ? '#91a9c1' : '#e7f2fc'}
    />
  )
}

export function WeatherIcon({ className = '', code }: WeatherIconProps) {
  const condition = getWeatherCondition(code)
  const isClear = code === 0
  const isCloudy = [1, 2, 3].includes(code)
  const isRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82)
  const isSnow = (code >= 71 && code <= 77) || (code >= 85 && code <= 86)
  const isThunder = code >= 95
  const isFog = code === 45 || code === 48

  return (
    <svg
      aria-label={condition.label}
      className={`weather-svg ${className}`.trim()}
      role="img"
      viewBox="0 0 24 24"
    >
      <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        {isClear && <Sun />}
        {isCloudy && (
          <>
            {code !== 3 && (
              <g transform="translate(4 -4) scale(.72)">
                <Sun />
              </g>
            )}
            <Cloud dark={code === 3} />
          </>
        )}
        {(isRain || isSnow || isThunder) && <Cloud dark={isThunder} />}
        {isRain && (
          <path d="m8 20-1 2m5-2-1 2m5-2-1 2" stroke="#53b7ff" />
        )}
        {isSnow && (
          <path
            d="M8 20v3m-1.3-2.3 2.6 1.6m0-1.6-2.6 1.6M15 20v3m-1.3-2.3 2.6 1.6m0-1.6-2.6 1.6"
            stroke="#bce8ff"
          />
        )}
        {isThunder && (
          <path
            d="m13 16-3 5h3l-1 3 4-6h-3l2-2Z"
            fill="#ffc928"
            stroke="#ffc928"
          />
        )}
        {isFog && (
          <path
            d="M4 9h16M2 13h17M5 17h17"
            fill="none"
            stroke="#a9bfd3"
          />
        )}
        {!isClear &&
          !isCloudy &&
          !isRain &&
          !isSnow &&
          !isThunder &&
          !isFog && <Cloud />}
      </g>
    </svg>
  )
}
