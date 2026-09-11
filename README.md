# Swift Ticket Smash

Swift Ticket Smash is a role-routed service-ticket dashboard for administrators and operational departments.

## Core features

- Custom sign-in flow and protected administrator or department routes.
- Ticket creation, assignment by category, status updates, deletion, and detail views.
- Department portals for electrical, civil, IT, maintenance, housekeeping, security, clinical, and other teams.
- Ticket comments and in-app notification records.
- Administrative ticket, report, and user-management screens.
- Supabase-backed persistence with a generated TypeScript database model.

## Technology stack

- React 18, TypeScript, and Vite 5
- React Router and TanStack React Query
- Supabase JavaScript client
- Tailwind CSS, shadcn/ui (Radix UI), Lucide icons, and Recharts

## Prerequisites

- Node.js 20 or newer
- npm (a `package-lock.json` is included)
- Access to the configured Supabase project and expected database schema

## Local setup

```bash
git clone https://github.com/varunisrani/swift-ticket-smash.git
cd swift-ticket-smash
npm ci
npm run dev
```

Other verified scripts are:

```bash
npm run build
npm run preview
npm run lint
```

## Configuration

The current generated Supabase client does not read environment variables; its project URL and publishable client key are embedded in `src/integrations/supabase/client.ts`. No environment variable names are defined by this repository.

## Project structure

```text
src/pages/                  Login, portals, tickets, reports, and user screens
src/components/             Layouts, forms, status controls, comments, and notifications
src/contexts/               Client authentication state
src/hooks/                  Ticket and notification data access
src/services/               User and authentication services
src/integrations/supabase/  Generated database client and types
supabase/migrations/        Database migration SQL
```

## Status and limitations

The application is tightly coupled to a preconfigured remote Supabase project. Its custom authentication and authorization behavior depends on database records and access policies in that project; a fresh clone does not provide an isolated local backend or seed users.