# Sprint Review — Weather Forecast MVP

## Project Summary

I built a responsive weather dashboard with React and TypeScript. Users can search for cities around the world and view current, hourly, and daily weather data from Open-Meteo.

The application also supports:

- A paginated 30-day weather timeline, labeled as such in the interface
- Favorite city management
- Favorite persistence between sessions
- Current weather summaries for saved cities
- Persistent Celsius and Fahrenheit selection
- Loading, error, empty, and unavailable states
- Retry behavior for failed forecast requests
- Desktop and mobile layouts

Weather and geocoding data come from Open-Meteo.

## Project Architecture

I organized the project into folders with clear responsibilities:

- `api` contains the Open-Meteo client and external API response types.
- `services` builds API queries and maps external responses to application models.
- `hooks` manages asynchronous behavior, cancellation, persistence, and feature state.
- `components` contains reusable interface elements.
- `pages` composes components into the Forecast and Favorites views.
- `types`, `constants`, and `utils` contain shared domain models, mappings, and formatters.

I chose this structure to keep API details out of the UI. Components use the application's own data models instead of raw Open-Meteo responses. Changes to the external response can be handled within the API and service boundary without rewriting presentation components.

Each hook also has one clear job. Search, forecast loading, favorites, favorite summaries, and temperature preferences can be changed separately without adding a global state library.

## Technical Decisions

### State management

I used React state and small custom hooks instead of adding a state-management library. The application has a small amount of state, and most state belongs to one feature.

Favorites and the selected temperature unit are stored in `localStorage`. Only stable user choices are saved. Weather data is fetched again so users do not see an old forecast.

The hooks check stored values before using them. If browser storage is unavailable, the application still works for the current session.

### Data fetching

I selected Open-Meteo because it offers worldwide geocoding and weather data without an API key.

Requests are created with `URLSearchParams`. `AbortController` cancels old search and forecast requests when they are no longer needed. City search also waits briefly before sending a request, so it does not call the API after every keystroke.

The location heading uses a client-side clock formatted in the selected city's timezone instead of treating the API observation timestamp as a live clock. Weather data refreshes shortly after each 15-minute boundary to match Open-Meteo's current-condition interval without making unnecessary requests.

The Favorites page uses a smaller request. It fetches only the fields needed by each favorite card instead of downloading a full forecast for every saved city.

Favorite requests use `Promise.allSettled`. If one city request fails, that city is shown as unavailable while the other cities can still load.

### Domain mapping

Raw Open-Meteo response types are kept separate from the application's `Location`, `WeatherForecast`, and `FavoriteWeather` models.

The service layer converts API field names and arrays into objects that are easier for the UI to use. UI components do not need to understand the Open-Meteo response format.

### Component architecture

Repeated UI patterns use small components such as `Panel`, `MetricCard`, `WeatherIcon`, and `Icon`. The larger forecast sections are split into current, hourly, and daily components.

Daily forecast rows are interactive. Selecting a past or future date updates the hourly panel with that calendar day's API data. When today is selected, the hourly panel starts from the current hour so the most relevant upcoming conditions appear first.

WMO weather codes are mapped centrally so the hero, forecast rows, and Favorites page always use the same label and icon for a condition.

### Styling and responsive behavior

I used custom CSS with shared theme variables and responsive rules. Custom CSS gave me direct control over the supplied design and its mobile layout without adding a utility-CSS dependency that the application did not need.

The mobile version is not only a smaller desktop view. Navigation moves to the bottom, content is reorganized, hourly items can scroll horizontally, and favorites use a card layout.

### Hero background image

The hero background uses a mountain-and-lake image made with an AI image tool. The first reference images did not match the design well enough. I needed a mountain on the left, visible water, and enough empty space for readable text.

The first version of the image was much larger than necessary for the hero section. I converted it to WebP and reduced it to about 175 KB to lower the initial download size while keeping acceptable visual quality.

### Routing

The MVP has two views: Forecast and Favorites. I switch between them with local React state. I did not add a routing library because the challenge does not require URLs for each view.

### Testing

I added Vitest tests for:

- Temperature conversion and weather formatting
- Wind direction and UV boundary behavior
- WMO code mapping and unknown-code fallback
- Geocoding query creation and response mapping
- Forecast and favorite-summary query parameters
- Forecast response mapping
- API and non-JSON HTTP error handling
- Keyboard-based city selection and active-suggestion semantics
- Forecast error and retry presentation
- Favorite persistence and removal
- Temperature-unit controls
- Daily date selection and pagination boundaries

The current suite has 47 tests across 8 test files, and all tests pass. Service tests mock `fetch`, so they give the same result without using the network. Component tests use React Testing Library and jsdom. They test user actions such as keyboard navigation, daily date selection, and retry buttons instead of only checking internal code.

The tests focus on weather logic, API mapping, and the most important component interactions. I did not add full end-to-end browser tests for this MVP.

