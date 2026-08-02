import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import { CreatePublicVideoCommand } from 'features/video/CreatePublicVideo.command'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { Prisma } from 'prisma/generated/client'
import { charadeVideoData } from './publicVideosSource/charade/charadeData'
import { hisGirlFridayVideoData } from './publicVideosSource/hisGirlFriday/hisGirlFridayData'

export class CreatePublicVideosCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreatePublicVideosCommand)
export class CreatePublicVideosHandler implements ICommandHandler<CreatePublicVideosCommand> {
	constructor(
		private commandBus: CommandBus,
		private prisma: PrismaService,
		private mainConfig: MainConfigService,
	) {}

	async execute() {
		const videosData = this.getVideosData()

		for (const data of videosData) {
			await this.createVideoOfNotExists(data)
		}
	}

	private async createVideoOfNotExists(
		data: ReturnType<CreatePublicVideosHandler['getVideosData']>[number],
	) {
		const existing = await this.prisma.video.findFirst({
			where: { file_s3_key: data.file_s3_key },
			select: { id: true },
		})
		if (existing) {
			return
		}

		try {
			await this.commandBus.execute(
				new CreatePublicVideoCommand({
					name: data.name,
					note: data.note,
					originalContent: data.originalContent,
					languageCode: data.languageCode as Language,
					fileName: data.fileName,
					fileS3Key: data.file_s3_key,
					coverFileName: data.coverFileName,
					coverFileS3Key: data.coverFileS3Key,
				}),
			)
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
				return
			}
			throw e
		}
	}

	getVideosData() {
		const workingMode = this.mainConfig.get().mode!
		const isDev = ['localdev', 'localtest', 'localcheckserver'].includes(workingMode)

		const s3FolderName = (isDev ? 'publicVideosDev' : 'publicVideos') + '/'
		const coverS3FolderName = (isDev ? 'publicVideoCoversDev' : 'publicVideoCovers') + '/'

		return [
			charadeVideoData(s3FolderName, coverS3FolderName),
			hisGirlFridayVideoData(s3FolderName, coverS3FolderName),
		]
	}
}
