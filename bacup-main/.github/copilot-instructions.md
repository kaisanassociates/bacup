## Influencia Event Registration – Copilot Instructions (Condensed)

### 1. High-Level Architecture
React + Vite frontend (`src/`), dual backend: local Express (`server.cjs` + `app/api/*.cjs`) and Vercel serverless functions (`api/*.ts`). Vite dev server (8080) proxies `/api/*` → Express (3000) per `vite.config.ts`.

### 2. Backend Parity Rule (CRITICAL)
Every route that exists in `api/*.ts` has a CommonJS twin in `app/api/*.cjs`. When changing business logic, validation, returned fields, or status codes: update BOTH versions. Search by filename (e.g. `register.ts` / `register.cjs`).

### 3. Route Set & Responsibilities
`/api/register` create attendee (generates `qrCode` = `INFLUENCIA2025-<ObjectId>`).  
`/api/registrations` list (requires `Authorization: Bearer admin123`).  
`/api/attendees/:attendeeId` update/delete/toggle attendance (`action` field).  
`/api/ticket/:ticketId` fetch single attendee for ticket display.  
Volunteer equivalents: `/api/volunteer`, `/api/volunteers`, `/api/volunteers/:volunteerId`.

### 4. Data Model Pattern
No centralized Mongoose models; schema re-declared per handler to minimize cold start side effects in serverless context. Extended attendee fields coexist with legacy form fields—handlers normalize with fallbacks (`fullName || name`, `contactNumber || phone`). Avoid introducing a shared model file unless refactoring both environments together.

### 5. MongoDB Connection Strategy
Use cached connection utilities: `src/lib/mongoose.ts` (Vercel), `app/api/lib/mongoose.cjs` (local), and newer `src/lib/db.ts`. All rely on `global.mongoose` cache and set `bufferCommands: false`; ALWAYS await connection readiness before queries. If adding new handlers, reuse existing connect helper—do not inline `mongoose.connect` repeatedly.

### 6. Authentication & Security Constraints
Admin access is a hardcoded bearer token `admin123` checked inside handlers. If adding admin-only routes, replicate same pattern for consistency (until token system replaced). Do not store secrets client-side—`api.ts` currently does not send auth header for admin routes (handled manually in pages/components).

### 7. Frontend API Consumption
`src/lib/api.ts` chooses base URL: production = `window.location.origin`, dev = `http://localhost:3000`. When adding endpoints, expose a method here mirroring existing error structure: `{ success, data?, error?, message?, duplicate? }`. Preserve fetch option patterns (JSON, error guard). Avoid mixing Axios unless migrating consistently.

### 8. Form & Validation Conventions
Multi-step attendee form (`RegistrationForm.tsx`): step gating via `react-hook-form` `trigger()`; sectors array + conditional “Others” field; longer text fields validated (e.g. `futurePlan` length). Volunteer form uses similar normalization. Add new fields by: updating form schema, mapping in register handler, extending schema, and returning in response payload.

### 9. Styling & UI Components
shadcn/ui components reside in `src/components/ui/`; DO NOT manually refactor generated primitives—regenerate via CLI if needed. Tailwind animations declared in `tailwind.config.ts`; reuse existing utility classes (`fade-in`, `fade-in-up`, `scale-in`) instead of adding near-duplicate variants.

### 10. CORS & Headers
All serverless handlers manually set permissive CORS headers. When adding new handlers, copy the header block + early `OPTIONS` return to maintain consistency and avoid preflight failures.

### 11. Error & Duplicate Handling
Registration enforces unique email (409 conflict). Future duplicate checks should follow pattern: find, return `409` with `{ success: false, error: '...', duplicate: true }` (mirrors volunteer registration duplicate flag usage).

### 12. Build & Run Workflow
Dev: `npm run dev` (runs Express + Vite concurrently). Single services: `npm run dev:server` or `npm run dev:vite`. Production build: `npm run build`. Vercel routing defined in `vercel.json` rewrites—add new API endpoints there if non-standard path or dynamic segment.

### 13. Common Pitfalls (Avoid)
1. Updating only one of `.ts` / `.cjs` handlers.  
2. Returning inconsistent response shape (breaks admin dashboard parsing).  
3. Skipping connection readiness causing `bufferCommands` errors.  
4. Introducing shared mutable schema state (multiple models with same name).  
5. Forgetting bearer token on admin listing/modification routes.

### 14. Safe Extension Steps (Example)
Add field `industryFocus`: (a) extend schemas in each related handler, (b) map form data in `api/register.ts` before save, (c) include in response payload `data`, (d) update frontend types in `ApiService` interface, (e) reflect in admin table rendering.

### 15. Reference Files
`server.cjs` (local route wiring), `vite.config.ts` (proxy), `vercel.json` (rewrite map), `src/lib/api.ts` (client wrapper), `src/lib/mongoose.ts` & `src/lib/db.ts` (connection patterns), `src/pages/Admin.tsx` (attendance toggle logic), `src/components/RegistrationForm.tsx` (multi-step pattern).

### 16. Manual Testing Flow
Register → confirm payload saved (MongoDB Atlas collection). Admin panel → toggle attendance (sets `checkInTime`). Ticket retrieval by ID uses same normalized fields; verify `qrCode` format. For connection issues follow diagnostics printed in `mongoose.ts`.

### 17. Refactor Guidance
If consolidating schemas, plan for dual-environment import compatibility (ESM vs CJS). Introduce a factory that returns a compiled model once; ensure not to break cold start performance or require top-level awaits.

---
Feedback welcome: Clarify any section you find incomplete or if you need guidance for a planned extension.
