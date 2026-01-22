import { CommandBus } from '@nestjs/cqrs'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CheckTranslationByAiCommand } from 'features/ai/checkTranslationByAI.command'
import { GetTranscriptionByAiCommand } from 'features/ai/getTranscriptionByAI.command'
import RouteNames from 'infrastructure/routeNames'
import { CheckTranslationOutModel } from 'models/ai/checkTranslation.out.model'
import { GetTranscriptionOutModel } from 'models/ai/getTranscription.out.model'
import { CheckTranslationInput } from './inputs/checkTranslation.input'
import { GetTranscriptionInput } from './inputs/getTranscription.input'

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
}
