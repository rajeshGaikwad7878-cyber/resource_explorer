npm install bootstrap-icons
npm install --save-dev typescript @types/react @types/react-dom @types/react-router-dom
npm install react-router-dom bootstrap bootstrap-icons

1. Architecture

React + TypeScript
We used React with TypeScript to ensure strong type safety, better developer experience, and fewer runtime errors.

React Router
Client-side routing (react-router-dom) powers navigation between character lists and detail pages.

Component-based design
UI is broken into reusable components (CharacterCard, SearchBar, Filters, Pagination, etc.), improving maintainability and scalability.

Hooks & State Management

Local state + useSearchParams for query synchronization (filters, search, pagination).

Custom hooks (e.g., useDebouncedValue, useTheme) to isolate reusable logic.

Styling

Bootstrap + Bootstrap Icons for responsive, accessible UI.

Light/Dark theme toggle with persistent state.

API Integration
Data comes from the Rick & Morty API using fetch. Query params for pagination, filters, and search are passed via URL for shareability.

2. Trade-offs

Bootstrap vs Tailwind

Why Bootstrap: Faster prototyping, consistent design system, fewer dependencies to learn.

Trade-off: Less fine-grained control over design compared to utility-first CSS like Tailwind.

Local State vs Global Store (Redux, Zustand, etc.)

Why local state: Simpler and sufficient for this app, avoids unnecessary complexity.

Trade-off: Harder to scale if the app grows significantly or requires cross-page shared state.

Debounced Search

Why debounce: Reduces API calls while typing.

Trade-off: Slight delay in updating results, but better performance overall.

Full Page Refresh Button

Why included: Quick way to reset app state & reload data.

Trade-off: Less elegant than resetting via state only, but very clear to the user.

Theme Toggle with Bootstrap Switch

Why: Easy user control, improves UX.

Trade-off: Limited customization vs a fully custom theme system.

3. Future Improvements

Persist theme & favorites in localStorage.

Add unit/integration tests with Jest + React Testing Library.

Replace fetch with React Query for caching, retries, and background updates.

Improve pagination (e.g., infinite scroll).

Add animations for smoother transitions.