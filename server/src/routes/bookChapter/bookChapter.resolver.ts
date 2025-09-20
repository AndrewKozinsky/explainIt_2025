import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateBookChapterCommand } from 'features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterCommand } from '../../features/bookChapter/DeleteBookChapter.command'
import { UpdateBookChapterCommand } from '../../features/bookChapter/UpdateBookChapter.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { BookChapterOutModel } from '../../models/bookChapter/bookChapter.out.model'
import { CreateBookChapterInput } from './inputs/createBookChapter.input'
import { DeleteBookChapterInput } from './inputs/deleteBookChapter.input'
import { GetBookChapterInput } from './inputs/getBookChapter.input'
import { UpdateBookChapterInput } from './inputs/updateBookChapter.input'
import { bookChapterResolversDesc } from './resolverDescriptions'
import { Request } from 'express'
import { GetBookChapterCommand } from '../../features/bookChapter/GetBookChapter.command'

@Resolver()
export class BookChapterResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => BookChapterOutModel, {
		name: RouteNames.BOOK_CHAPTER.CREATE,
		description: bookChapterResolversDesc.createBookChapter,
	})
	async createBookChapter(@Args('input') input: CreateBookChapterInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreateBookChapterCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => BookChapterOutModel, {
		name: RouteNames.BOOK_CHAPTER.UPDATE,
		description: bookChapterResolversDesc.updateBookChapter,
	})
	async updateBookChapter(@Args('input') input: UpdateBookChapterInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new UpdateBookChapterCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => Boolean, {
		name: RouteNames.BOOK_CHAPTER.DELETE,
		description: bookChapterResolversDesc.deleteBookChapter,
	})
	async deleteBookChapter(@Args('input') input: DeleteBookChapterInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new DeleteBookChapterCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => BookChapterOutModel, {
		name: RouteNames.BOOK_CHAPTER.GET,
		description: bookChapterResolversDesc.getBookChapter,
	})
	async getBookChapter(@Args('input') input: GetBookChapterInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetBookChapterCommand(userId, input))
	}
}
