# Weather Forecast MVP

A responsive weather dashboard built for Sprint #24 with React and TypeScript. Users can search for cities worldwide, inspect current and hourly conditions, browse a paginated 30-day weather timeline, and save favorite cities between sessions.

## Features

- Worldwide city search with debounced Open-Meteo geocoding suggestions
- Current weather details, including feels-like temperature, humidity, pressure, wind, visibility, UV index, sunrise, and sunset
- Hourly forecast starting from the selected city's current hour
- Paginated 30-day weather timeline with previous and next navigation
- Favorite city management with duplicate prevention
- Favorite persistence through `localStorage`
- Current weather summaries on the Favorites page
- Persistent Celsius and Fahrenheit preference
- Loading, error, empty, and unavailable states
- Retry action for failed forecast requests without displaying mock weather
- Responsive desktop and mobile layouts
- Keyboard-aware search suggestions with screen-reader semantics and accessible toggle controls
- Automated tests for domain utilities, weather services, and critical UI flows

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS
- Lucide React
- Vitest
- Open-Meteo Geocoding and Forecast APIs

No API key or environment variable is required.

## Getting Started

### Requirements

- Node.js 20.19+ (20.x) or Node.js 22.12+
- npm

### Installation

```bash
git clone https://github.com/burcuc-tech/frontend-challenge.git
cd frontend-challenge
npm install
```

### Development

```bash
npm run dev
```

Open the local URL printed by Vite.

### Production Build

```bash
npm run build
npm run preview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check the project and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm test` | Run the Vitest suite once |

## Project Structure

```text
src/
├── api/          # Open-Meteo request client and external response types
├── assets/       # Optimized local images
├── components/   # Reusable interface and forecast components
├── constants/    # Defaults and WMO weather-code mappings
├── hooks/        # Search, forecast, favorites, and unit state
├── pages/        # Forecast and Favorites page composition
├── services/     # API query construction and domain mapping
├── styles/       # Additional shared visual styles
├── types/        # Application domain models
└── utils/        # Weather formatting and conversion helpers
```

The application keeps external API response types separate from its internal domain models. The service layer builds requests and maps Open-Meteo responses before the data reaches the UI. Feature hooks own asynchronous state, cancellation, and browser persistence, while page and component files focus on presentation and user interaction.

## Technical Decisions

### Data fetching

Open-Meteo was selected because it provides both global geocoding and forecast data without requiring an API key. Requests are built with `URLSearchParams`, and in-flight search and forecast requests can be cancelled with `AbortController`.

The location heading uses a client-side clock formatted in the selected city's timezone instead of treating the API observation timestamp as a live clock. Weather data refreshes shortly after each 15-minute boundary to match Open-Meteo's current-condition interval without making unnecessary requests.

Favorite cards use a smaller dedicated request that fetches only current temperature, weather code, and daily minimum/maximum values. This avoids downloading the complete forecast for every saved city.

### State management

The application uses focused React hooks instead of an external state library. Its state is small and divided by responsibility:

- `useCitySearch` manages debounced suggestions and search states.
- `useWeatherForecast` manages the selected city's forecast.
- `useFavorites` manages favorite locations and persistence.
- `useFavoriteForecasts` loads independent favorite summaries.
- `useTemperatureUnit` manages the persistent display preference.

Only stable user choices are written to `localStorage`; weather snapshots are fetched again so they do not become stale.

### Styling and responsive behavior

The interface follows the supplied mockup while making practical UX adjustments for smaller screens. Shared CSS variables define the dark weather theme, and responsive layouts reorganize navigation, metrics, hourly content, and favorite cards for mobile use.

### Testing

The automated suite covers:

- Celsius/Fahrenheit conversion and weather metric formatting
- Wind direction and UV category boundaries
- WMO weather-code mappings and unknown-code fallback
- Geocoding query construction and response mapping
- Forecast and favorite-summary request parameters
- Forecast response mapping and HTTP error handling
- Keyboard city selection, active-suggestion semantics, and forecast error/retry behavior
- Favorite persistence and temperature-unit controls
- Daily pagination navigation and boundary states

Network-dependent service tests use controlled `fetch` mocks, keeping the suite deterministic and usable offline.

## 30-Day Weather Timeline

Open-Meteo's standard forecast horizon does not provide 30 future days in one request. Following the Sprint resource guidance, the application requests 14 past days and 16 forecast days and displays them as one chronological timeline.

Past days are visually muted and marked with a `Past` label, while today and forecast days retain the standard styling.

This is an explicit product trade-off: the interface provides 30 daily entries, but the complete range is not a 30-day future prediction.

## MVP Scope

The Sprint #24 acceptance criteria for city search, weather display, favorites, pagination, and responsive behavior are implemented. As directed by the Sprint resources, the 30-day view combines historical and forecast data. World Map, Alerts, and Settings remain visibly disabled navigation placeholders, while the profile and Premium area remain visual-only because they are outside the required MVP stories.

## Future Improvements

With more time, I would:

- Add end-to-end tests for complete browser-based user journeys
- Introduce URL routing and shareable city links
- Improve loading feedback with skeletons and an application-level error boundary
- Expand focus management and screen-reader announcements for asynchronous states
- Split the main stylesheet into smaller feature-level modules
- Add expiring forecast caching and responsive image variants
- Use a provider that can supply a genuine 30-day future forecast
- Implement the World Map, Alerts, and Settings experiences

## AI Usage

I used OpenAI Codex as a development assistant to plan incremental work, review architecture and edge cases, help draft tests, and prepare documentation. I reviewed its suggestions against the project requirements and verified the implementation with ESLint, TypeScript, production builds, automated tests, and targeted runtime checks.

I did not adopt every suggestion. For example, I kept state management and view switching within React instead of adding global state or routing libraries that were unnecessary for the MVP.

More detail about the development process and AI-assisted decisions is available in the [Sprint Review](docs/sprint-review.md).

## Documentation

- [Sprint requirements](docs/sprint-24.md)
- [Sprint Review](docs/sprint-review.md)

## Acknowledgements

Weather and geocoding data are provided by [Open-Meteo](https://open-meteo.com/).
