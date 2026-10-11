/** Google-native voice selection and the supported audio settings. */
export type GoogleTtsVoice = {
	languageCode: string
	name?: string
	ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL'
}

export type GoogleTtsAudioConfig = {
	audioEncoding: 'LINEAR16' | 'MP3' | 'OGG_OPUS' | 'MULAW' | 'ALAW'
	speakingRate?: number
	pitch?: number
	volumeGainDb?: number
	sampleRateHertz?: number
	effectsProfileId?: string[]
}
