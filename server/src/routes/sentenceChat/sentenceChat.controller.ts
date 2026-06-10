import { Controller, MessageEvent, Param, ParseIntPipe, Query, Req, Sse, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { StreamSentenceChatAssistantCommand } from 'features/sentenceChat/StreamSentenceChatAssistant.command'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'

@Controller()
export class SentenceChatController {
	constructor(private streamSentenceChatAssistantCommand: StreamSentenceChatAssistantCommand) {}

	@UseGuards(CheckSessionCookieGuard)
	@Sse(RouteNames.SENTENCE_CHAT.STREAM_ASSISTANT_REPLY)
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
