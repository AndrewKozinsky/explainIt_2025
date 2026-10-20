import { z } from 'zod'

/** REST API: https://soniox.com/docs/api-reference/tts/generate_tts */
export const sonioxTtsOptionsSchema = z
	.object({
		model: z.string().trim().min(1).max(50),
		language: z.string().trim().min(1).max(50),
		voice: z.string().trim().min(1).max(50),
		audioFormat: z.enum(['pcm_f32le', 'pcm_s16le', 'pcm_mulaw', 'pcm_alaw', 'wav', 'flac', 'mp3', 'opus', 'aac']),
		sampleRate: z.number().int().positive().optional(),
		bitrate: z.number().int().positive().optional(),
		speed: z.number().min(0.7).max(1.3).optional(),
		reduceSilence: z.boolean().optional(),
		clientReferenceId: z.string().max(256).optional(),
		timeoutMs: z.number().int().positive().max(2_147_483_647).optional(),
		abortSignal: z.custom<AbortSignal>((value) => value instanceof AbortSignal).optional(),
	})
	.strict()

export const sonioxTtsRequestSchema = sonioxTtsOptionsSchema
	.extend({
		text: z
			.string()
			.max(5000)
			.refine((text) => text.trim().length > 0),
	})
	.strict()

export type SonioxTtsOptions = z.infer<typeof sonioxTtsOptionsSchema>
