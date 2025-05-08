import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CheckTranslationByAiHandler } from '../../features/ai/checkTranslationByAI.command'
import { GetTranscriptionByAiHandler } from '../../features/ai/getTranscriptionByAI.command'
import { AiResolver } from './ai.resolver'

const commandHandlers = [CheckTranslationByAiHandler, GetTranscriptionByAiHandler]
const resolvers = [AiResolver]

@Module({
	imports: [CqrsModule],
	providers: [...commandHandlers, ...resolvers],
})
export class AiModule {}
