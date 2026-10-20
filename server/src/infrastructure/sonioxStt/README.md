# Soniox streaming STT

Import `SonioxSttModule` and inject `SonioxSttService`. The module is already registered in
`AppModule`. It reads the existing `SONIOX_API_KEY` through `MainConfigService` only when
opening a stream; an unused service does not require credentials or open a connection.

Each press of Start creates a new `openStream(options)` session. Feed it audio bytes from
the client using `await session.sendAudio(chunk)`. Consume `session.events` concurrently
with sending audio. On Stop, first send the recorder's final chunk, then call
`await session.finish()`, and wait for the event consumer to finish as well.

```ts
const session = await sonioxSttService.openStream({
	audioFormat: 'auto',
	languageHints: ['ru'],
})

let committed = ''
let provisional = ''

async function receiveText() {
	for await (const event of session.events) {
		if (event.type === 'final') {
			committed += event.text
			provisional = ''
		} else {
			provisional = event.text
		}
		// Forward committed + provisional to the client using the feature's transport.
	}
}

// Start receiving now, while the recorder continues to send audio.
const receiving = receiveText()
void receiving.catch(() => session.abort())
// Also report errors to the client and stop its recorder.
// await session.sendAudio(chunk) for every chunk, in its recorded order.
// await session.finish() after the last chunk; await receiving before saving text.
// session.abort() when the client disconnects or the user cancels.
```

## Audio input

`audioFormat: 'auto'` (default) accepts one continuous container stream, including its
initial headers: for example WebM/Opus from a browser recorder. Chunks are byte slices of
that stream, not separate standalone recordings. This service neither captures audio nor
transcodes or resamples it. The client must send a supported stream.

Raw audio uses `pcm_s16le`, `pcm_f32le`, `mulaw` or `alaw`, with explicit `sampleRate` and
`numChannels`. For example, mono 16 kHz PCM:

```ts
await sonioxSttService.openStream({
	audioFormat: 'pcm_s16le',
	sampleRate: 16000,
	numChannels: 1,
	languageHints: ['ru'],
})
```

The default model is `stt-rt-v5`. `languageHints` biases recognition; use
`languageHintsStrict: true` to restrict languages. `abortSignal` cancels connection setup
or an active session. Connection and finalization deadlines default to 10 and 30 seconds
and can be configured using `connectTimeoutMs` and `finishTimeoutMs`.

## Session contract

- `partial.text` replaces the complete provisional tail, including clearing it with `''`.
- `final.text` appends new committed text and clears the previous provisional tail.
- Spaces and punctuation are preserved; do not insert spaces between final fragments.
- One event iterator per session. Exiting the iterator early aborts the session.
- `finish()` stops accepting audio synchronously and drains already accepted sends. It
  succeeds only after the provider sends `finished: true`. Events may still be queued
  for the consumer, so also await the receiver. Repeated calls return the same promise.
- `abort()` is immediate and idempotent. Pending operations and event iteration reject
  with `SonioxSttError` (`code: 'aborted'`). It is not successful finalization.
- Network/provider failures and malformed messages reject event iteration and `finish()`.
  No retries or reconnection: replaying audio could duplicate text or incur extra charges.
- Await audio sends. Pending audio is limited to 1 MiB; oversize sends are rejected with
  `buffer_overflow`. A send has a 15-second deadline. Consecutive queued partial events
  are coalesced; exceeding 256 queued events aborts the stream with `buffer_overflow`.
- Keepalive messages are sent during pauses. Endpoint detection is disabled: pauses do
  not stop dictation. Stop is explicitly controlled by the caller.

This infrastructure module provides no browser microphone UI, application WebSocket route,
authentication of application users, storage or billing. Those belong to the consuming
feature. Deepgram subtitle generation and TTS providers are unchanged.

Protocol reference: [Soniox WebSocket API](https://soniox.com/docs/api-reference/stt/websocket-api).
