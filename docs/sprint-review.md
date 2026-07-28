# Sprint Review — Weather Forecast MVP

## Project Summary

I built a responsive weather dashboard with React and TypeScript. Users can search for cities worldwide, select a result, and view live current, hourly, and daily weather data.

The application also supports:

- A paginated 30-day weather timeline
- Favorite city management
- Favorite persistence between sessions
- Live weather summaries for saved cities
- Persistent Celsius and Fahrenheit selection
- Loading, error, empty, and unavailable states
- Retry behavior for failed forecast requests
- Desktop and mobile layouts

Weather and geocoding data come from Open-Meteo.

## Project Architecture

I organized the project by technical responsibility:

- `api` contains the Open-Meteo client and external API response types.
- `services` builds API queries and maps external responses to application models.
- `hooks` manages asynchronous behavior, cancellation, persistence, and feature state.
- `components` contains reusable interface elements.
- `pages` composes components into the Forecast and Favorites views.
- `types`, `constants`, and `utils` contain shared domain models, mappings, and formatters.

I chose this structure to keep API details out of the UI. Components consume application models rather than raw Open-Meteo responses, so changes to the external response format can be handled in one mapping layer.

The structure also keeps each hook focused on a single concern. Search, forecast loading, favorites, favorite summaries, and temperature preferences can evolve independently without introducing a global state dependency.

## Technical Decisions

### State management

I used React state and focused custom hooks instead of adding an external state-management library. The application state is relatively small, and most of it belongs to a specific feature.

Favorites and the selected temperature unit are stored in `localStorage`. Only stable user choices are persisted; weather results are fetched again so cached forecasts do not become stale.

The persistence hooks validate stored values and continue working in memory if browser storage is unavailable.

### Data fetching

I selected Open-Meteo because it offers worldwide geocoding and weather data without an API key.

Requests are created with `URLSearchParams`, and `AbortController` is used to cancel obsolete searches and forecast requests. City search is debounced to avoid sending a request for every keystroke.

The Favorites page uses a dedicated summary request. It fetches only the fields needed by each favorite card instead of downloading the full hourly and daily forecast for every saved location.

Favorite summary requests use `Promise.allSettled`, allowing one failed city request to show as unavailable without failing the complete Favorites page.

### Domain mapping

Raw Open-Meteo response types are kept separate from the application's `Location`, `WeatherForecast`, and `FavoriteWeather` models.

The service layer converts API field names and nested arrays into UI-friendly objects. This prevents presentation components from depending directly on the external API contract.

### Component architecture

Repeated interface patterns are represented by focused components such as `Panel`, `MetricCard`, `WeatherIcon`, and `Icon`. Larger forecast sections are separated into current, hourly, and daily components.

WMO weather codes are mapped centrally so the hero, forecast rows, and Favorites page always use the same label and icon for a condition.

### Styling and responsive behavior

I used controlled CSS with shared theme variables and responsive rules. Tailwind support remains available in the project, but custom CSS made the supplied dashboard layout and its mobile adaptations easier to control precisely.

The mobile version is not only a scaled-down desktop view. Navigation moves to the bottom, content groups are reorganized, hourly items become horizontally scrollable, and favorites use a card layout.

### Hero background image

The hero background uses a mountain-and-lake image generated with an AI image tool, since the initial reference images did not match the composition described by the design: a mountain positioned to the left, a visible lake surface, and enough room for readable text.

The first version of this image was large enough to noticeably delay the initial page load, especially in the hero section where it matters most for perceived performance. I converted it to WebP and reduced it to roughly 175 KB, which preserved visual quality while significantly improving initial load performance.

### Routing

The MVP has two application views, Forecast and Favorites. I kept view switching in local application state rather than adding a routing dependency because URL-based navigation was not required by the challenge.

### Testing

I added Vitest tests for:

- Temperature conversion and weather formatting
- Wind direction and UV boundary behavior
- WMO code mapping and unknown-code fallback
- Geocoding query creation and response mapping
- Forecast and favorite-summary query parameters
- Forecast response mapping
- API and non-JSON HTTP error handling
- Keyboard-based city selection
- Forecast error and retry presentation
- Favorite persistence and removal
- Temperature-unit controls
- Daily pagination boundaries

The current suite has 46 tests across 8 test files, all passing. Service tests mock `fetch`, making them deterministic and independent of network availability. Component tests use React Testing Library and jsdom to cover real user interactions such as keyboard navigation and retry actions instead of testing only implementation details.

Automated coverage focuses on domain logic, the API service boundary, and the most important component interactions. Full end-to-end browser coverage was not added in this MVP.

## AI Usage

### Which AI tools did you use?

I used a combination of AI tools for different purposes during development:

- **Claude**, for early planning, architecture discussions, and working through project setup and technical trade-offs before writing code.
- **Gemini**, for feedback on interpreting the visual mockup where the design left room for judgment.
- **OpenAI Codex**, as the main implementation assistant for writing code, iterating on components, generating tests, and drafting documentation.

### How did these tools help you?

Claude helped me think through the initial project structure, plan the sprint into stages, and reason about API constraints such as Open-Meteo's forecast horizon before committing to an implementation approach.

Gemini gave me a second perspective on visual and UX decisions where the mockup was guidance rather than a strict specification, particularly around the hero background composition.

