import { Injectable } from '@nestjs/common'
import { VoiceRepository } from 'repo/voice.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { LanguageCode } from 'prisma/generated/client'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class ElevenLabsService {
	private readonly apiKey: string

	constructor(
		private mainConfig: MainConfigService,
		private voiceRepository: VoiceRepository,
	) {
		this.apiKey = this.mainConfig.get().elevenLabs.apiKey
	}

	async generateAudio(text: string, languageCode: LanguageCode): Promise<Buffer> {
		const voice = await this.voiceRepository.getVoiceByLanguageCode(languageCode)
		if (!voice) {
			throw new CustomGraphQLError(errorMessage.elevenLabs.voiceNotFound, ErrorCode.InternalServerError_500)
		}

		const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice.eleven_labs_voice_id}`

		console.log('-------------------------')
		console.log(this.apiKey)

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'xi-api-key': this.apiKey,
			},
			body: JSON.stringify({
				text,
				model_id: 'eleven_multilingual_v2',
			}),
		})
		console.log(response)

		if (!response.ok) {
			throw new CustomGraphQLError(errorMessage.elevenLabs.cannotGenerateAudio, ErrorCode.InternalServerError_500)
		}

		const arrayBuffer = await response.arrayBuffer()
		return Buffer.from(arrayBuffer)
	}
}
