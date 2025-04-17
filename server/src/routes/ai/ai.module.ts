import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CheckTranslationByAiHandler } from '../../features/ai/checkTranslationByAI.command'
import { AiResolver } from './ai.resolver'

const commandHandlers = [CheckTranslationByAiHandler]
const resolvers = [AiResolver]

@Module({
	imports: [CqrsModule],
	providers: [...commandHandlers, ...resolvers],
})
export class AiModule {}
