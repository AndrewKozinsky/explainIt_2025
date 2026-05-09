import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class AddFlashcardInput {
	@Field(() => Int, { description: 'SentencePhraseTranslation id' })
	@DtoFieldDecorators('sentencePhraseTranslationId', bdConfig.SentencePhraseTranslation.dbFields.id)
	sentencePhraseTranslationId: number
}
