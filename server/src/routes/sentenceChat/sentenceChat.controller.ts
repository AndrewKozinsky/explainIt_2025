import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	MessageEvent,
	Param,
	ParseIntPipe,
	Post,
	Query,
	Req,
	Sse,
	UseGuards,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { CreateSentenceChatThreadCommand } from 'features/sentenceChat/CreateSentenceChatThread.command'
import { CreateSentenceChatUserMessageCommand } from 'features/sentenceChat/CreateSentenceChatUserMessage.command'
import { GetSentenceChatThreadQuery } from 'features/sentenceChat/GetSentenceChatThread.query'
import { StreamSentenceChatAssistantCommand } from 'features/sentenceChat/StreamSentenceChatAssistant.command'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { SentenceChatMessageOutModel } from 'models/sentenceChat/sentenceChatMessage.out.model'
import { SentenceChatThreadOutModel } from 'models/sentenceChat/sentenceChatThread.out.model'
import { CreateSentenceChatThreadInput } from './inputs/createSentenceChatThread.input'
import { CreateSentenceChatUserMessageInput } from './inputs/createSentenceChatUserMessage.input'
import { GetSentenceChatThreadInput } from './inputs/getSentenceChatThread.input'
import { ApiGetThread, ApiCreateThread, ApiCreateUserMessage } from './openAPI.decorators'

@ApiTags('SentenceChat')
@Controller('sentence-chat')
export class SentenceChatController {
	constructor(
		private commandBus: CommandBus,
		private queryBus: QueryBus,
		private streamSentenceChatAssistantCommand: StreamSentenceChatAssistantCommand,
	) {}

	@ApiGetThread()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Get('threads')
	async getThread(
		@Query() input: GetSentenceChatThreadInput,
		@Req() request: Request,
	): Promise<null | SentenceChatThreadOutModel> {
		return this.queryBus.execute(
			new GetSentenceChatThreadQuery({
				userId: request.user!.id,
				sentenceId: input.sentenceId,
			}),
		)
	}

	@ApiCreateThread()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post('threads')
	async createThread(
		@Body() input: CreateSentenceChatThreadInput,
		@Req() request: Request,
	): Promise<SentenceChatThreadOutModel> {
		return this.commandBus.execute(
			new CreateSentenceChatThreadCommand({
				userId: request.user!.id,
				sentenceId: input.sentenceId,
			}),
		)
	}

	@ApiCreateUserMessage()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post('threads/:threadId/messages')
	async createUserMessage(
		@Param('threadId', ParseIntPipe) threadId: number,
		@Body() input: CreateSentenceChatUserMessageInput,
		@Req() request: Request,
	): Promise<SentenceChatMessageOutModel> {
		return this.commandBus.execute(
			new CreateSentenceChatUserMessageCommand({
				userId: request.user!.id,
				threadId,
				question: input.question,
			}),
		)
	}

	@UseGuards(CheckSessionCookieGuard)
	@Sse('threads/:threadId/assistant-stream')
	streamAssistantReply(
		@Param('threadId', ParseIntPipe) threadId: number,
		@Query('provider') provider: TranslationProviderName,
		@Req() request: Request,
	): Observable<MessageEvent> {
		return this.streamSentenceChatAssistantCommand.execute({
			userId: request.user!.id,
			threadId,
			provider: provider ?? 'gemini',
		})
	}
}
