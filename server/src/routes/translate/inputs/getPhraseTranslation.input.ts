import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/enums'

export class GetPhraseTranslationInput {
	@DtoFieldDecorators('sentenceId', bdConfig.SentenceTranslation.dbFields.sentence_id)
	sentenceId: number

	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentencePhraseTranslation.dbFields.target_language_code)
	targetLanguageCode: LanguageCode

	@DtoFieldDecorators('selectedWordStartOffset', bdConfig.SentencePhraseTranslation.dbFields.phrase_start_offset)
	selectedWordStartOffset: number

	@DtoFieldDecorators('selectedWordEndOffset', bdConfig.SentencePhraseTranslation.dbFields.phrase_end_offset)
	selectedWordEndOffset: number
}
