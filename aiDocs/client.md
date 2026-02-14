# Client (face)

## Front-end part
A Next.js project with Apollo GraphQl and SCSS in the folder "face".
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

## SSE streaming (translation) — project rules and architecture

This project uses **SSE (Server-Sent Events)** to stream translation results progressively to the UI.

### Server-side contract (events)
- The server responds with `text/event-stream` and sends **custom named events**:
  - `chunk` — a partial piece of the resulting text.
  - `done` — stream finished successfully.
  - `error` — stream finished with an error.

Payload format:
- `chunk` event `data` is a JSON string of shape: `{ "text": "..." }`.
- `error` event `data` is a JSON string of shape: `{ "message": "..." }`.

Important:
- We intentionally use `chunk/done/error` instead of the default SSE `message` event.
- The client must always close the connection on `done` or `error`.

### Front-end layering (do not reimplement “from scratch”)
Client-side streaming is intentionally split into 3 layers (separation of concerns):

1) `face/utils/sse/openSse.ts`
- Low-level transport based on `EventSource`.
- Knows only about SSE mechanics and routing events to callbacks.
- Does not know anything about translation/analyse domain.

2) `face/utils/sse/readStream.ts`
- Universal stream client built on top of `openSse`.
- Responsibilities:
  - parse `chunk` JSON (`{ text }`)
  - accumulate full text into `fullText`
  - call `onChunk({ chunk, fullText })`
  - resolve when `done` arrives, reject on `error`

3) Domain adapter for translation: `face/_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/fn/translationStream.ts`
- Uses `readStream`.
- Parses the streamed `fullText` into:
  - `translation`
  - `analysis`
- Separator rule: translation and analysis are separated by a **blank line** (`\n\n`).
- Provides `onPartial({ translation, analysis })` so UI can update progressively.

### Where it is used
- `face/_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/fn/translateSentence.ts` (`useTranslateSentence`)
  - opens stream via `readTranslationStream` (domain adapter)
  - updates Zustand store on **every partial chunk** to render progressive updates
  - does not do client-side prevalidation of sentence length/text (keep behavior)

### Rules when changing SSE behavior
- If you need to change the protocol (event names, payload shapes), update both:
  - server event emitter (SSE route/service)
  - `openSse/readStream` contract and the translation adapter.
- Prefer updating existing layers over creating new ones.
- Always keep connection lifecycle correct:
  - close on `done`
  - close on `error`
  - avoid leaking EventSource instances.
