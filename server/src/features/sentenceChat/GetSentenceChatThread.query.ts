import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { SentenceChatThreadQueryRepository } from 'repo/sentenceChatThread.queryRepository'
import { SentenceChatThreadOutModel } from 'models/sentenceChat/sentenceChatThread.out.model'

export class GetSentenceChatThreadQuery implements IQuery {
	constructor(
		public dto: {
			userId: number
			sentenceId: number
		},
	) {}
}

// Чистое чтение: возвращает тред с сообщениями либо null, если его нет.
// Если указан несуществующий sentenceId, также возвращается null (отдельно проверять
// существование предложения не нужно — запрос идемпотентный и безопасный).
// Создание треда — отдельная мутация CreateSentenceChatThreadCommand.
@QueryHandler(GetSentenceChatThreadQuery)
export class GetSentenceChatThreadHandler implements IQueryHandler<
	GetSentenceChatThreadQuery,
	null | SentenceChatThreadOutModel
> {
	constructor(private sentenceChatThreadQueryRepository: SentenceChatThreadQueryRepository) {}

	async execute(query: GetSentenceChatThreadQuery): Promise<null | SentenceChatThreadOutModel> {
		return this.sentenceChatThreadQueryRepository.getThreadWithMessagesByUserAndSentence({
			userId: query.dto.userId,
			sentenceId: query.dto.sentenceId,
		})
	}
}
