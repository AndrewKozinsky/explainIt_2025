# AI Development Guidelines

## Common rules
- Ask questions if something is unclear
- Follow the existing code style and patterns
- Write clear, concise, and well-documented code

## Root folder structure
- `face` — frontend part
- `server` — backend with Nest.js with PrismaORM (PostgreSQL) and GraphQL (Apollo Server)
— `nginx` — reverse proxy
— `infrastructure` — a tool for creating Docker-compose files

## Front-end part
A Next.js project with Apollo GraphQl and SCSS.
— prefer ordinary functions rather than arrow functions. Use arrow functions only if this way gives better readability or scoping.
— try to avoid excessive nesting and deeply nested conditionals.
— when logic becomes nested or hard to read, extract small helper functions to keep code flat and readable.
— use meaningful variable and function names.
— avoid using any type; prefer specific types or unions.
— for each component create a separate folder with component files. For example: `Button`, `Button.tsx`, `Button.scss`.
— try to avoid putting business logic into component. Use 'fn' folder for business logic. For example: `Button/fn/useFetchData`, `Button/fn/useValidateForm`.
— try to keep components small and focused on a single responsibility.
— try to reuse existing components when possible rather than creating new ones.
— if components become too complex, consider breaking them into smaller, more manageable pieces.
— if components form a logical group, put them in a separate folder.
— use shared components from 'face/ui' when possible.
— put reusable UI elements in the 'face/ui' directory.
— use common styles and utilities from 'face/styles' when possible.
— users work with this web-site on touch devices like tablets and smartphones and desktop computers
— ensure responsive design for various screen sizes

## Server-side
A Nest.js project with GraphQl, Prisma ORM and Postgres.
— use clear and descriptive variable names

Use a command
nvm use 24
to switch to an actual Node.js version if you are going to run any command with it.