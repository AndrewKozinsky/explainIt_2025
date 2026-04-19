import { UniversalAudioPronunciationResolver } from './audioPronunciation.resolver'

export const audioPronunciationResolversDesc: Record<keyof typeof UniversalAudioPronunciationResolver.prototype, string> = {
	createAudioPronunciation: 'Generate audio pronunciation for a word using Google TTS and store it on S3',
}
