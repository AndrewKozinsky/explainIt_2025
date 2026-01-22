import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { AnalysePhraseInput } from 'routes/bookChapter/inputs/analysePhrase.input'
import { DeleteBookChapterPhrasesInput } from 'routes/bookChapter/inputs/deleteBookChapterPhrasesInput'
import { TranslateSentencesInput } from 'routes/bookChapter/inputs/translateSentences.input'
import { AnalysePhraseCommand } from 'features/bookChapter/AnalysePhrase.command'
import { CreateBookChapterCommand } from 'features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterCommand } from 'features/bookChapter/DeleteBookChapter.command'
import { DeleteBookChapterPhrasesCommand } from 'features/bookChapter/DeleteBookChapterPhrases.command'
import { GetBookChapterCommand } from 'features/bookChapter/GetBookChapter.command'
import { TranslateSentencesCommand } from 'features/bookChapter/TranslateSentences.command'
import { UpdateBookChapterCommand } from 'features/bookChapter/UpdateBookChapter.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { UserWithPositiveBalanceGuard } from 'infrastructure/guards/userWithPositiveBalanceGuard.guard'
import RouteNames from 'infrastructure/routeNames'
import { BookChapterOutModel } from 'models/bookChapter/bookChapter.out.model'
import { BookChapterPhraseOutModel } from 'models/bookChapterPhrase/bookChapterPhrase.out.model'
import { BookChapterTranslateOfSentencesOutModel } from 'models/bookChapterPhrase/bookChapterTranslateOfSentences.out.model'
import { CreateBookChapterInput } from './inputs/createBookChapter.input'
import { DeleteBookChapterInput } from './inputs/deleteBookChapter.input'
import { GetBookChapterInput } from './inputs/getBookChapter.input'
import { UpdateBookChapterInput } from './inputs/updateBookChapter.input'
import { bookChapterResolversDesc } from './resolverDescriptions'

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

	@Query(() => BookChapterOutModel, {
		name: RouteNames.BOOK_CHAPTER.GET,
		description: bookChapterResolversDesc.getBookChapter,
	})
	async getBookChapter(@Args('input') input: GetBookChapterInput, @Context('req') request: Request) {
		const userId = request.session.userId
		return await this.commandBus.execute(new GetBookChapterCommand(input, userId))
	}

	@UseGuards(CheckSessionCookieGuard, UserWithPositiveBalanceGuard)
	@Mutation(() => BookChapterPhraseOutModel, {
		name: RouteNames.BOOK_CHAPTER.ANALYSE_PHRASE,
	})
	async analysePhrase(@Args('input') input: AnalysePhraseInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new AnalysePhraseCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard, UserWithPositiveBalanceGuard)
	@Mutation(() => BookChapterTranslateOfSentencesOutModel, {
		name: RouteNames.BOOK_CHAPTER.TRANSLATE_SENTENCES,
	})
	async translateSentences(@Args('input') input: TranslateSentencesInput, @Context('req') request: Request) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new TranslateSentencesCommand(userId, input))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => Boolean, {
		name: RouteNames.BOOK_CHAPTER.DELETE_BOOK_CHAPTER_PHRASES,
	})
	async deleteBookChapterPhrases(
		@Args('input') input: DeleteBookChapterPhrasesInput,
		@Context('req') request: Request,
	) {
		const userId = request.session.userId!
		return await this.commandBus.execute(
			new DeleteBookChapterPhrasesCommand({ userId, bookChapterId: input.bookChapterId }),
		)
	}
}
