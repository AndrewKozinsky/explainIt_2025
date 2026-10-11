import { Module } from '@nestjs/common'
import OpenAI from 'openai'
import { GoogleTtsService } from '../googleTts/googleTts.service'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { GoogleTtsProvider } from './GoogleTtsProvider'
import { OpenAITtsProvider } from './OpenAITtsProvider'
import { TtsAdapterService } from './TtsAdapter.service'

function createAdapter(config: MainConfigService): TtsAdapterService {
	let openAIClient: OpenAI | undefined
	let googleService: GoogleTtsService | undefined

	const openAI = new OpenAITtsProvider(() => {
		const apiKey = config.get().openAI.apiKey
		if (!apiKey) return null

		return (openAIClient ??= new OpenAI({ apiKey, maxRetries: 0, timeout: 60_000 }))
	})

	const google = new GoogleTtsProvider(() => (googleService ??= new GoogleTtsService(config)))

	return new TtsAdapterService(openAI, google)
}

/** Import into the consuming feature's Nest module. No clients or requests on module creation. */
@Module({
	imports: [MainConfigModule],
	providers: [{ provide: TtsAdapterService, inject: [MainConfigService], useFactory: createAdapter }],
	exports: [TtsAdapterService],
})
export class TtsProviderModule {}
