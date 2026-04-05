import { TranscriptionResolver } from './transcription.resolver'

export const transcriptionResolversDesc: Record<keyof typeof TranscriptionResolver.prototype, string> = {
	createTranscription: 'Create transcription for a word using DeepSeek',
}
