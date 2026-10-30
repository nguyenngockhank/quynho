
## Code Architecture & Implementation Principles

Follow these principles when writing or modifying code.

### 1. Small & Stateless by Default
- Prefer small, focused, reusable functions and components over large implementations.
- Keep components stateless whenever possible.
- Separate UI rendering, business logic, data transformation, and side effects.
- Avoid unnecessary internal state. Use props to pass data and callbacks.
- Extract complex logic into independent functions or hooks when necessary.
- Each function or component should have one clear responsibility.
- Avoid over-engineering and unnecessary abstractions.

### 2. Utils Before Helpers
- Prefer creating reusable `utils` before introducing `helpers`.
- Use `utils` for generic, domain-independent operations that can be reused across the application.
- Use `helpers` only for context-specific logic that supports a particular feature or domain.
- Avoid creating duplicate utility functions. Search for existing implementations before adding new ones.
- Do not create unnecessary abstraction layers for one-time operations.

### 3. Pure Functions Before Side Effects
- Prefer pure functions whenever possible.
- A pure function should:
  - Produce the same output for the same input.
  - Have no side effects.
  - Not mutate external state or input arguments.
- Separate data transformation and business logic from side effects.
- Keep API calls, storage operations, navigation, logging, and external interactions isolated.
- Make side effects explicit and easy to identify.
- Prefer immutable data transformations.

### 4. Dumb Components Before Smart Components
- Build dumb (presentational) components before smart (container) components.
- Dumb components should focus exclusively on rendering UI based on props.
- Avoid embedding business logic, API calls, or data-fetching logic inside presentational components.
- Smart components should handle orchestration, state management, data fetching, and business logic.
- Pass data and event callbacks from smart components to dumb components.
- Prefer composition over deeply coupled component structures.

### 5. Separation of Concerns
- Keep responsibilities separated across:
  - UI components
  - Business logic
  - Utilities
  - Feature-specific helpers
  - Hooks
  - State management
  - API / data access
- Avoid mixing unrelated responsibilities in a single file.
- Extract logic when doing so improves readability, testability, or reusability.
- Keep abstractions proportional to actual complexity.

### 6. Implementation Workflow
Before implementing:
1. Inspect the existing project structure and coding conventions.
2. Search for reusable components, utilities, hooks, and existing implementations.
3. Identify responsibilities and separate pure logic from side effects.
4. Implement small, stateless, presentational building blocks first.
5. Compose them into higher-level components.
6. Add state management and side effects only where necessary.
7. Verify that the implementation is consistent with existing architecture.

### 7. Quality Guidelines
- Prioritize readability and maintainability over clever or overly compact code.
- Avoid unnecessary state, effects, dependencies, and abstractions.
- Avoid premature optimization.
- Write code that is easy to test independently.
- Reuse existing project conventions instead of introducing new patterns without justification.
- Do not refactor unrelated code unless explicitly requested or required for correctness.
- Avoid premature abstraction. Do not extract code into a new component, utility, helper, or hook solely for the sake of reuse.
- Only introduce abstractions when they provide clear benefits in readability, testability, maintainability, or actual reusability.
- Prefer straightforward implementations over unnecessary layers of indirection.
- Do not generalize a solution for hypothetical future requirements.