Codex helped me:

- Break the challenge into incremental implementation stages
- Compare the code against the acceptance criteria
- Iterate on responsive layout and component boundaries
- Identify edge cases in local storage, request cancellation, pagination, and API errors
- Generate candidate tests and review their boundary coverage
- Keep a development log of technical decisions and validation results
- Draft project documentation based on the completed implementation

I reviewed the generated suggestions against the existing code and validated changes with ESLint, TypeScript, production builds, automated tests, and targeted runtime checks.

### Was there any suggestion generated by AI that you decided not to use?

Yes. Some possible solutions would have added a global state library or a routing library. I did not use them because the MVP has limited shared state and only two internal views. Focused React hooks and local view state kept the implementation smaller and easier to explain.

I also avoided fabricating 30 future forecast days or repeating existing days when the API could not provide that range. The application exposes the limitation through an honest chronological timeline and unavailable states instead.

## Challenges

### What was the most difficult part of the challenge?

The most difficult part was reconciling the required 30-day forecast with the data available from the selected weather API.

Open-Meteo's standard forecast response does not provide 30 future days in one request. The application therefore requests 14 past days and 16 forecast days and presents them as a chronological 30-day timeline.

Past days are visually distinguished with muted styling and a `Past` label, while today and forecast days retain the standard styling, making the data boundary visible in the UI itself.

Pagination starts on the page containing today. I preserved chronological ordering rather than rearranging the dates, because moving today to the first row would create a confusing jump from future dates back to past dates.

When data is missing, the UI displays an unavailable state instead of duplicating values to fill the page.

Other important challenges included:

- Matching the supplied desktop design while creating a usable mobile layout
- Preventing stale requests from replacing newer city selections
- Keeping favorite weather requests independent from one another
- Handling invalid or inaccessible browser storage safely
- Keeping temperatures consistent across every view when switching units
- Keeping the AI-generated hero image visually on-brief while controlling its file size so it did not slow down the initial page load

## Trade-offs

The 30-day timeline combines historical and forecast data because of the API horizon. It satisfies the browsing and pagination interaction, but it is not a full 30-day future prediction.

I used state-based view switching rather than URL routing. This is sufficient for the MVP but does not provide deep links or browser history between Forecast and Favorites.

World Map, Alerts, Settings, account actions, and Premium actions remain visual placeholders. They were present in the design but were outside the required user stories, so I prioritized the core search, forecast, favorites, and pagination flows.

I focused automated tests on domain logic, the API service boundary, and the most important component interactions. Full end-to-end browser coverage would still be valuable, but it was postponed in favor of completing and validating the core MVP.

## Improvements

With another sprint, I would:

- Expand component coverage for loading states and favorite weather summaries
- Add end-to-end tests for the main user journeys
- Introduce URL routing and shareable city URLs
- Add a more complete loading skeleton and an application-level error boundary
- Improve focus management and announce asynchronous results to screen readers
- Validate reduced-motion behavior as new animations and transitions are introduced
- Split the main stylesheet further by feature
- Add responsive image variants with `srcset`
- Add caching with expiration for recently requested forecasts
- Implement the World Map, Alerts, and Settings experiences
- Use a weather provider capable of delivering a genuine 30-day future forecast
- Run a full accessibility audit rather than relying only on the semantic groundwork completed so far

## Self Assessment

### What part are you most proud of?

I am most proud of the separation between the external API contract and the application domain. The UI is not coupled to Open-Meteo field names, and the same mapped forecast data can be used consistently across desktop, mobile, hourly, daily, and favorite views.

I am also pleased that the responsive version was treated as a real mobile experience rather than a compressed desktop layout.

### What part would you refactor?

I would split the main CSS file into smaller feature-level style modules. The existing CSS is organized into sections, but it has grown large as desktop, mobile, state, and accessibility behavior were added.

I would also consider consolidating asynchronous state handling into a small shared request utility if more API-backed features were introduced.

### If you had to start again, what would you do differently?

I would investigate the forecast provider's maximum future horizon before finalizing the daily forecast interaction. That would allow the product and API decision to be made earlier.

I would also add the test runner near the beginning of development and write formatter and service tests alongside each feature rather than adding the first automated suite near the end.

## A Note on Accessibility

Semantic roles (`table`, `row`, `columnheader`, and `cell`) were added to the Favorites view. Icon-only buttons have accessible names, while decorative Lucide icons are hidden from assistive technologies with `aria-hidden`.

I applied `aria-hidden` inside the shared `Icon` component instead of repeating it at every usage. This makes the correct decorative-icon behavior the default and reduces the risk of forgetting it when new interface icons are added. Weather icons are handled differently because they communicate meaningful condition information: `WeatherIcon` uses `role="img"` and an accessible label derived from the centralized WMO mapping.

Interactive elements such as favorite toggles and unit switches use `aria-pressed`, and pagination uses `aria-current` for the active page.

This is groundwork, not a full accessibility audit. I have not run an end-to-end screen-reader pass or automated accessibility testing such as axe, so I would describe the current state as accessibility-aware rather than WCAG-verified. It would be one of my first priorities with more time.

## Questions

- What would a typical day look like for an intern on the team?
- How do interns usually receive feedback and mentorship?
