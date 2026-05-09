import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, Min } from 'class-validator'

@InputType()
export class GenerateSubtitlesForPrivateVideoInput {
	@Field(() => Int, { description: 'Id of the private video to generate subtitles for' })
	@IsInt()
	@Min(1)
	videoId: number
}
