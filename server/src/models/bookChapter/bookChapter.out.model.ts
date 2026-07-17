import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { BookLiteOutModel } from '../book/book.out.model'
import { SentencePhraseTranslationOutModel } from '../sentenceTranslation/sentencePhraseTranslation.out.model'
import { SentenceTranslationOutModel } from '../sentenceTranslation/sentenceTranslation.out.model'

const $ = bdConfig.BookChapter.dbFields

export class BookChapterLiteOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty({ description: 'Book ID', example: 1 })
	bookId: number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions($.header))
	header: string | null

	@ApiProperty(getApiPropertyOptions($.note))
	note: string | null
}

export class SentenceOutModel {
	id: number

	startOffset: number

	length: number

	sentenceTranslation: SentenceTranslationOutModel | null

	sentencePhraseTranslations: SentencePhraseTranslationOutModel[] | null
}

export class BookChapterOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions($.header))
	header: string | null

	@ApiProperty(getApiPropertyOptions($.note))
	note: string | null

	@ApiProperty(getApiPropertyOptions($.original_content))
	originalContent: string | null

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: string | null

	@ApiProperty({ description: 'Sentences of the chapter', type: [SentenceOutModel], nullable: true })
	sentences: null | SentenceOutModel[]

	@ApiProperty({ description: 'Book that the chapter belongs to', type: () => BookLiteOutModel })
	book: BookLiteOutModel
}
