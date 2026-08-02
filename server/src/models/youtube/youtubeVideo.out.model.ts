import { ApiProperty } from '@nestjs/swagger'

export class YoutubeVideoOutModel {
	@ApiProperty({ description: 'YouTube video ID', example: 'dQw4w9WgXcQ' })
	videoId: string

	@ApiProperty({ description: 'Video title', example: 'Full Movie 2025' })
	title: string

	@ApiProperty({ description: 'Channel name', example: 'MovieClips' })
	channelName: string

	@ApiProperty({
		description: 'Channel logo URL',
		example: 'https://yt3.ggpht.com/ytc/default.jpg',
		nullable: true,
	})
	channelLogoUrl: null | string

	@ApiProperty({ description: 'Video thumbnail URL', example: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' })
	thumbnailUrl: string

	@ApiProperty({ description: 'View count', example: 1542000 })
	viewCount: number

	@ApiProperty({ description: 'Video duration in ISO 8601 format', example: 'PT2M30S' })
	duration: string
}

export class YoutubeVideosOutModel {
	@ApiProperty({ description: 'List of YouTube videos', type: [YoutubeVideoOutModel] })
	videos: YoutubeVideoOutModel[]

	@ApiProperty({
		description: 'Token for the next page of results. null if there is no next page.',
		example: 'CAUQAA',
		nullable: true,
	})
	nextPageToken: null | string

	@ApiProperty({ description: 'Total number of search results', example: 1000000 })
	totalResults: number
}
