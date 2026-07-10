import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { VideoPublicOutModel } from 'models/videoPublic/videoPublic.out.model'
import { VideoPublicLiteOutModel } from 'models/videoPublic/videoPublicLite.out.model'

export function ApiGetVideosPublic() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get public videos',
			description: 'Returns all public videos.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: [VideoPublicLiteOutModel] }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiGetVideoPublic() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get public video',
			description: 'Returns a single public video by ID with full details including sentences and subtitles.',
		}),
		ApiParam({ name: 'id', type: Number, description: 'Video ID', example: 1 }),
		ApiResponse({ status: 200, description: 'OK', type: VideoPublicOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 404, description: errorMessage.video.notFound.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}
