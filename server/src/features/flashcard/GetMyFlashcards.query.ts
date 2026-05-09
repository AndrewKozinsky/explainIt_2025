import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FlashcardQueryRepository } from 'repo/flashcard.queryRepository'
import { FlashcardOutModel } from 'models/flashcard/flashcard.out.model'
import { LanguageCode } from 'prisma/generated/client'

export class GetMyFlashcardsQuery implements IQuery {
	constructor(
		public dto: {
			userId: number
			languageCode?: LanguageCode
		},
	) {}
}

@QueryHandler(GetMyFlashcardsQuery)
export class GetMyFlashcardsHandler implements IQueryHandler<GetMyFlashcardsQuery, FlashcardOutModel[]> {
	constructor(private flashcardQueryRepository: FlashcardQueryRepository) {}

	async execute(query: GetMyFlashcardsQuery): Promise<FlashcardOutModel[]> {
		return this.flashcardQueryRepository.getMyFlashcards({
			userId: query.dto.userId,
			languageCode: query.dto.languageCode,
		})
	}
}
