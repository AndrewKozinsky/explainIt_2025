import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { GetSentenceTranslationCommand } from 'features/sentenceTranslation/GetSentenceTranslation.command'
import { GetSentenceTranslationsBySentenceIdCommand } from 'features/sentenceTranslation/GetSentenceTranslationsBySentenceId.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { SentenceTranslationOutModel } from 'models/sentenceTranslation/sentenceTranslation.out.model'
import { GetSentenceTranslationInput } from './inputs/getSentenceTranslation.input'
import { GetSentenceTranslationsBySentenceIdInput } from './inputs/getSentenceTranslationsBySentenceId.input'
import { sentenceTranslationResolversDesc } from './resolverDescriptions'

@Resolver()
export class SentenceTranslationResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => SentenceTranslationOutModel, {
		name: RouteNames.SENTENCE_TRANSLATION.GET,
		description: sentenceTranslationResolversDesc.getSentenceTranslation,
	})
	async getSentenceTranslation(@Args('input') input: GetSentenceTranslationInput, @Context('req') request: Request) {
		console.log('------')
		console.log(input.id)
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetSentenceTranslationCommand(userId, input.id))
	}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => [SentenceTranslationOutModel], {
		name: RouteNames.SENTENCE_TRANSLATION.GET_BY_SENTENCE_ID,
		description: sentenceTranslationResolversDesc.getSentenceTranslationsBySentenceId,
	})
	async getSentenceTranslationsBySentenceId(
		@Args('input') input: GetSentenceTranslationsBySentenceIdInput,
		@Context('req') request: Request,
	) {
		console.log('=====')
		console.log(input.sentenceId)

		const userId = request.session.userId!
		return await this.commandBus.execute(new GetSentenceTranslationsBySentenceIdCommand(userId, input.sentenceId))
	}
}
