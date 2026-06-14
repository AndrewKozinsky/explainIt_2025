import { UniversalPhraseTranscriptionResolver } from 'routes/universalPhraseTranscription/universalPhraseTranscription.resolver'

export const transcriptionResolversDesc: Record<keyof typeof UniversalPhraseTranscriptionResolver.prototype, string> = {
	createTranscription: 'Create transcription for a word using DeepSeek',
}
