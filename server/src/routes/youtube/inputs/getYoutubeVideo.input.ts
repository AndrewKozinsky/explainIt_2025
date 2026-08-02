import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class GetYoutubeVideoInput {
	@DtoFieldDecorators('videoId', {
		type: 'string',
		required: true,
		minLength: 1,
		maxLength: 100,
		description: 'YouTube video ID',
		example: 'dQw4w9WgXcQ',
	})
	videoId: string
}
