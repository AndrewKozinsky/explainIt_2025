import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateWordInput } from 'routes/word/inputs/createWord.input'
import { GetWordInput } from 'routes/word/inputs/getWord.input'
import { CreateWordCommand } from 'features/word/CreateWord.command'
import { GetWordCommand } from 'features/word/GetWord.command'
import RouteNames from 'infrastructure/routeNames'
import { WordOutModel } from 'models/word/word.out.model'
import { wordResolversDesc } from './resolverDescriptions'

@Resolver()
export class WordResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => WordOutModel, {
		name: RouteNames.WORD.GET,
		description: wordResolversDesc.getWord,
	})
	async getWord(@Args('input') input: GetWordInput) {
		return await this.commandBus.execute(new GetWordCommand(input.word))
	}

	@Mutation(() => WordOutModel, {
		name: RouteNames.WORD.CREATE,
		description: wordResolversDesc.createWord,
	})
	async createWord(@Args('input') input: CreateWordInput) {
		return await this.commandBus.execute(new CreateWordCommand(input))
	}
}
