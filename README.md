# Frontend tasks

Two take-home tasks in one Vite + React app.

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

Node 24 (see `.nvmrc`), pnpm.

## Stack

React 19, TypeScript, Vite, react-router, SCSS Modules, Biome, Vitest + Testing Library. No UI library.

## Notes

- `pages` → `features` / `layouts` / `shared`, imported through the `@/` alias. Each component sits in its own folder next to its stylesheet.
- Task state is one `useReducer` hook; stored items are validated on load and invalid ones dropped.
- Native `<dialog>` for the form and the confirmation. The form is uncontrolled and read through `FormData`.
- Dates are stored as `YYYY-MM-DD` and parsed as local dates (`new Date('YYYY-MM-DD')` is UTC).
- Breakpoints live in `src/app/styles/breakpoints.scss`. Below 992px the menu is React state so the covered page can be `inert`; from 992px up it is always visible.
- From the mockups: 992–1199px has no burger (the menu is a permanent 3-column grid, from 1200px a sidebar); "Persönliche Daten" is the current item on `/profile`; long labels wrap instead of truncating. The other menu items are placeholders.
