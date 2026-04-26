import { UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { CreateSentenceChatThreadCommand } from 'features/sentenceChat/CreateSentenceChatThread.command'
import { CreateSentenceChatUserMessageCommand } from 'features/sentenceChat/CreateSentenceChatUserMessage.command'
import { GetSentenceChatThreadQuery } from 'features/sentenceChat/GetSentenceChatThread.query'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { UserWithPositiveBalanceGuard } from 'infrastructure/guards/userWithPositiveBalanceGuard.guard'
import RouteNames from 'infrastructure/routeNames'
import { SentenceChatMessageOutModel } from 'models/sentenceChat/sentenceChatMessage.out.model'
import { SentenceChatThreadOutModel } from 'models/sentenceChat/sentenceChatThread.out.model'
import { CreateSentenceChatThreadInput } from './inputs/createSentenceChatThread.input'
import { CreateSentenceChatUserMessageInput } from './inputs/createSentenceChatUserMessage.input'
import { GetSentenceChatThreadInput } from './inputs/getSentenceChatThread.input'
import { sentenceChatResolversDesc } from './resolverDescriptions'

@Resolver()
export class SentenceChatResolver {
	constructor(
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@UseGuards(CheckSessionCookieGuard)
	@Query(() => SentenceChatThreadOutModel, {
		name: RouteNames.SENTENCE_CHAT.GET_THREAD,
		description: sentenceChatResolversDesc.getSentenceChatThread,
		nullable: true,
	})
	async getSentenceChatThread(
		@Args('input') input: GetSentenceChatThreadInput,
		@Context('req') request: Request,
	): Promise<null | SentenceChatThreadOutModel> {
		return this.queryBus.execute(
			new GetSentenceChatThreadQuery({
				userId: request.user!.id,
				sentenceId: input.sentenceId,
			}),
		)
	}

	@UseGuards(CheckSessionCookieGuard, UserWithPositiveBalanceGuard)
	@Mutation(() => SentenceChatThreadOutModel, {
		name: RouteNames.SENTENCE_CHAT.CREATE_THREAD,
		description: sentenceChatResolversDesc.createSentenceChatThread,
	})
	async createSentenceChatThread(
		@Args('input') input: CreateSentenceChatThreadInput,
		@Context('req') request: Request,
	): Promise<SentenceChatThreadOutModel> {
		return this.commandBus.execute(
			new CreateSentenceChatThreadCommand({
				userId: request.user!.id,
				sentenceId: input.sentenceId,
			}),
		)
	}

	@UseGuards(CheckSessionCookieGuard, UserWithPositiveBalanceGuard)
	@Mutation(() => SentenceChatMessageOutModel, {
		name: RouteNames.SENTENCE_CHAT.CREATE_USER_MESSAGE,
		description: sentenceChatResolversDesc.createSentenceChatUserMessage,
	})
	async createSentenceChatUserMessage(
		@Args('input') input: CreateSentenceChatUserMessageInput,
		@Context('req') request: Request,
	): Promise<SentenceChatMessageOutModel> {
		return this.commandBus.execute(
			new CreateSentenceChatUserMessageCommand({
				userId: request.user!.id,
				threadId: input.threadId,
				question: input.question,
			}),
		)
	}
}
