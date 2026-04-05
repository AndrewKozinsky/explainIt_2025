// import { Injectable } from '@nestjs/common'
// import axios from 'axios'
// import { VoiceRepository } from 'repo/voice.repository'
// import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
// import { ErrorCode } from 'infrastructure/exceptions/errorCode'
// import { errorMessage } from 'infrastructure/exceptions/errorMessage'
// import { LanguageCode } from 'prisma/generated/client'
// import { MainConfigService } from '../mainConfig/mainConfig.service'
// const { HttpsProxyAgent } = require('https-proxy-agent')

/*@Injectable()
export class ElevenLabsService {
	private readonly apiKey: string
	private readonly httpsAgent: InstanceType<typeof HttpsProxyAgent>

	constructor(
		private mainConfig: MainConfigService,
		private voiceRepository: VoiceRepository,
	) {
		this.apiKey = this.mainConfig.get().elevenLabs.apiKey
		this.httpsAgent = new HttpsProxyAgent('http://150.251.155.161:3128')
	}

	async generateAudio(text: string, languageCode: LanguageCode): Promise<Buffer> {
		const voice = await this.voiceRepository.getVoiceByLanguageCode(languageCode)
		if (!voice) {
			throw new CustomGraphQLError(errorMessage.elevenLabs.voiceNotFound, ErrorCode.InternalServerError_500)
		}

		const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice.eleven_labs_voice_id}`

		const response = await axios.post(
			url,
			{
				text,
				model_id: 'eleven_multilingual_v2',
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'xi-api-key': this.apiKey,
				},
				responseType: 'arraybuffer',
				httpsAgent: this.httpsAgent,
				proxy: false,
				validateStatus: () => true,
			},
		)

		if (response.status < 200 || response.status >= 300) {
			throw new CustomGraphQLError(errorMessage.elevenLabs.cannotGenerateAudio, ErrorCode.InternalServerError_500)
		}

		return Buffer.from(response.data)
	}
}*/
