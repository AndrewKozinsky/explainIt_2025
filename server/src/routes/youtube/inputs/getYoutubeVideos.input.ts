import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class GetYoutubeVideosInput {
	@DtoFieldDecorators('query', {
		type: 'string',
		required: true,
		minLength: 1,
		maxLength: 200,
		description: 'Search query for YouTube videos',
		example: 'learn english',
	})
	query: string

	@DtoFieldDecorators('limit', {
		type: 'number',
		min: 1,
		max: 50,
		required: false,
		description: 'Maximum number of videos to return (1–50)',
		example: 20,
	})
	limit?: number

	@DtoFieldDecorators('pageToken', {
		type: 'string',
		required: false,
		description: 'Token for the next page of results (for pagination)',
		example: 'CAUQAA',
	})
	pageToken?: string
}
