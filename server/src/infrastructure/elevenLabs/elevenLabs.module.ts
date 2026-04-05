// import { Global, Module } from '@nestjs/common'
// import { CqrsModule } from '@nestjs/cqrs'
// import { VoiceRepository } from 'repo/voice.repository'
// import { PrismaService } from 'db/prisma.service'
// import { SeedVoicesHandler } from 'features/voice/SeedVoices.command'
// import { MainConfigService } from '../mainConfig/mainConfig.service'
// import { ElevenLabsService } from './elevenLabs.service'

/*const elevenLabsServiceProvider = {
	provide: ElevenLabsService,
	useFactory: (mainConfigService: MainConfigService, voiceRepository: VoiceRepository) => {
		return new ElevenLabsService(mainConfigService, voiceRepository)
	},
	inject: [MainConfigService, VoiceRepository],
}*/

/*@Global()
@Module({
	imports: [CqrsModule],
	providers: [PrismaService, VoiceRepository, SeedVoicesHandler, elevenLabsServiceProvider],
	exports: [ElevenLabsService],
})
export class ElevenLabsModule {}*/
