import { UniversalTranscriptionResolver } from 'routes/universalTranscription/universalTranscription.resolver'

export const transcriptionResolversDesc: Record<keyof typeof UniversalTranscriptionResolver.prototype, string> = {
	createTranscription: 'Create transcription for a word using DeepSeek',
}
