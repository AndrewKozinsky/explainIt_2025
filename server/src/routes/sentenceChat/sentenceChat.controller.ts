import { Controller, MessageEvent, Param, ParseIntPipe, Req, Sse, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { StreamSentenceChatAssistantCommand } from 'features/sentenceChat/StreamSentenceChatAssistant.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'

@Controller()
export class SentenceChatController {
	constructor(private streamSentenceChatAssistantCommand: StreamSentenceChatAssistantCommand) {}

	@UseGuards(CheckSessionCookieGuard)
	@Sse(RouteNames.SENTENCE_CHAT.STREAM_ASSISTANT_REPLY)
	streamAssistantReply(
		@Param('threadId', ParseIntPipe) threadId: number,
		@Req() request: Request,
	): Observable<MessageEvent> {
		return this.streamSentenceChatAssistantCommand.execute({
			userId: request.user!.id,
			threadId,
		})
	}
}
