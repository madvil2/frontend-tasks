# Frontend tasks

Two small take-home tasks in one Vite + React app.

| Route      | Task                                                                                |
| ---------- | ----------------------------------------------------------------------------------- |
| `/tasks`   | Task Manager: create, edit and delete tasks, persisted in `localStorage`            |
| `/profile` | Responsive customer area: navigation and personal-data page across five breakpoints |

## Run

```sh
pnpm install
pnpm dev        # http://localhost:5173
pnpm check      # typecheck + lint + tests
pnpm build
```

Node 24 (see `.nvmrc`) and pnpm (see `packageManager` in `package.json`).

## Stack

React 19, TypeScript, Vite, react-router, SCSS Modules, Biome, Vitest + Testing Library. No UI library.

## Decisions

- **Structure:** `pages` → `features` / `layouts` / `shared`, imported through the `@/` alias. Each component sits in its own folder next to its stylesheet; behaviour is tested at the page level, small units directly.
- **State:** one `useReducer` hook, no context (there is a single consumer). The reducer and the storage layer are pure and unit-tested. On load every stored item is validated; invalid items are dropped instead of wiping the store. Tasks are listed newest first.
- **Dialogs:** native `<dialog>` (modal focus handling and Esc come from the browser). The create/edit form is uncontrolled, read through `FormData`, and only mounted while the dialog is open.
- **Dates:** stored as `YYYY-MM-DD` and parsed as local dates. `new Date('YYYY-MM-DD')` parses as UTC and shifts a day in negative offsets.
- **Breakpoints:** defined in `src/app/styles/breakpoints.scss` and used mobile-first via `@include bp.up(...)`. Below 992px the menu is React state (so the page behind the open overlay can be made `inert`); from 992px up it is always visible. Checked in Chrome and Safari at 320, 400, 600, 800, 1100 and 1400px against the mockups.

## Assumptions from the mockups

- Desktop (992–1199px) has no burger: the "open" mockup shows none and there is no "closed" mockup for that range. The menu is a permanent 3-column grid. From 1200px it is a sidebar.
- "Persönliche Daten" is marked as the current item on `/profile` because that is the page shown; the mockups highlight "Kredite".
- Long labels wrap instead of being truncated with an ellipsis.

## Known limitations

- No sync between tabs (no `storage` event listener).
- Menu items other than "Persönliche Daten" are placeholders; they only close the menu, and from 992px up there is nothing to close.
- No dark mode.
