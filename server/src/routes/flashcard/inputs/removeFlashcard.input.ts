import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class RemoveFlashcardInput {
	@Field(() => Int, { description: 'Flashcard id' })
	@DtoFieldDecorators('flashcardId', bdConfig.Flashcard.dbFields.id)
	flashcardId: number
}
