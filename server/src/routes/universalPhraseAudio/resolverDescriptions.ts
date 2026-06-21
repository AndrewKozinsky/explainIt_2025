import { UniversalPhraseAudioResolver } from 'routes/universalPhraseAudio/universalPhraseAudio.resolver'

export const universalPhraseAudioResolversDesc: Record<keyof typeof UniversalPhraseAudioResolver.prototype, string> = {
	getOrCreateAudio: 'Get or create audio pronunciation for a word using Google TTS and store it on S3',
}
