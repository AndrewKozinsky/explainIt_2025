import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GrammarConceptQueryRepository } from 'repo/grammarConcept.queryRepository'
import { GrammarConceptRepository } from 'repo/grammarConcept.repository'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { FetchGrammarConceptsHandler } from 'features/grammarConcept/FetchGrammarConcepts.command'
import { GetGrammarArticleHandler } from 'features/grammarConcept/GetGrammarArticle.command'
import { GetGrammarConceptsListHandler } from 'features/grammarConcept/GetGrammarConceptsList.command'
import { GrammarExtractionService } from 'features/grammarConcept/grammarExtraction.service'
import { SyncMdxGrammarConceptsHandler } from 'features/grammarConcept/SyncMdxGrammarConcepts.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { GrammarConceptResolver } from './grammarConcept.resolver'

const commandHandlers = [
	FetchGrammarConceptsHandler,
	SyncMdxGrammarConceptsHandler,
	GetGrammarArticleHandler,
	GetGrammarConceptsListHandler,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	providers: [
		PrismaService,
		GrammarConceptRepository,
		GrammarConceptQueryRepository,
		UniversalPhraseRepository,
		GrammarExtractionService,
		MainConfigService,
		CheckSessionCookieGuard,
		UserRepository,
		GrammarConceptResolver,
		...commandHandlers,
	],
})
export class GrammarConceptModule {}
