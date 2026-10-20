import { z } from 'zod'

const timeout = z.number().int().positive().max(2_147_483_647)

export const sonioxSttOptionsSchema = z
	.object({
		model: z.string().trim().min(1).default('stt-rt-v5'),
		// auto: one continuous container stream, including its initial headers (e.g. WebM/Opus).
		audioFormat: z.enum(['auto', 'pcm_s16le', 'pcm_f32le', 'mulaw', 'alaw']).default('auto'),
		sampleRate: z.number().int().min(8000).max(48000).optional(),
		numChannels: z.number().int().min(1).max(2).optional(),
		languageHints: z.array(z.string().trim().min(2).max(10)).min(1).optional(),
		languageHintsStrict: z.boolean().optional(),
		clientReferenceId: z.string().max(256).optional(),
		connectTimeoutMs: timeout.default(10_000),
		finishTimeoutMs: timeout.default(30_000),
		abortSignal: z.custom<AbortSignal>((value) => value instanceof AbortSignal).optional(),
	})
	.strict()
	.superRefine((options, ctx) => {
		if (options.audioFormat !== 'auto' && (!options.sampleRate || !options.numChannels)) {
			ctx.addIssue({ code: 'custom', message: 'Raw audio requires sampleRate and numChannels' })
		}
		if (options.audioFormat === 'auto' && (options.sampleRate !== undefined || options.numChannels !== undefined)) {
			ctx.addIssue({ code: 'custom', message: 'Container audio uses its own sample rate and channels' })
		}
		if (options.languageHintsStrict && !options.languageHints?.length) {
			ctx.addIssue({ code: 'custom', message: 'Strict language hints require languageHints' })
		}
		if (options.languageHints && new Set(options.languageHints).size !== options.languageHints.length) {
			ctx.addIssue({ code: 'custom', message: 'Language hints must be unique' })
		}
	})

export type SonioxSttOptions = z.input<typeof sonioxSttOptionsSchema>
export type SonioxSttConfig = z.output<typeof sonioxSttOptionsSchema>

export type SonioxSttEvent =
	// Replace the entire provisional tail. Empty text clears it.
	| { type: 'partial'; text: string }
	// Append this fragment to committed text and clear the previous provisional tail.
	| { type: 'final'; text: string }

export interface SonioxSttSession {
	/** One consumer per session. Iteration throws SonioxSttError on failure/abort. */
	readonly events: AsyncIterable<SonioxSttEvent>
	/** Bytes from one continuous audio stream. Await sends to apply backpressure. */
	sendAudio(chunk: Uint8Array): Promise<void>
	/** Stop accepting audio, drain accepted chunks, then await the provider's final response. Idempotent. */
	finish(): Promise<void>
	/** Immediately release resources. Pending operations reject with code aborted. Idempotent. */
	abort(): void
}
