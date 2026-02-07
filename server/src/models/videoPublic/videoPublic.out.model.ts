import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
	SentenceTranslationLiteOutModel,
	SubtitleSentenceInitOutModel,
} from 'models/videoPrivate/videoPrivateOut.model'

// TODO: fileName, fileS3Key, fileUrl, originalContent, processedContent are always have value!
@ObjectType()
export class VideoPublicOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => Int, { nullable: true })
	year: number | null

	@Field(() => String)
	languageCode: string

	@Field(() => String, { nullable: true })
	originalContent: string | null

	@Field(() => String, { nullable: true })
	processedContent: string | null

	@Field(() => String)
	contentType: 'text' | 'subtitles'

	@Field(() => String, { nullable: true })
	fileName: string | null

	@Field(() => String, { nullable: true })
	fileS3Key: string | null

	@Field(() => String, { nullable: true })
	fileUrl: string | null

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
