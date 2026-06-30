# Vibe Coder Assignment

This repository contains my solution to the Vibe Coder Assignment.

## What I Changed
- **Bug Fixes:** Fixed the `clickCount` recursive bug in `SearchPage.tsx` and modified `dataHelpers.ts` to use case-insensitive username searching. Fixed `ProfileList` column constraints (removed hardcoded widths) making it fully responsive. Fixed TS types (e.g., adding `url` to the summary object).
- **UI/UX Redesign:** Completely overhauled the UI to feature a premium, modern design using Tailwind CSS. Added glassmorphic headers, subtle gradients, `lucide-react` icons, and sleek `framer-motion` animations. Transformed the `PlatformFilter` into a clean segmented control and `ProfileList` into a responsive CSS Grid.
- **State Management (Zustand):** Replaced the intended React Context / Local State with `zustand`. This acts as a centralized store for managing the active `searchQuery`, `platform`, and the list of saved profiles. Retaining search state ensures that when users navigate from a profile page back to the dashboard, their filter configuration isn't lost.
- **Select Profile & Add to List Feature:** Successfully implemented the "Saved Profiles" feature. Profiles can be added or removed from the dashboard and the profile detail page. A sleek sliding drawer (accessible from the navbar) allows viewing and managing the list. The list is persistent across page reloads via `zustand`'s `persist` middleware (saving to `localStorage`).
- **Code Quality & Performance Optimization:** 
  - Restructured the codebase by adding `src/store` for state and standardizing utilities in `src/utils/styles.ts` (using `clsx` and `tailwind-merge`).
  - Added `React.memo` to `ProfileCard` to avoid unnecessary re-renders when the saved list is updated.
  - Used `useMemo` in `SearchPage` for derived filtering logic.

## Libraries Added
- **zustand**: Selected for state management due to its lightweight nature and built-in persistence middleware.
- **lucide-react**: Used for premium, consistent iconography throughout the application.
- **framer-motion**: Added to bring the UI to life with micro-interactions (hover scales, drawer slide-ins, and list entrance animations).
- **clsx & tailwind-merge**: Essential utilities for building a standard `cn` function, which allows for clean, dynamic Tailwind class composition without conflicts.

## Assumptions Made
- The `searchQuery` and `platform` filters should persist when viewing a profile so the user can easily go back to where they left off without needing to type their query again.
- A sliding drawer is a more modern, frictionless way to view saved items without leaving the core search experience, rather than navigating to a completely separate route.
- The assignment's React Context requirement meant introducing robust state management. Since no Context was initially found, I opted directly for `zustand` as requested ("Replace React Context with Zustand").

## Trade-offs
- Used `framer-motion` which increases the bundle size slightly. However, given the requirement for a modern, polished UI/UX, the visual improvement far outweighs the small bundle cost.
- Opted to persist the entire `SavedProfile` objects in localStorage. If the data size were massive, it would be better to only persist `username` and `platform`, re-fetching the profiles on load. Since the dataset is small and read locally, persisting the whole object allows for immediate rendering.

## Any Remaining Improvements
- Add E2E tests using Cypress or Playwright to simulate the full user journey of searching and saving a profile.
- Server-side integration: In a real app, the search should hit a backend API with proper pagination and debounce mechanisms, instead of loading JSON and filtering purely on the client side.
- Add an interactive dark mode.
