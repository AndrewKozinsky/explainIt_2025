import { UniversalAudioPronunciationResolver } from 'routes/universalPhraseAudio/universalPhraseAudio.resolver'

export const audioPronunciationResolversDesc: Record<
	keyof typeof UniversalAudioPronunciationResolver.prototype,
	string
> = {
	createAudio: 'Generate audio pronunciation for a word using Google TTS and store it on S3',
}
