import { ApiProperty } from '@nestjs/swagger'
import { PaginatedOutModel } from 'models/pagination/paginated.out.model'
import { VideoLiteOutModel } from 'models/video/videoLite.out.model'

export class SavedYoutubeVideosPageOutModel extends PaginatedOutModel<VideoLiteOutModel> {
	@ApiProperty({ description: 'Saved YouTube videos on the current page', type: [VideoLiteOutModel] })
	declare items: VideoLiteOutModel[]
}
