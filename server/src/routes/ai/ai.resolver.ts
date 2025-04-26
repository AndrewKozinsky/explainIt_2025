import { CommandBus } from '@nestjs/cqrs'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CheckTranslationByAiCommand } from '../../features/ai/checkTranslationByAI.command'
import RouteNames from '../../infrastructure/routeNames'
import { CheckTranslationOutModel } from '../../models/ai/checkTranslation.out.model'
import { CheckTranslationInput } from './inputs/checkTranslation.input'

@Resolver()
export class AiResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => CheckTranslationOutModel, {
		name: RouteNames.AI.CHECK_TRANSLATION,
	})
	async checkTranslation(@Args('input') input: CheckTranslationInput) {
		return await this.commandBus.execute(new CheckTranslationByAiCommand(input))

		/*return {
			correct: false,
			analysis: 'My analysis',
		}*/
		/*return {
			error: 'There is some error when trying to check translation',
		}*/
	}
}
