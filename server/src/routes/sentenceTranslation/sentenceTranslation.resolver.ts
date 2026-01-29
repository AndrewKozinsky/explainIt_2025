import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { GetSentenceTranslationCommand } from 'features/sentenceTranslation/GetSentenceTranslation.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { SentenceTranslationOutModel } from 'models/sentenceTranslation/sentenceTranslation.out.model'
import { GetSentenceTranslationInput } from './inputs/getSentenceTranslation.input'
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
		const userId = request.session.userId!
		return await this.commandBus.execute(new GetSentenceTranslationCommand(userId, input.id))
	}
}
