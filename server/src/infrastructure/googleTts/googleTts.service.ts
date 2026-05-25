import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech'
import { Injectable } from '@nestjs/common'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LanguageCode } from 'prisma/generated/client'
import { MainConfigService } from '../mainConfig/mainConfig.service'

type AudioEncoding = protos.google.cloud.texttospeech.v1.AudioEncoding

@Injectable()
export class GoogleTtsService {
	private readonly client: TextToSpeechClient

	constructor(private mainConfig: MainConfigService) {
		const credentials = mainConfig.get().googleTts.serviceAccountCredentials
		this.client = new TextToSpeechClient({ credentials })
	}

	async generateAudio(text: string, languageCode: LanguageCode): Promise<Buffer> {
		const VOICE_MAP: Record<LanguageCode, string> = {
			en: 'en-US-Chirp3-HD-Charon',
			es: 'es-ES-Chirp3-HD-Fenrir',
			fr: 'fr-FR-Chirp3-HD-Aoede',
			de: 'de-DE-Chirp3-HD-Aoede',
			ru: 'ru-RU-Standard-A',
			it: 'it-IT-Standard-A',
			tr: 'tr-TR-Standard-A',
		}

		const voiceName = VOICE_MAP[languageCode]

		const LANGUAGE_CODE_MAP: Record<LanguageCode, string> = {
			en: 'en-US',
			es: 'es-ES',
			fr: 'fr-FR',
			de: 'de-DE',
			ru: 'ru-RU',
			it: 'it-IT',
			tr: 'tr-TR',
		}

		const bcp47LanguageCode = LANGUAGE_CODE_MAP[languageCode]

		const audioEncoding: AudioEncoding = 3 // 'OGG_OPUS'

		const [response] = await this.client.synthesizeSpeech({
			input: { text },
			voice: {
				languageCode: bcp47LanguageCode,
				name: voiceName,
			},
			audioConfig: {
				audioEncoding,
			},
		})

		if (!response.audioContent) {
			throw new CustomError(
				errorMessage.audioPronunciation.cannotGenerateAudio,
				ErrorStatusCode.InternalServerError_500,
			)
		}

		return Buffer.from(response.audioContent as Uint8Array)
	}
}
