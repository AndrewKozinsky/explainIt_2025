import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateBookWithEmptyChapterCommand } from 'features/book/CreateBookWithEmptyChapter.command'
import { DeleteBookCommand } from 'features/book/DeleteBook.command'
import { GetUserBooksCommand } from 'features/book/GetUserBooks.command'
import { UpdateBookCommand } from 'features/book/UpdateBook.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { BookOutModel } from 'models/book/book.out.model'
import { CreateBookInput } from './inputs/createBook.input'
import { DeleteBookInput } from './inputs/deleteBook.input'
import { UpdateBookInput } from './inputs/updateBook.input'
import { bookResolversDesc } from './resolverDescriptions'
import { Request } from 'express'
import { GetBookInput } from './inputs/getBook.input'
import { GetBookCommand } from 'src/features/book/GetBook.command'

@Resolver()
export class BookResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => BookOutModel, {
		name: RouteNames.BOOK.CREATE,
		description: bookResolversDesc.createBookPrivate,
	})
	async createBookPrivate(@Args('input') input: CreateBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreateBookWithEmptyChapterCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => [BookOutModel], {
		name: RouteNames.BOOK.GET_USER_BOOKS,
		description: bookResolversDesc.getUserBooks,
	})
	async getUserBooks(@Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetUserBooksCommand(userId))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => BookOutModel, {
		name: RouteNames.BOOK.GET,
		description: bookResolversDesc.getBook,
	})
	async getBook(@Args('input') input: GetBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetBookCommand(userId, input.id))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => BookOutModel, {
		name: RouteNames.BOOK.UPDATE,
		description: bookResolversDesc.updateBook,
	})
	async updateBook(@Args('input') input: UpdateBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdateBookCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => Boolean, {
		name: RouteNames.BOOK.DELETE,
		description: bookResolversDesc.deleteBook,
	})
	async deleteBook(@Args('input') input: DeleteBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new DeleteBookCommand(userId, input))
	}
}
