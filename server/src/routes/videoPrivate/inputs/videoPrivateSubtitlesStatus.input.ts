import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, Min } from 'class-validator'

@InputType()
export class VideoPrivateSubtitlesStatusInput {
	@Field(() => Int, { description: 'Id of the private video to poll subtitles generation status for' })
	@IsInt()
	@Min(1)
	videoId: number
}
