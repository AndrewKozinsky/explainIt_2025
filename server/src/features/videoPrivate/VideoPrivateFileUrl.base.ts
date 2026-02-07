import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

type FileDestinationType = 'privateVideo' | 'publicVideo'

export class VideoPrivateFileUrlBase {
	constructor(protected mainConfig: MainConfigService) {}

	protected async prepareFileKeyAndUploadUrl(
		params: {
			fileName: string
			fileMimeType: string
			fileDestinationType: FileDestinationType
		},
		cloudRuS3Service: CloudRuS3Service,
	) {
		const s3FileKey = this.createVideoFileUrl({
			fileName: params.fileName,
			fileDestinationType: params.fileDestinationType,
		})
		const uploadUrl = await cloudRuS3Service.createUploadUrl(s3FileKey, params.fileMimeType)

		return { s3FileKey, uploadUrl }
	}

	protected createVideoFileUrl(input: { fileName: string; fileDestinationType: FileDestinationType }) {
		let folderName = input.fileDestinationType

		const isDevMode = ['localtest', 'localdev'].includes(this.mainConfig.get().mode!)
		if (isDevMode) folderName += 'Dev'

		return `${folderName}/${crypto.randomUUID()}-${input.fileName}`
	}
}
