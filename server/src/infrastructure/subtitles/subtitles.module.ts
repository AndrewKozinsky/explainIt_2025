import { Module } from '@nestjs/common'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { SubtitlesService } from './SubtitlesService'

@Module({
	imports: [LlmProviderModule],
	providers: [SubtitlesService],
	exports: [SubtitlesService],
})
export class SubtitlesModule {}
