import { MainConfigService } from 'src/infrastructure/mainConfig/mainConfig.service'
import { YandexCloudS3Service } from 'src/infrastructure/yandexCloudS3/yandexCloudS3.service'

export class VideoPrivateFileUrlBase {
	constructor(protected mainConfig: MainConfigService) {}

	protected async prepareFileUrlAndUploadUrl(
		params: {
			fileName?: null | string
			fileMimeType?: null | string
		},
		yandexCloudS3Service: YandexCloudS3Service,
	) {
		let fileUrl: null | string = null
		let uploadUrl: null | string = null

		if (params.fileName && params.fileMimeType) {
			fileUrl = this.createVideoFileUrl(params.fileName)
			uploadUrl = await yandexCloudS3Service.createUploadUrl(fileUrl, params.fileMimeType)
		}

		return { fileUrl, uploadUrl }
	}

	protected createVideoFileUrl(fileName: string) {
		const isDevMode = ['localtest', 'localdev'].includes(this.mainConfig.get().mode!)
		const rootFolderName = isDevMode ? 'videoDev' : 'video'
		return `${rootFolderName}/${crypto.randomUUID()}-${fileName}`
	}
}
