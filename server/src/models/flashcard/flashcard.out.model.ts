import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { SentencePhraseTranslationExampleOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'

const $ = bdConfig.Flashcard.dbFields
const $$ = bdConfig.Flashcard.dtoProps

export class FlashcardOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.language_code))
	languageCode: string

	@ApiProperty(getApiPropertyOptions($.sentence_text))
	sentenceText: string

	@ApiProperty(getApiPropertyOptions($.sentence_translation))
	sentenceTranslation: null | string

	@ApiProperty(getApiPropertyOptions($.phrase))
	phrase: string

	@ApiProperty(getApiPropertyOptions($.phrase_start_offset))
	phraseStartOffset: number

	@ApiProperty(getApiPropertyOptions($.phrase_end_offset))
	phraseEndOffset: number

	@ApiProperty(getApiPropertyOptions($.phrase_translation))
	phraseTranslation: null | string

	@ApiProperty(getApiPropertyOptions($$.phraseTranscription))
	phraseTranscription: null | string

	@ApiProperty({ description: 'Phrase usage examples', type: [SentencePhraseTranslationExampleOutModel] })
	examples: SentencePhraseTranslationExampleOutModel[]

	@ApiProperty({ description: 'Book ID (source)', type: Number, nullable: true })
	bookId: null | number

	@ApiProperty({ description: 'Private video ID (source)', type: Number, nullable: true })
	videoId: null | number

	@ApiProperty({ description: 'Public video ID (source)', type: Number, nullable: true })

	@ApiProperty({ description: 'Source phrase translation ID', type: Number, nullable: true })
	sentencePhraseTranslationId: null | number

	@ApiProperty(getApiPropertyOptions($.created_at))
	createdAt: string
}
