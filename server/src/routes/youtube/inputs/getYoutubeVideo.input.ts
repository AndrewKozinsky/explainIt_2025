import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class GetYoutubeVideoInput {
	@DtoFieldDecorators('videoId', bdConfig.Video.dbFields.youtube_video_id, { required: true })
	videoId: string
}
