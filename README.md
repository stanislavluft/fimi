[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fstanislavluft%2Ffimi)

# fimi

`fimi` is a minimalist frontend personal finance tracker built with React, TypeScript, and Vite. It helps users record income and expenses, monitor the current balance, and quickly review recent activity on the dashboard.

At the moment, the project is focused on local finance tracking: data is stored in the browser via `localStorage`, with no backend or authentication.

## Features

- Create, edit, and delete financial operations
- Separate income and expense flows
- Automatically calculate the total balance
- Show current-month income and expense summaries
- Display recent operations on the dashboard
- Persist operations across sessions with Zustand `persist`
- Support light, dark, and system themes

## Current Status

Implemented pages:

- `/dashboard` - overview with balance, monthly cards, and recent operations
- `/operations` - full list of operations with modal flows for create, edit, and delete

Current limitations:

- No backend or cloud sync
- No authentication
- No tests yet
- Analytics, savings, and settings are not implemented yet

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS v4
- Recharts
- Radix UI / Base UI primitives
- React Hook Form, Zod

## Getting Started

### Requirements

- Node.js LTS
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

After startup, the app will be available at the local Vite address shown in the terminal, usually `http://localhost:5173`.

## Data Storage

The app stores data in the browser:

- `finance-data` - all saved operations
- `fimi-theme` - selected theme

If browser storage is cleared, both operations and theme preference will be removed.

## Data Model

Each operation contains:

- `id`
- `amountMinor`
- `category`
- `type` (`income` or `expense`)
- `dateTime`
- `description`

Monetary values are stored in minor units to avoid floating-point precision issues.

## Possible Next Steps

- Add filters and search for operations
- Implement analytics with charts by category and period
- Add savings goals
- Introduce data export and import
- Connect a backend for cross-device sync
- Add saving of the sidebar position to local storage
