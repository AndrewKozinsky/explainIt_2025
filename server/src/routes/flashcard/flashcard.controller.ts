import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { AddFlashcardCommand } from 'features/flashcard/AddFlashcard.command'
import { GetMyFlashcardsQuery } from 'features/flashcard/GetMyFlashcards.query'
import { RemoveFlashcardCommand } from 'features/flashcard/RemoveFlashcard.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { FlashcardOutModel } from 'models/flashcard/flashcard.out.model'
import { AddFlashcardInput } from './inputs/addFlashcard.input'
import { GetMyFlashcardsInput } from './inputs/getMyFlashcards.input'
import { RemoveFlashcardInput } from './inputs/removeFlashcard.input'
import { ApiGetMyFlashcards, ApiAddFlashcard, ApiRemoveFlashcard } from './openAPI.decorators'

@ApiTags('Flashcard')
@Controller('flashcard')
export class FlashcardController {
	constructor(
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@ApiGetMyFlashcards()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get()
	async getMyFlashcards(@Query() input: GetMyFlashcardsInput, @Req() request: Request): Promise<FlashcardOutModel[]> {
		return this.queryBus.execute(
			new GetMyFlashcardsQuery({
				userId: request.user!.id,
				languageCode: input.languageCode,
			}),
		)
	}

	@ApiAddFlashcard()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async addFlashcard(@Body() input: AddFlashcardInput, @Req() request: Request): Promise<FlashcardOutModel> {
		return this.commandBus.execute(
			new AddFlashcardCommand({
				userId: request.user!.id,
				sentencePhraseTranslationId: input.sentencePhraseTranslationId,
			}),
		)
	}

	@ApiRemoveFlashcard()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Delete()
	async removeFlashcard(@Body() input: RemoveFlashcardInput, @Req() request: Request): Promise<boolean> {
		return this.commandBus.execute(
			new RemoveFlashcardCommand({
				userId: request.user!.id,
				flashcardId: input.flashcardId,
			}),
		)
	}
}
