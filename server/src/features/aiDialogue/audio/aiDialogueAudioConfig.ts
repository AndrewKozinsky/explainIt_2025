import { z } from 'zod'
import { OPENAI_TTS_VOICES } from 'infrastructure/ttsProviderAdapter/TtsProvider.interface'

export const dialogueVoiceSchema = z
	.object({
		voice: z.enum(OPENAI_TTS_VOICES),
		instructions: z.string().trim().min(1).max(3000),
	})
	.strict()

export type DialogueVoice = z.infer<typeof dialogueVoiceSchema>
export const AI_DIALOGUE_TTS_MODEL = 'gpt-4o-mini-tts-2025-12-15' as const
export const AI_DIALOGUE_NARRATOR: DialogueVoice = {
	voice: 'cedar',
	instructions:
		'Narrate naturally like a calm storyteller. Use clear articulation, an even pace and restrained expression. Read only the supplied text in its original language.',
}
