import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GrammarConceptQueryRepository } from 'repo/grammarConcept.queryRepository'
import { GrammarConceptRepository } from 'repo/grammarConcept.repository'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { FetchGrammarConceptsHandler } from 'features/grammarConcept/FetchGrammarConcepts.command'
import { GrammarExtractionService } from 'features/grammarConcept/grammarExtraction.service'
import { GetGrammarArticleHandler } from 'features/grammarConcept/GetGrammarArticle.command'
import { SyncMdxGrammarConceptsHandler } from 'features/grammarConcept/SyncMdxGrammarConcepts.command'
import { DeepSeekService } from 'infrastructure/deepSeek/deepSeek.service'
import { GoogleGeminiService } from 'infrastructure/googleGemini/googleGemini.service'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { OpenAIService } from 'infrastructure/openAI/openAI.service'
import { GrammarConceptResolver } from './grammarConcept.resolver'

const commandHandlers = [FetchGrammarConceptsHandler, SyncMdxGrammarConceptsHandler, GetGrammarArticleHandler]

@Module({
	imports: [CqrsModule],
	providers: [
		PrismaService,
		GrammarConceptRepository,
		GrammarConceptQueryRepository,
		UniversalPhraseRepository,
		GrammarExtractionService,
		OpenAIService,
		GoogleGeminiService,
		DeepSeekService,
		MainConfigService,
		CheckSessionCookieGuard,
		UserRepository,
		GrammarConceptResolver,
		...commandHandlers,
	],
})
export class GrammarConceptModule {}
