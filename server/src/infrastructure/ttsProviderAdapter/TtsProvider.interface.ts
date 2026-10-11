import { GoogleTtsAudioConfig, GoogleTtsVoice } from '../googleTts/googleTts.types'

export const OPENAI_TTS_VOICES = [
	'alloy',
	'ash',
	'ballad',
	'coral',
	'echo',
	'fable',
	'nova',
	'onyx',
	'sage',
	'shimmer',
	'verse',
	'marin',
	'cedar',
] as const

type TtsInputBase = { text: string; timeoutMs?: number }

export type OpenAITtsInput = TtsInputBase & {
	type: 'OpenAI'
	model: 'gpt-4o-mini-tts' | 'gpt-4o-mini-tts-2025-12-15'
	voice: (typeof OPENAI_TTS_VOICES)[number]
	instructions?: string
	responseFormat?: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm'
	speed?: number
	abortSignal?: AbortSignal
}

export type GoogleTtsInput = TtsInputBase & {
	type: 'Google'
	voice: GoogleTtsVoice
	audioConfig: GoogleTtsAudioConfig
}

/** Discriminated union: each supplier receives only its own parameters. */
export type TtsGenerateInput = OpenAITtsInput | GoogleTtsInput

export interface TtsProvider<TInput extends TtsGenerateInput> {
	generate(input: TInput): Promise<Buffer>
}
