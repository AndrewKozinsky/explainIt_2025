import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { CreatePrivateBookInput } from 'routes/bookPrivate/inputs/createPrivateBook.input'
import { DeletePrivateBookInput } from 'routes/bookPrivate/inputs/deletePrivateBook.input'
import { GetPrivateBookInput } from 'routes/bookPrivate/inputs/getPrivateBook.input'
import { UpdatePrivateBookInput } from 'routes/bookPrivate/inputs/updatePrivateBook.input'
import { CreateBookWithEmptyChapterCommand } from 'features/bookPrivate/CreateBookWithEmptyChapter.command'
import { DeleteBookCommand } from 'features/bookPrivate/DeleteBook.command'
import { GetBookCommand } from 'features/bookPrivate/GetBook.command'
import { GetUserBooksCommand } from 'features/bookPrivate/GetUserBooks.command'
import { UpdateBookCommand } from 'features/bookPrivate/UpdateBook.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { BookPrivateOutModel } from 'models/book/book.out.model'
import { bookResolversDesc } from './resolverDescriptions'

@Resolver()
export class BookResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => BookPrivateOutModel, {
		name: RouteNames.BOOK_PRIVATE.CREATE,
		description: bookResolversDesc.createBookPrivate,
	})
	async createBookPrivate(@Args('input') input: CreatePrivateBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreateBookWithEmptyChapterCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => [BookPrivateOutModel], {
		name: RouteNames.BOOK_PRIVATE.GET_USER_BOOKS,
		description: bookResolversDesc.getUserBooks,
	})
	async getUserBooks(@Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetUserBooksCommand(userId))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => BookPrivateOutModel, {
		name: RouteNames.BOOK_PRIVATE.GET,
		description: bookResolversDesc.getBook,
	})
	async getBook(@Args('input') input: GetPrivateBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetBookCommand(userId, input.id))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => BookPrivateOutModel, {
		name: RouteNames.BOOK_PRIVATE.UPDATE,
		description: bookResolversDesc.updateBook,
	})
	async updateBook(@Args('input') input: UpdatePrivateBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdateBookCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => Boolean, {
		name: RouteNames.BOOK_PRIVATE.DELETE,
		description: bookResolversDesc.deleteBook,
	})
	async deleteBook(@Args('input') input: DeletePrivateBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new DeleteBookCommand(userId, input))
	}
}
