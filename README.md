# OTA - Frontend

The frontend project for the online English test organization and management system, is built with React 19, Vite and TypeScript.

## Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS v4, clsx, tailwind-merge
- **State Management:** React Query (TanStack Query)
- **Forms:** React Hook Form
- **Code Quality:** biomejs

## Folder Structure

```text
.
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   │   └── ui/
│   ├── core/
│   │   ├── api/
│   │   └── assets/
│   │       └── styles/
│   ├── features/
│   │   └── auth/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── pages/
│   │       ├── routes/
│   │       └── services/
│   ├── lib/
│   └── shared/
│       ├── components/
│       ├── constants/
│       ├── hooks/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       ├── stores/
│       └── utils/
├── components.json
├── eslint.config.js
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Shadcn/ui Notes

- shadcn aliases are aligned with the current repo structure: `ui` and `components` point to `src/components`, `utils` points to `src/lib/utils`, and `hooks` points to `src/shared/hooks`.
- The global stylesheet imports the local `src/core/assets/styles/localTheme.css` file, so the shadcn theme layer can coexist with the existing base styles.

## Setup requirement

- Node.js >= 18
- Package Manager: npm/pnpm/yarn

## Install & run the project

1. **Clone project:**
   ```
   git clone https://github.com/ota-system/reactjs-frontend.git
   cd reactjs-frontend
   ```
2. **Install dependencies**

   ```
   npm install
   ```

3. **Setup environment variables**

   Copy `.env.example` to `.env` and update with your credentials:

   ```
   cp .env.example .env
   ```

   Update these values in `.env`:
   - `VITE_API_BASE_URL` - Backend API URL

4. **Start development server**

   ```
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run Jest tests
- `npm run prepare` - Setup Husky hooks

## Branch name and commit discription

- **Branch name:** type/TRELLO-KEY-discription (Example: feat/OTA-1-login)
- **Commit discription:** type(JIRA-KEY): discription (Example: feat(OTA-1): add button component)
- **Type:** `feat`, `fix`, `chore`, `style`, `refactor`, `test`...
- **TRELLO-KEY example:** `OTA-1`
