# Eshop Project Documentation

## Project Overview

Eshop is an Angular e-commerce frontend application. It contains pages for the home screen, products listing, product detail, checkout, about, users, and comments. The project is organized around Angular feature folders, standalone components, lazy-loaded route components, static mock data, and a small amount of API-backed data from JSONPlaceholder.

The application also includes Angular Server-Side Rendering (SSR) support through an Express server entrypoint.

## Tech Stack

| Area | Technology | Purpose |
| --- | --- | --- |
| Framework | Angular 21 | Main frontend framework |
| Language | TypeScript 5.9 | Strictly typed application code |
| UI Styling | Tailwind CSS 4 and component CSS files | Utility styling plus page/component-specific styles |
| Routing | Angular Router | Page navigation and lazy route loading |
| State | Angular signals and computed values | Local reactive state and derived UI state |
| HTTP | Angular HttpClient with fetch backend | API calls to JSONPlaceholder |
| SSR | Angular SSR and Express 5 | Server rendering and static asset serving |
| Testing | Angular unit-test builder with Vitest dependency | Unit test setup for Angular specs |
| Build Tooling | Angular CLI / `@angular/build` | Development server, production builds, and tests |
| Package Manager | Yarn 1.22.22 configured, npm lock also present | Dependency management |

## Important Scripts

Run these from the project root.

```bash
yarn start
```

Starts the Angular development server.

```bash
yarn build
```

Builds the application for production.

```bash
yarn test
```

Runs unit tests.

```bash
yarn serve:ssr:Eshop
```

Serves the built SSR application from `dist/Eshop/server/server.mjs`.

## High-Level Architecture

The app follows a feature-first Angular architecture:

```text
src/
  app/
    app.ts
    app.html
    app.config.ts
    app.routes.ts
    core/
      store/
    features/
      about/
      checkout/
      comments/
      home/
      product-detail/
      products/
      user/
    layout/
      header/
      footer/
    shared/
  main.ts
  main.server.ts
  server.ts
  styles.css
```

### Application Shell

The root component is `App` in `src/app/app.ts`.

It renders:

```html
<app-header></app-header>
<router-outlet />
<app-footer></app-footer>
```

This means every route shares the same header and footer, while the routed page content changes inside `router-outlet`.

### Routing

Routes are defined in `src/app/app.routes.ts`.

Each top-level page is lazy loaded with `loadComponent`, for example:

```ts
{
  path: 'products',
  loadComponent: () => import('./features/products/products').then((m) => m.Products),
}
```

Current route map:

| URL | Feature |
| --- | --- |
| `/` | Home page |
| `/about` | About page |
| `/products` | Product listing page |
| `/products/:id` | Product detail page |
| `/checkout` | Checkout page |
| `/users` | Users page |
| `/comments` | Comments page |
| `**` | Redirects to home |

### Feature Modules

Each feature folder owns its page component, child components, templates, styles, and sometimes local mock data or models.

Examples:

```text
features/home/
  home.ts
  home.html
  home.css
  data.ts
  models.ts
  components/

features/products/
  products.ts
  products.html
  products.css
  data.ts
  models.ts
  components/

features/product-detail/
  product-detail.ts
  product-detail.html
  product-detail.css
  data.ts
  models.ts
  components/
```

This keeps UI code close to the business area it belongs to.

### Layout Layer

The shared page frame lives in:

```text
src/app/layout/header/
src/app/layout/footer/
```

These components are imported by the root `App` component and appear on all pages.

### Core Layer

The `core` folder currently contains shared application-level state:

```text
src/app/core/store/comments-store.ts
```

`CommentsStore` is provided globally with `providedIn: 'root'`. It uses Angular signals for state:

- `comments`
- `loading`
- `error`
- `count`
- `hasData`

It fetches comments from:

```text
https://jsonplaceholder.typicode.com/comments
```

This store is shared by the comments page and the users page.

### Data Layer

The project uses two data styles:

1. Static local data files for e-commerce pages.
2. HTTP services/stores for JSONPlaceholder demo data.

Static data examples:

```text
features/home/data.ts
features/products/data.ts
features/product-detail/data.ts
features/about/data.ts
```

API-backed examples:

```text
features/user/services/user.ts
core/store/comments-store.ts
```

`UserService` uses `HttpClient` and caches the users request with `shareReplay(1)`.

### State Management

The project mostly uses Angular's built-in reactive primitives:

- `signal()` for writable local state.
- `computed()` for derived state.
- `input()` and `output()` in child components.
- `ChangeDetectionStrategy.OnPush` for more predictable rendering.

Examples of state usage:

- Product detail active variant and memory selection.
- Checkout payment and billing state.
- Product carousel indexes.
- Comments search, pagination, and filtering.
- User list loading/error state.

There is no external global state library such as NgRx, Akita, or Elf.

### Server-Side Rendering

SSR is configured in `angular.json`:

```json
"server": "src/main.server.ts",
"outputMode": "server",
"ssr": {
  "entry": "src/server.ts"
}
```

The Express server in `src/server.ts`:

- Serves static browser assets from the build output.
- Sends all other requests to Angular's SSR engine.
- Defaults to port `4000` when running the built server directly.

Client hydration is enabled in `src/app/app.config.ts`:

```ts
provideClientHydration(withEventReplay())
```

This improves SSR interactivity by preserving user events during hydration.

## Architecture Flow

Typical page rendering flow:

```text
Browser request
  -> Angular Router matches route
  -> Lazy route component loads
  -> Page component imports feature child components
  -> Page/component reads static data, signals, or services
  -> Template renders UI
```

For SSR:

```text
HTTP request
  -> Express server
  -> Angular SSR engine
  -> Rendered HTML response
  -> Browser downloads client bundle
  -> Angular hydrates the page
```

For API-backed pages:

```text
Component initializes
  -> Service/store calls HttpClient
  -> Remote JSONPlaceholder response arrives
  -> Signal or Observable updates local state
  -> Template re-renders through OnPush change detection
```

## Pros of This Architecture

### 1. Clear Feature Ownership

Feature folders make it easy to find page-specific code. For example, product listing code is inside `features/products`, while product detail code is inside `features/product-detail`.

### 2. Lazy-Loaded Pages

Using `loadComponent` keeps route-level code split by page. This can reduce the initial JavaScript loaded by the browser as the application grows.

### 3. Modern Angular Style

The project uses modern Angular patterns:

- Standalone components.
- `inject()` instead of constructor injection in services/components.
- Signals and computed values.
- Route-level lazy loading.
- Client hydration for SSR.

### 4. Predictable Rendering

Most components use `ChangeDetectionStrategy.OnPush`, which helps reduce unnecessary change detection and makes component state changes more intentional.

### 5. Simple State Model

For the current project size, Angular signals and a small shared store are easier to understand than a full global state management library.

### 6. SSR Ready

The project can render on the server through Angular SSR and Express. This is useful for initial page load performance and SEO-sensitive pages.

### 7. Local Mock Data Is Easy to Work With

Static `data.ts` files make UI development fast because product, home, and about pages do not require a backend to run.

## Cons and Limitations

### 1. Static Product Data Limits Real E-Commerce Behavior

Most product and catalog data comes from local files. This is useful for UI prototyping, but a production e-commerce app would need backend APIs for products, inventory, pricing, carts, orders, authentication, and payments.

### 2. Feature Boundaries Could Become Repetitive

Several features define their own breadcrumb, product card, and UI components. This is fine early on, but repeated patterns may become harder to maintain if designs or behavior need to change globally.

### 3. No Dedicated Shared UI Library Yet

The `shared` folder exists but is currently empty. Reusable UI elements such as buttons, cards, loaders, empty states, form controls, and breadcrumbs could eventually move there.

### 4. API Layer Is Still Demo-Oriented

`UserService` and `CommentsStore` call JSONPlaceholder directly. There is no environment-based API configuration, request interceptor, auth handling, retry strategy, or centralized error mapping.

### 5. Mixed Package Lock Files

The project has both `yarn.lock` and `package-lock.json`, while `package.json` declares Yarn as the package manager. Keeping both can cause dependency version confusion across machines.

### 6. Testing Setup Needs a Pass

Spec files exist, and `vitest` is listed as a dependency, but `tsconfig.json` references `tsconfig.spec.json`, which is not present in the current file tree. The test setup should be verified and completed.

### 7. SSR Requires Care With Browser-Only Code

Because the app supports SSR, future code should avoid direct unguarded access to browser-only globals such as `window`, `document`, or `localStorage` inside constructors or top-level code.

### 8. No Real Domain Services for Commerce Yet

Checkout state is currently local to the checkout component. There is no cart service, checkout service, order service, or payment integration layer.

## Recommended Improvements

### Short-Term

- Add or restore `tsconfig.spec.json` so unit tests are properly configured.
- Use one package manager lock file. Since `packageManager` is Yarn, keep `yarn.lock` and remove `package-lock.json` after confirming with the team.
- Move repeated small UI pieces into `src/app/shared`.
- Add environment files for API base URLs.
- Add loading, empty, and error states consistently across API-backed pages.

### Medium-Term

- Create a real cart service using signals.
- Introduce product, category, and order services.
- Replace static product data with backend API calls.
- Add route-level metadata for titles and SEO.
- Add guards if checkout or user-specific pages require authentication.
- Add stronger tests for stores, services, checkout totals, filters, and pagination.

### Long-Term

- Add authentication and user session management.
- Integrate a real payment provider.
- Add server API endpoints under the Express SSR server or move API responsibilities to a separate backend.
- Add observability for frontend errors and API failures.
- Add e2e tests for core shopping flows.

## Development Guidelines

### When Adding a New Page

1. Create a new folder under `src/app/features`.
2. Add the page component, HTML, CSS, models, data, and child components there.
3. Add a lazy route in `src/app/app.routes.ts`.
4. Keep page-specific components inside the feature folder.
5. Move reusable components to `src/app/shared` only when they are used by multiple features.

### When Adding Shared State

Use a service or store under `src/app/core` when state needs to be shared across unrelated features.

Use local `signal()` state inside a component when the state belongs only to that component or page.

### When Adding API Calls

Prefer a service per domain area:

```text
features/products/services/product.service.ts
features/checkout/services/checkout.service.ts
features/user/services/user.ts
```

For cross-feature application state, use a root-provided store under `core/store`.

### When Working With SSR

Keep browser-specific APIs guarded. Prefer Angular abstractions where possible, and only access browser globals after confirming the code runs in the browser.

## Summary

This project has a clean modern Angular foundation. The architecture is well suited for a medium-sized e-commerce frontend because it uses feature folders, standalone components, lazy-loaded pages, Angular signals, OnPush change detection, and SSR support.

The main areas to improve are production-grade data access, shared UI reuse, test configuration, cart/checkout domain services, and package manager consistency.
