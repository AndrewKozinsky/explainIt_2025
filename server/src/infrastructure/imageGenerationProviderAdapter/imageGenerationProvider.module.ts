import { Module } from '@nestjs/common'
import OpenAI from 'openai'
import { Flux3ImageAdapter } from '../fluxImageGeneration/flux3Image.adapter'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { FluxImageGenerationProvider } from './FluxImageGenerationProvider'
import { ImageGenerationAdapterService } from './ImageGenerationAdapter.service'
import { OpenAIImageGenerationProvider } from './OpenAIImageGenerationProvider'

function createAdapter(config: MainConfigService): ImageGenerationAdapterService {
	const flux = new FluxImageGenerationProvider(() => {
		const key = config.get().blackForestLabs.apiKey
		return key ? new Flux3ImageAdapter(key) : null
	})

	let client: OpenAI | undefined
	const openAI = new OpenAIImageGenerationProvider(() => {
		const key = config.get().openAI.apiKey
		if (!key) return null
		return (client ??= new OpenAI({ apiKey: key, maxRetries: 0, timeout: 180_000 }))
	})

	return new ImageGenerationAdapterService([flux, openAI])
}

/** External image clients only; HTTP consumers can import this module without starting a worker. */
@Module({
	imports: [MainConfigModule],
	providers: [
		{
			provide: ImageGenerationAdapterService,
			inject: [MainConfigService],
			useFactory: createAdapter,
		},
	],
	exports: [ImageGenerationAdapterService],
})
export class ImageGenerationProviderModule {}
