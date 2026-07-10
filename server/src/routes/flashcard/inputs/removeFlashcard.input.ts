import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class RemoveFlashcardInput {
	@DtoFieldDecorators('flashcardId', bdConfig.Flashcard.dbFields.id)
	flashcardId: number
}
