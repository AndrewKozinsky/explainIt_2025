import { Module } from '@nestjs/common'
import OpenAI from 'openai'
import { GoogleTtsService } from '../googleTts/googleTts.service'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { SonioxTtsService } from '../sonioxTts/sonioxTts.service'
import { GoogleTtsProvider } from './GoogleTtsProvider'
import { OpenAITtsProvider } from './OpenAITtsProvider'
import { SonioxTtsProvider } from './SonioxTtsProvider'
import { TtsAdapterService } from './TtsAdapter.service'

function createAdapter(config: MainConfigService): TtsAdapterService {
	let openAIClient: OpenAI | undefined
	let googleService: GoogleTtsService | undefined
	let sonioxService: SonioxTtsService | undefined

	const openAI = new OpenAITtsProvider(() => {
		const apiKey = config.get().openAI.apiKey
		if (!apiKey) return null

		return (openAIClient ??= new OpenAI({ apiKey, maxRetries: 0, timeout: 60_000 }))
	})

	const google = new GoogleTtsProvider(() => (googleService ??= new GoogleTtsService(config)))

	const soniox = new SonioxTtsProvider(() => (sonioxService ??= new SonioxTtsService(config)))

	return new TtsAdapterService(openAI, google, soniox)
}

/** Import into the consuming feature's Nest module. No clients or requests on module creation. */
@Module({
	imports: [MainConfigModule],
	providers: [{ provide: TtsAdapterService, inject: [MainConfigService], useFactory: createAdapter }],
	exports: [TtsAdapterService],
})
export class TtsProviderModule {}
