import { z } from 'zod'
import { SonioxSttEvent, sonioxSttOptionsSchema } from 'infrastructure/sonioxStt/sonioxStt.types'

export const DICTATION_LIMITS = {
	frameBytes: 256 * 1024,
	pendingBytes: 1024 * 1024,
	pendingFrames: 64,
	totalBytes: 64 * 1024 * 1024,
	outputBytes: 256 * 1024,
	textCharacters: 20_000,
	startTimeoutMs: 10_000,
	idleTimeoutMs: 30_000,
	durationMs: 5 * 60_000,
	handshakeTimeoutMs: 10_000,
} as const

const startSchema = z
	.object({
		type: z.literal('start'),
		audioFormat: sonioxSttOptionsSchema.shape.audioFormat,
		sampleRate: sonioxSttOptionsSchema.shape.sampleRate,
		numChannels: sonioxSttOptionsSchema.shape.numChannels,
	})
	.strict()

const controlSchema = z.discriminatedUnion('type', [
	startSchema,
	z.object({ type: z.literal('stop') }).strict(),
	z.object({ type: z.literal('cancel') }).strict(),
])

/** Только параметры аудио; языки, модель, ключи и таймауты задаёт сервер. */
export function parseDictationControl(text: string) {
	try {
		const control = controlSchema.safeParse(JSON.parse(text))

		if (!control.success) return null
		if (control.data.type !== 'start') return control.data

		const { type, ...audio } = control.data

		// Проверяем межполевые ограничения PCM/container по полной инфраструктурной схеме.
		if (!sonioxSttOptionsSchema.safeParse(audio).success) return null

		return { type, ...audio }
	} catch {
		return null
	}
}

export type AiDialogueDictationServerEvent =
	| { type: 'ready' }
	| SonioxSttEvent
	| { type: 'done'; text: string }
	| { type: 'cancelled' }
	| { type: 'error'; code: string }
