import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

@Injectable()
export class YandexCloudS3Service {
	public readonly s3: S3Client

	constructor(private mainConfig: MainConfigService) {
		this.s3 = new S3Client({
			region: 'ru-central1',
			credentials: {
				accessKeyId: mainConfig.get().yandexCloud.s3.keyId,
				secretAccessKey: mainConfig.get().yandexCloud.s3.secretKey,
			},
		})
	}

	/**
	 * Generates a temporary, one-time upload permission to S3.
	 * A browser can use this URL to upload a file to S3.
	 * @param fileUrl — file name
	 * @param mimeType — mime type
	 */
	async createUploadUrl(fileUrl: string, mimeType: string) {
		const command = new PutObjectCommand({
			Bucket: this.mainConfig.get().yandexCloud.s3.bucketName,
			Key: fileUrl,
			ContentType: mimeType,
		})

		return getSignedUrl(this.s3, command, {
			expiresIn: 60 * 5, // 5 minutes
		})
	}
}

export interface YandexCloudS3ServiceI {
	createUploadUrl(fileName: string, mimeType: string): Promise<string>
}

@Injectable()
export class YandexCloudS3ServiceMock implements YandexCloudS3ServiceI {
	constructor() {}

	async createUploadUrl(fileName: string, mimeType: string): Promise<any> {
		return 'file'
	}
}
