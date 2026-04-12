import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetPhraseTranslationInput {
	@Field(() => Number, { description: 'Sentence id' })
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@Field(() => Number, { description: 'Selected word start offset in sentence' })
	@DtoFieldDecorators('selectedWordStartOffset', bdConfig.SentencePhraseTranslation.dbFields.phrase_start_offset)
	selectedWordStartOffset: number

	@Field(() => Number, { description: 'Selected word end offset in sentence (end-exclusive)' })
	@DtoFieldDecorators('selectedWordEndOffset', bdConfig.SentencePhraseTranslation.dbFields.phrase_end_offset)
	selectedWordEndOffset: number
}
