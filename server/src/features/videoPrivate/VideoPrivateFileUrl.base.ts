import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { YandexCloudS3Service } from 'infrastructure/yandexCloudS3/yandexCloudS3.service'

export class VideoPrivateFileUrlBase {
	constructor(protected mainConfig: MainConfigService) {}

	protected async prepareFileKeyAndUploadUrl(
		params: {
			fileName?: null | string
			fileMimeType?: null | string
		},
		yandexCloudS3Service: YandexCloudS3Service,
	) {
		let s3FileKey: null | string = null
		let uploadUrl: null | string = null

		if (params.fileName && params.fileMimeType) {
			s3FileKey = this.createVideoFileUrl(params.fileName)
			uploadUrl = await yandexCloudS3Service.createUploadUrl(s3FileKey, params.fileMimeType)
		}

		return { s3FileKey, uploadUrl }
	}

	protected createVideoFileUrl(fileName: string) {
		const isDevMode = ['localtest', 'localdev'].includes(this.mainConfig.get().mode!)
		const rootFolderName = isDevMode ? 'videoDev' : 'video'
		return `${rootFolderName}/${crypto.randomUUID()}-${fileName}`
	}
}
