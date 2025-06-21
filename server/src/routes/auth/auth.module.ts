import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CheckTranslationByAiHandler } from '../../features/ai/checkTranslationByAI.command'
import { GetTranscriptionByAiHandler } from '../../features/ai/getTranscriptionByAI.command'
import { AuthResolver } from './auth.resolver'

// const commandHandlers = [CheckTranslationByAiHandler]
const resolvers = [AuthResolver]

@Module({
	imports: [CqrsModule],
	providers: [/*...commandHandlers,*/ ...resolvers],
})
export class AuthModule {}
