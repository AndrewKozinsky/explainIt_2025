import { Module } from '@nestjs/common'
import { Flux3ImageAdapter } from '../fluxImageGeneration/flux3Image.adapter'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { FluxImageGenerationProvider } from './FluxImageGenerationProvider'
import { ImageGenerationAdapterService } from './ImageGenerationAdapter.service'

function createAdapter(config: MainConfigService): ImageGenerationAdapterService {
	const flux = new FluxImageGenerationProvider(() => {
		const key = config.get().blackForestLabs.apiKey
		return key ? new Flux3ImageAdapter(key) : null
	})

	return new ImageGenerationAdapterService([flux])
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
