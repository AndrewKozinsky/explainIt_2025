import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Language } from 'utils/languages'

@ObjectType()
export class WordOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	word: string

	@Field(() => String)
	languageCode: Language

	@Field(() => TranscriptionOutModel, { nullable: true })
	transcription: TranscriptionOutModel | null

	@Field(() => [AudioPronunciationOutModel])
	audioPronunciations: AudioPronunciationOutModel[]
}

@ObjectType()
export class TranscriptionOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	ipa: string | null

	@Field(() => String, { nullable: true })
	pinyin: string | null
}

@ObjectType()
export class AudioPronunciationOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	voiceId: number

	@Field(() => String)
	audioUrl: string

	@Field(() => Int)
	duration: number
}
