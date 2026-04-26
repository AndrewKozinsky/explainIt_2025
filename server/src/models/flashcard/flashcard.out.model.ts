import { Field, Int, ObjectType } from '@nestjs/graphql'
import { SentencePhraseTranslationExampleOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'

@ObjectType()
export class FlashcardOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	languageCode: string

	@Field(() => String)
	sentenceText: string

	@Field(() => String, { nullable: true })
	sentenceTranslation: null | string

	@Field(() => String)
	phrase: string

	@Field(() => Int)
	phraseStartOffset: number

	@Field(() => Int)
	phraseEndOffset: number

	@Field(() => String, { nullable: true })
	phraseTranslation: null | string

	@Field(() => String, { nullable: true })
	phraseTranscription: null | string

	@Field(() => [SentencePhraseTranslationExampleOutModel])
	examples: SentencePhraseTranslationExampleOutModel[]

	@Field(() => Int, { nullable: true })
	bookPrivateId: null | number

	@Field(() => Int, { nullable: true })
	bookPublicId: null | number

	@Field(() => Int, { nullable: true })
	videoPrivateId: null | number

	@Field(() => Int, { nullable: true })
	videoPublicId: null | number

	@Field(() => String)
	createdAt: string
}
