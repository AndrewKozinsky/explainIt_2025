import { CommandBus } from '@nestjs/cqrs'
import { Query, Resolver } from '@nestjs/graphql'
import RouteNames from 'infrastructure/routeNames'
import { BookPublicOutModel } from 'models/bookPublic/bookPublic.out.model'
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
}
