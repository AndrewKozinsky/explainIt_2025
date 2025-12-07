import { CommandBus } from '@nestjs/cqrs'
import { Args, Query, Resolver } from '@nestjs/graphql'
import RouteNames from 'infrastructure/routeNames'
import { BookPublicOutModel } from 'models/bookPublic/bookPublic.out.model'
import { GetBookPublicCommand } from 'src/features/bookPublic/GetBookPublic.command'
import { GetBookPublicInput } from 'src/routes/bookPublic/inputs/getBookPublic.input'
import { bookResolversDesc } from './resolverDescriptions'
import { GetBooksPublicCommand } from 'src/features/bookPublic/GetBooksPublic.command'

@Resolver()
export class BookPublicResolver {
	constructor(private commandBus: CommandBus) {}

	@Query(() => [BookPublicOutModel], {
		name: RouteNames.BOOK_PUBLIC.GET_BOOKS,
		description: bookResolversDesc.getBooks,
	})
	async getBooks() {
		return await this.commandBus.execute(new GetBooksPublicCommand())
	}

	@Query(() => BookPublicOutModel, {
		name: RouteNames.BOOK_PUBLIC.GET_BOOK,
		description: bookResolversDesc.getBook,
	})
	async getBook(@Args('input') input: GetBookPublicInput) {
		return await this.commandBus.execute(new GetBookPublicCommand(input.id))
	}
}
