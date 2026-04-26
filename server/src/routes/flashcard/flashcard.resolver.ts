import { UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { AddFlashcardCommand } from 'features/flashcard/AddFlashcard.command'
import { GetMyFlashcardsQuery } from 'features/flashcard/GetMyFlashcards.query'
import { RemoveFlashcardCommand } from 'features/flashcard/RemoveFlashcard.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { FlashcardOutModel } from 'models/flashcard/flashcard.out.model'
import { AddFlashcardInput } from './inputs/addFlashcard.input'
import { GetMyFlashcardsInput } from './inputs/getMyFlashcards.input'
import { RemoveFlashcardInput } from './inputs/removeFlashcard.input'
import { flashcardResolversDesc } from './resolverDescriptions'

@Resolver()
export class FlashcardResolver {
	constructor(
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => [FlashcardOutModel], {
		name: RouteNames.FLASHCARD.GET_MY,
		description: flashcardResolversDesc.getMyFlashcards,
	})
	async getMyFlashcards(
		@Args('input') input: GetMyFlashcardsInput,
		@Context('req') request: Request,
	): Promise<FlashcardOutModel[]> {
		return this.queryBus.execute(
			new GetMyFlashcardsQuery({
				userId: request.user!.id,
				languageCode: input.languageCode,
			}),
		)
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => FlashcardOutModel, {
		name: RouteNames.FLASHCARD.ADD,
		description: flashcardResolversDesc.addFlashcard,
	})
	async addFlashcard(
		@Args('input') input: AddFlashcardInput,
		@Context('req') request: Request,
	): Promise<FlashcardOutModel> {
		return this.commandBus.execute(
			new AddFlashcardCommand({
				userId: request.user!.id,
				sentencePhraseTranslationId: input.sentencePhraseTranslationId,
			}),
		)
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => Boolean, {
		name: RouteNames.FLASHCARD.REMOVE,
		description: flashcardResolversDesc.removeFlashcard,
	})
	async removeFlashcard(
		@Args('input') input: RemoveFlashcardInput,
		@Context('req') request: Request,
	): Promise<boolean> {
		return this.commandBus.execute(
			new RemoveFlashcardCommand({
				userId: request.user!.id,
				flashcardId: input.flashcardId,
			}),
		)
	}
}
