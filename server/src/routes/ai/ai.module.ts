import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CheckTranslationByAiHandler } from 'features/ai/checkTranslationByAI.command'
import { GetTranscriptionByAiHandler } from 'features/ai/getTranscriptionByAI.command'
import { AnalysePhaseInSentenceByAiHandler } from 'features/ai/analysePhaseInSentenceByAi.command'
import { AiResolver } from './ai.resolver'

const commandHandlers = [CheckTranslationByAiHandler, GetTranscriptionByAiHandler, AnalysePhaseInSentenceByAiHandler]
const resolvers = [AiResolver]

@Module({
	imports: [CqrsModule],
	providers: [...commandHandlers, ...resolvers],
})
export class AiModule {}