## AI Usage

### Which AI tools did you use?

I used a combination of AI tools for different purposes during development:

- **Claude**, for early planning, architecture discussions, project setup, and technical decisions before writing code.
- **Gemini**, for a second opinion about parts of the visual design that were open to interpretation.
- **OpenAI Codex**, as the main implementation assistant for code, component improvements, tests, and documentation.

### How did these tools help you?

Claude helped me plan the project structure and split the work into stages. It also helped me understand limits such as Open-Meteo's forecast range before I chose an implementation.

Gemini gave me another opinion about visual and UX decisions where the mockup was only a guide, especially for the hero background.

Codex helped me:

- Break the challenge into incremental implementation stages
- Compare the code against the acceptance criteria
- Iterate on responsive layout and component boundaries
- Identify edge cases in local storage, request cancellation, pagination, and API errors
- Generate candidate tests and review their boundary coverage
- Keep a development log of technical decisions and validation results
- Draft project documentation based on the completed implementation

I reviewed the suggestions before using them. I checked the final changes with ESLint, TypeScript, production builds, automated tests, and manual checks.

### Was there any suggestion generated by AI that you decided not to use?

Yes. Some suggestions included a global state library or a routing library. I did not use them because the MVP has little shared state and only two views. Small React hooks and local state kept the project easier to understand.

I also chose not to create fake future data or repeat days when the API could not provide 30 future days. The application shows a clear timeline and unavailable states instead.

## Challenges

### What was the most difficult part of the challenge?

The Sprint resources explicitly suggest combining `past_days` with `forecast_days` to cover the 30-day requirement, and the example request uses 14 past days with 16 forecast days. I followed that guidance rather than treating the combination as a workaround I discovered.

While implementing the timeline, I noticed that presenting all 30 entries under a forecast heading could imply that every day was a future prediction. I therefore added a clear visual distinction between the two periods: past days use muted styling and a `Past` label, while today and forecast days keep the standard styling.

I also researched OpenWeather's Pro offering and the Open-Meteo Seasonal API as possible alternatives. That comparison confirmed that the Sprint's suggested approach was the better fit for this API-key-free MVP, provided that the interface clearly communicates which entries are past observations and which are forecast data.

Pagination starts on the page that contains today. I kept the dates in time order. Moving today to the first row would create a confusing jump between future and past dates.

Other important challenges included:

- Matching the supplied desktop design while creating a usable mobile layout
- Preventing stale requests from replacing newer city selections
- Keeping favorite weather requests independent from one another
- Handling invalid or inaccessible browser storage safely
- Keeping temperatures consistent across every view when switching units
- Keeping the AI-generated hero image close to the design while reducing its file size

## Trade-offs

The 30-day timeline combines past and forecast data because of the API limit. Users can browse it with pagination, but it is not a full 30-day future forecast.

I used React state instead of URL routing. This is enough for the MVP, but it does not support direct links or browser history between Forecast and Favorites.

World Map, Alerts, and Settings are visible but disabled. The profile and Premium area are visual-only. These items are outside the required user stories, so I focused on search, forecast, favorites, and pagination.

I focused the tests on weather logic, the API layer, and important component actions. End-to-end browser tests would still be useful, but I chose to finish and verify the core MVP first.

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

I am most proud of the separation between the external API response and the application's own data models. The presentation components do not depend directly on Open-Meteo field names, and the service layer provides models for the main forecast and favorite-summary views.

I am also happy that the mobile version is more than a smaller desktop layout.

### What part would you refactor?

I would split the main CSS file into smaller files for each feature. The current CSS has clear sections, but it became large as desktop and mobile styles were added.

If the application added more API features, I would also consider a small shared utility for request state.

### If you had to start again, what would you do differently?

I would check the weather provider's maximum forecast range before designing the daily forecast. This would help me make the product and API decision earlier.

I would also add the test runner near the beginning of development and write formatter and service tests alongside each feature rather than adding the first automated suite near the end.

## A Note on Accessibility

The Favorites view uses semantic roles such as `table`, `row`, `columnheader`, and `cell`. Icon-only buttons have accessible names. Decorative Lucide icons are hidden from assistive technologies with `aria-hidden`.

I added `aria-hidden` inside the shared `Icon` component instead of adding it each time. This makes decorative icons hidden by default. Weather icons are different because they provide useful information. `WeatherIcon` uses `role="img"` and an accessible weather label.

Interactive elements such as favorite toggles and unit switches use `aria-pressed`, and pagination uses `aria-current` for the active page.

The city search uses `aria-activedescendant` to connect the input to the active suggestion. This helps screen readers follow the result selected with the arrow keys.

These changes improve accessibility, but they are not a full accessibility audit. I have not completed a full screen-reader test or used an automated tool such as axe. I would make this a priority with more time.

## Questions

- What would a typical day look like for an intern on the team?
- How do interns usually receive feedback and mentorship?
