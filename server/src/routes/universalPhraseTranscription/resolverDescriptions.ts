import { UniversalPhraseTranscriptionResolver } from 'routes/universalPhraseTranscription/universalPhraseTranscription.resolver'

export const transcriptionResolversDesc: Record<keyof typeof UniversalPhraseTranscriptionResolver.prototype, string> = {
	getOrCreateTranscription: 'Get or create transcription for a word using DeepSeek',
}
