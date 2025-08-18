import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { CreateBookCommand } from '../../features/book/CreateBook.command'
import { CheckSessionCookieGuard } from '../../infrastructure/guards/checkSessionCookie.guard'
import RouteNames from '../../infrastructure/routeNames'
import { BookOutModel } from '../../models/book/book.out.model'
import { CreateBookInput } from './inputs/createBook.input'
import { bookResolversDesc } from './resolverDescriptions'
import { Request } from 'express'

@Resolver()
export class BookResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => BookOutModel, {
		name: RouteNames.BOOK.CREATE,
		description: bookResolversDesc.createBook,
	})
	async createBook(@Args('input') input: CreateBookInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new CreateBookCommand(userId, input))
	}
}
