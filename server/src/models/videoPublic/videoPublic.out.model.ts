import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
	SentenceTranslationLiteOutModel,
	SubtitleSentenceInitOutModel,
} from 'models/videoPrivate/videoPrivateOut.model'

@ObjectType()
export class VideoPublicOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => Int, { nullable: true })
	year: number | null

	@Field(() => String)
	languageCode: string

	@Field(() => String, { nullable: true })
	note: string | null

	@Field(() => [String])
	covers: string[]

	@Field(() => String)
	originalContent: string

	@Field(() => String)
	processedContent: string

	@Field(() => String)
	contentType: 'text' | 'subtitles'

	@Field(() => String)
	fileName: string

	@Field(() => String)
	fileS3Key: string

	@Field(() => String)
	fileUrl: string

	@Field(() => Boolean)
	freeToUse: boolean

	@Field(() => [VideoPublicSentenceOutModel], { nullable: true })
	sentences: VideoPublicSentenceOutModel[] | null

	@Field(() => [VideoPublicSubtitleOutModel], { nullable: true })
	subtitles: VideoPublicSubtitleOutModel[] | null

	@Field(() => [SubtitleSentenceInitOutModel], { nullable: true })
	subtitleSentenceInit: SubtitleSentenceInitOutModel[] | null
}

@ObjectType()
export class VideoPublicSentenceOutModel {
	@Field(() => Int)
	id: number

	@Field(() => [SentenceTranslationLiteOutModel], { nullable: true })
	sentenceTranslations: SentenceTranslationLiteOutModel[] | null

	@Field(() => Int)
	startOffset: number

	@Field(() => Int)
	length: number

	@Field(() => Int)
	orderIndex: number
}

@ObjectType()
export class VideoPublicSubtitleOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	startTimeMs: number

	@Field(() => Int)
	endTimeMs: number

	@Field(() => Int)
	startOffset: number

	@Field(() => Int)
	length: number

	@Field(() => Int)
	orderIndex: number
}
