const synthesizeSpeech = jest.fn()
jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('@google-cloud/text-to-speech', () => {
	const actual = jest.requireActual('@google-cloud/text-to-speech')
	return { ...actual, TextToSpeechClient: jest.fn(() => ({ synthesizeSpeech })) }
})

import { protos } from '@google-cloud/text-to-speech'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { GoogleTtsService } from './googleTts.service'

describe('GoogleTtsService', () => {
	const config = { get: () => ({ googleTts: { serviceAccountCredentials: {} } }) } as unknown as MainConfigService
	beforeEach(() => synthesizeSpeech.mockReset())

	it('preserves existing pronunciation voice and OGG format', async () => {
		const bytes = Buffer.from([0, 255, 128])
		synthesizeSpeech.mockResolvedValue([{ audioContent: bytes }])
		expect(await new GoogleTtsService(config).generateAudio('Hello', 'en')).toEqual(bytes)
		expect(synthesizeSpeech).toHaveBeenCalledWith(
			{
				input: { text: 'Hello' },
				voice: { languageCode: 'en-US', name: 'en-US-Chirp3-HD-Charon' },
				audioConfig: { audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.OGG_OPUS },
			},
			undefined,
		)
	})

	it('maps explicit encoding and passes timeout without Google SDK retries', async () => {
		const bytes = Buffer.from([0, 255, 128])
		synthesizeSpeech.mockResolvedValue([{ audioContent: bytes.toString('base64') }])
		expect(
			await new GoogleTtsService(config).synthesizeAudio(
				'Hello',
				{ languageCode: 'en-GB', name: 'en-GB-Standard-A' },
				{ audioEncoding: 'MP3', speakingRate: 0.8, pitch: 2 },
				2000,
			),
		).toEqual(bytes)

		expect(synthesizeSpeech).toHaveBeenCalledWith(
			{
				input: { text: 'Hello' },
				voice: { languageCode: 'en-GB', name: 'en-GB-Standard-A' },
				audioConfig: {
					audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
					speakingRate: 0.8,
					pitch: 2,
				},
			},
			{ timeout: 2000, retry: null },
		)
	})
})
