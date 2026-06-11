# Modular Form Creator - Notes and Run Guide

## 1. Context / Submission Notes

- Normally, a `.env` file should not be committed to the repository.
- In this case, it was included intentionally to remove ambiguity about how to run the app.
- The provided `.env` does not contain sensitive data (no passwords, tokens, or API keys).

## 2. What Was Done (Scope)

- Changes were made according to the task instructions, mainly in frontend code (`src`).
- No new libraries were added; only tools and components already available in the project were used.
- Styling was implemented with `styled-components`, consistent with the existing stack.

## 3. Run the Application

Requirements:

- Docker
- Docker Compose

Command (from the project root):

```bash
docker compose up --build
```

After startup:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001
- Swagger: http://localhost:5001/docs

## 4. What I Would Consider Next

If the task scope allowed broader changes, I would consider:

1. Forms and validation:

- `zod` (schema + typed validation)
- potentially `react-hook-form` / `formik` for more advanced form management

2. State and caching:

- centralizing `resources` state (for example Redux Toolkit or React Query)
- persisting selected UI data in `localStorage`
- reducing repeated API calls

3. Testing:

- adding unit tests for critical logic (validation and error mapping)
- adding integration tests for module flow and `draft/completed` status transitions

4. UX and reliability:

- standardizing the backend -> frontend error contract

## 5. Tech Note

- The project uses `styled-components`, and this approach was preserved.
- I frequently work with Tailwind CSS in daily work, so this task was also a good switch back to `styled-components`.
