import { z } from 'zod'
import { sonioxTtsRequestSchema } from '../sonioxTts/sonioxTts.types'
import { OPENAI_TTS_VOICES } from './TtsProvider.interface'

const base = {
	text: z.string().refine((text) => text.trim().length > 0),
	timeoutMs: z.number().int().positive().max(2_147_483_647).optional(),
}

export const openAITtsInputSchema = z
	.object({
		...base,
		type: z.literal('OpenAI'),
		text: base.text.max(4096),
		model: z.enum(['gpt-4o-mini-tts', 'gpt-4o-mini-tts-2025-12-15']),
		voice: z.enum(OPENAI_TTS_VOICES),
		instructions: z.string().max(4096).optional(),
		responseFormat: z.enum(['mp3', 'opus', 'aac', 'flac', 'wav', 'pcm']).optional(),
		speed: z.number().min(0.25).max(4).optional(),
		abortSignal: z.custom<AbortSignal>((value) => value instanceof AbortSignal).optional(),
	})
	.strict()

export const googleTtsInputSchema = z
	.object({
		...base,
		text: base.text.refine((text) => Buffer.byteLength(text, 'utf8') <= 5000),
		type: z.literal('Google'),
		voice: z
			.object({
				languageCode: z.string().trim().min(1),
				name: z.string().trim().min(1).optional(),
				ssmlGender: z.enum(['MALE', 'FEMALE', 'NEUTRAL']).optional(),
			})
			.strict(),
		audioConfig: z
			.object({
				audioEncoding: z.enum(['LINEAR16', 'MP3', 'OGG_OPUS', 'MULAW', 'ALAW']),
				speakingRate: z.number().min(0.25).max(2).optional(),
				pitch: z.number().min(-20).max(20).optional(),
				volumeGainDb: z.number().min(-96).max(16).optional(),
				sampleRateHertz: z.number().int().positive().optional(),
				effectsProfileId: z.array(z.string().trim().min(1)).optional(),
			})
			.strict(),
	})
	.strict()

export const sonioxTtsInputSchema = sonioxTtsRequestSchema.extend({ type: z.literal('Soniox') }).strict()
