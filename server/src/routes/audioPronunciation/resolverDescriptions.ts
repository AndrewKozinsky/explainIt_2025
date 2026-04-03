import { AudioPronunciationResolver } from './audioPronunciation.resolver'

export const audioPronunciationResolversDesc: Record<keyof typeof AudioPronunciationResolver.prototype, string> = {
	createAudioPronunciation: 'Create audio pronunciation for a word using ElevenLabs',
}
