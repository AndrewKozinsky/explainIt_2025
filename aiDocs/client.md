# Client (face)

## Front-end part

— try to avoid excessive nesting and deeply nested conditionals.
— when logic becomes nested or hard to read, extract small helper functions to keep code flat and readable.
— use meaningful variable and function names.
— avoid using any type; prefer specific types or unions.
— for each component create a separate folder with component files. For example: `Button`, `Button.tsx`, `Button.scss`.
— try to keep components small and focused on a single responsibility.
— try to reuse existing components when possible rather than creating new ones.
— if components become too complex, consider breaking them into smaller, more manageable pieces.
— if components form a logical group, put them in a separate folder.
— use shared components from 'face/ui' when possible.
— use common styles and utilities from 'face/styles' when possible.
— users work with this web-site on touch devices like tablets and smartphones and desktop computers
— ensure responsive design for various screen sizes