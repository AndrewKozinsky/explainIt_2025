import { CommandBus } from '@nestjs/cqrs'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class AuthResolver {
	constructor(private commandBus: CommandBus) {}

	/*@Query(() => CheckTranslationOutModel, {
		name: RouteNames.AI.CHECK_TRANSLATION,
	})
	async checkTranslation(@Args('input') input: CheckTranslationInput) {
		return await this.commandBus.execute(new CheckTranslationByAiCommand(input))
	}*/
}
