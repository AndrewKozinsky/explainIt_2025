import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { GetPublicVideoCollectionCommand } from 'features/videoCollection/GetPublicVideoCollection.command'
import { GetVideoCollectionCommand } from 'features/videoCollection/GetVideoCollection.command'
import { VideoCollectionOutModel } from 'models/videoCollection/videoCollection.out.model'

@ApiTags('Video Collection')
@Controller('video-collection')
export class VideoCollectionController {
	constructor(private commandBus: CommandBus) {}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getVideoCollection(
		@Param('id', ParseIntPipe) id: number,
		@Req() request: Request,
	): Promise<VideoCollectionOutModel> {
		const userId = request.session?.userId

		// Try public collection first
		const publicCollection = await this.commandBus.execute(new GetPublicVideoCollectionCommand(id))
		if (publicCollection) {
			return publicCollection
		}

		// Fall back to private collection (requires auth)
		if (!userId) {
			throw new Error('Unauthorized')
		}

		return await this.commandBus.execute(new GetVideoCollectionCommand(userId, id))
	}
}
