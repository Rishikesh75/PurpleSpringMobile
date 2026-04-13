# Purple Spring mobile app (Expo) — UI parity with web

Use this as a Cursor/agent brief or developer handoff. **This repository** (`PurpleSpringMobile`) is the Expo app. The **web design source of truth** is the `frontend/` tree in the Purple Spring web repo (for example `c:\Users\kreddy\Documents\PurpleSprings\frontend` if you keep web and mobile as sibling folders). Adjust the path to match your machine.

## Goal

Create or evolve an Expo (React Native) app for Purple Spring (e-commerce: saffron / organic products) that looks and feels like the existing web app (`frontend/`: React 19, Tailwind, shadcn-style tokens in CSS variables).

## Stack (align with this repo)

- **Expo** (this project uses SDK **~54**; keep stable SDK upgrades documented in README).
- **TypeScript**.
- **Expo Router** for file-based navigation (tabs + stacks mirroring web routes: Home, Products, product `[id]`, Cart, Checkout, About, Contact).
- **Styling**: [NativeWind](https://www.nativewind.dev/) v4 (or equivalent) so semantic colors and spacing stay close to Tailwind; map web CSS variables from `frontend/src/index.css` (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`, chart tokens, dark `.dark` block) into a single `theme.ts` / Tailwind config used app-wide.
- **Components**: Build small primitives (`Button`, `Card`, `Input`, `Badge`, `Separator`) that mirror roles of shadcn components on web (variants: default, outline, ghost, destructive), not pixel-perfect DOM copies.

## Consistency rules

1. **One token source**: Extract HSL values from `:root` and `.dark` into shared constants; use the same names (`background`, `foreground`, `primary`, …) in the NativeWind theme.
2. **Same IA & flows as web**: catalog with search/filter/sort, product detail with gallery + quantity + add to cart, cart with line edits + summary, multi-step checkout + confirmation, About, Contact.
3. **Reuse API/data shapes** from the web app (or shared types copied into `packages/types` if you monorepo later) so lists and cart stay in sync with `frontend` behavior.
4. **Mobile-native UX** (safe areas, `ScrollView`/`FlatList`, optional bottom sheets) without a second visual language—same spacing rhythm, card elevation via border/shadow consistent with “premium minimal” web.

## Deliverables

- Expo app in this repo (or `apps/mobile` if you split later) with **README**: how to run, env vars, and link to the web token file for designers.
- Screens wired to mock data first if the backend is still mock-only.
- **Dark mode** using the same semantic palette as web `.dark`.

## Constraints

Scope to parity with existing web first; no extra features unless required for store submission. Reference `frontend/src` (pages, components, `index.css`) as the design source of truth.

## First steps for an agent

1. Read `frontend/src/index.css`, `frontend/tailwind.config.js`, and main layout/nav/cart patterns in the web repo.
2. Scaffold or align **Expo Router** + **NativeWind** theme before building or refactoring screens.
3. Map routes to existing web URLs/components for traceability.

## Optional (monorepo later)

Prefer Expo + pnpm workspaces; share `Product` / `CartItem` types with `frontend` via a `packages/shared` package.
