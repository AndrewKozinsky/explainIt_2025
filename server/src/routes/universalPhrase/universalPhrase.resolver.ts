import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUniversalPhraseInput } from 'routes/universalPhrase/inputs/createUniversalPhrase.input'
import { GetUniversalPhraseInput } from 'routes/universalPhrase/inputs/getUniversalPhrase.input'
import { CreateUniversalPhraseCommand } from 'features/universalPhrase/CreateUniversalPhrase.command'
import { GetUniversalPhraseCommand } from 'features/universalPhrase/GetUniversalPhrase.command'
import RouteNames from 'infrastructure/routeNames'
import { UniversalPhraseOutModel } from 'models/universalPhrase/universalPhrase.out.model'
import { universalPhraseResolversDesc } from './resolverDescriptions'

@Resolver()
export class UniversalPhraseResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => UniversalPhraseOutModel, {
		name: RouteNames.UNIVERSAL_PHRASE.GET,
		description: universalPhraseResolversDesc.getUniversalPhrase,
	})
	async getUniversalPhrase(@Args('input') input: GetUniversalPhraseInput) {
		return await this.commandBus.execute(new GetUniversalPhraseCommand(input.phrase, input.languageCode))
	}

	@Mutation(() => UniversalPhraseOutModel, {
		name: RouteNames.UNIVERSAL_PHRASE.CREATE,
		description: universalPhraseResolversDesc.createUniversalPhrase,
	})
	async createUniversalPhrase(@Args('input') input: CreateUniversalPhraseInput) {
		return await this.commandBus.execute(new CreateUniversalPhraseCommand(input))
	}
}
