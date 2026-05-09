import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { SubtitlesGenerationStatus } from 'prisma/generated/client'

registerEnumType(SubtitlesGenerationStatus, {
	name: 'SubtitlesGenerationStatus',
	description: 'Lifecycle status of automatic subtitles generation for a private video',
})

@ObjectType()
export class VideoPrivateSubtitlesStatusOutModel {
	@Field(() => Int)
	videoId: number

	@Field(() => SubtitlesGenerationStatus)
	status: SubtitlesGenerationStatus

	@Field(() => String, { nullable: true })
	error: null | string

	@Field(() => String, { nullable: true, description: 'ISO 8601 timestamp when current generation job started' })
	startedAt: null | string

	@Field(() => String, { nullable: true })
	jobId: null | string
}
