import { CommandBus } from '@nestjs/cqrs'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GetTranscriptionByAiCommand } from 'features/ai/getTranscriptionByAI.command'
import RouteNames from 'infrastructure/routeNames'
import { CheckTranslationOutModel } from 'models/ai/checkTranslation.out.model'
import { GetTranscriptionOutModel } from 'models/ai/getTranscription.out.model'
import { SentenceAndPhraseAnalysesOutModel } from 'models/ai/sentenceAndPhraseAnalyses.out.model'
import { GetSentenceAndPhraseAnalysesInput } from 'src/routes/ai/inputs/getSentenceAndPhraseAnalyses.input'
import { CheckTranslationInput } from './inputs/checkTranslation.input'
import { GetTranscriptionInput } from './inputs/getTranscription.input'
import { CheckTranslationByAiCommand } from 'features/ai/checkTranslationByAI.command'

@Resolver()
export class AiResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => CheckTranslationOutModel, {
		name: RouteNames.AI.CHECK_TRANSLATION,
	})
	async checkTranslation(@Args('input') input: CheckTranslationInput) {
		return await this.commandBus.execute(new CheckTranslationByAiCommand(input))
	}

	@Query(() => GetTranscriptionOutModel, {
		name: RouteNames.AI.GET_TRANSCRIPTION,
	})
	async getTranscription(@Args('input') input: GetTranscriptionInput) {
		return await this.commandBus.execute(new GetTranscriptionByAiCommand(input))
	}

	@Query(() => SentenceAndPhraseAnalysesOutModel, {
		name: RouteNames.AI.GET_SENTENCE_AND_PHRASE_ANALYSES,
	})
	async analyseSentenceAndPhrase(@Args('input') input: GetSentenceAndPhraseAnalysesInput) {
		// return await this.commandBus.execute(new GetTranscriptionByAiCommand(input))
	}
}
