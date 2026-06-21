import { UniversalPhraseAudioResolver } from './universalPhraseAudio.resolver'

export const universalPhraseAudioResolversDesc: Record<keyof typeof UniversalPhraseAudioResolver.prototype, string> = {
	getAudio: 'Get existing audio pronunciation for a phrase (read-only, does not create)',
	getOrCreateAudio: 'Get or create audio pronunciation for a word using Google TTS and store it on S3',
}
