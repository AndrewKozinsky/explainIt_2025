import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VideoPrivateSentenceOutModel {
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
export class VideoPrivateSubtitleOutModel {
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

@ObjectType()
export class SubtitleSentenceInitOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	subtitleId: number

	@Field(() => Int)
	sentenceId: number

	@Field(() => Int)
	startOffset: number

	@Field(() => Int)
	length: number
}

@ObjectType()
export class VideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	userId: number

	@Field(() => String, { nullable: true })
	name: string | null

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

	@Field(() => Boolean)
	isFileUploaded: boolean

	@Field(() => Int)
	fileSizeMb: number

	@Field(() => [VideoPrivateSentenceOutModel], { nullable: true })
	sentences: VideoPrivateSentenceOutModel[] | null

	@Field(() => [VideoPrivateSubtitleOutModel], { nullable: true })
	subtitles: VideoPrivateSubtitleOutModel[] | null

	@Field(() => [SubtitleSentenceInitOutModel], { nullable: true })
	subtitleSentenceInit: SubtitleSentenceInitOutModel[] | null
}

@ObjectType()
export class SentenceTranslationLiteOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	translation: string
}
