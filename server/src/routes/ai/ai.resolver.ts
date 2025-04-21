import { CommandBus } from '@nestjs/cqrs'
import { Query, Resolver } from '@nestjs/graphql'
import RouteNames from '../../infrastructure/routeNames'
import { CheckTranslationOutModel } from '../../models/ai/checkTranslation.out.model'

@Resolver()
export class AiResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => CheckTranslationOutModel, {
		name: RouteNames.AI.CHECK_TRANSLATION,
	})
	async getMyParcelBoxes() {
		return {
			correct: false,
			analysis: 'My analysis',
		}
	}
}
