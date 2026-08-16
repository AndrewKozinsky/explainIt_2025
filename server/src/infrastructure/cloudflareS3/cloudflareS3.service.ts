import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class CloudflareS3Service {
	public readonly s3: S3Client

	constructor(private mainConfig: MainConfigService) {
		const s3Config = mainConfig.get().cloudflareR2.s3

		this.s3 = new S3Client({
			endpoint: `https://${s3Config.accountId}.r2.cloudflarestorage.com`,
			region: 'auto',
			credentials: {
				accessKeyId: s3Config.accessKeyId,
				secretAccessKey: s3Config.secretAccessKey,
			},
			forcePathStyle: true, // Cloudflare R2 поддерживает path-style обращения
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
			Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
			Key: fileUrl,
			ContentType: mimeType,
		})

		return getSignedUrl(this.s3, command, {
			expiresIn: 60 * 5, // 5 minutes
		})
	}

	async getFileUrl(key: string) {
		return await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
				Key: key,
			}),
			{ expiresIn: 60 * 60 * 6 }, // 6 часов
		)
	}

	async uploadFile(fileKey: string, body: Buffer, contentType: string): Promise<void> {
		const command = new PutObjectCommand({
			Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
			Key: fileKey,
			Body: body,
			ContentType: contentType,
		})

		await this.s3.send(command)
	}

	async deleteFile(fileKey: string): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
			Key: fileKey,
		})

		await this.s3.send(command)
	}
}

export interface CloudflareS3ServiceI {
	createUploadUrl(fileName: string, mimeType: string): Promise<string>
	deleteFile(fileUrl: string): Promise<void>
}

@Injectable()
export class CloudflareS3ServiceMock implements CloudflareS3ServiceI {
	private objects = new Map<string, { body: Buffer; contentType: string }>()

	constructor() {}

	async createUploadUrl(fileUrl: string, mimeType: string): Promise<string> {
		return `mock-s3://${encodeURIComponent(fileUrl)}?contentType=${encodeURIComponent(mimeType)}`
	}

	async deleteFile(fileUrl: string): Promise<void> {
		this.objects.delete(fileUrl)
	}

	clear() {
		this.objects.clear()
	}

	/**
	 * Simulates a successful upload to S3 using a `mock-s3://` upload URL produced by `createUploadUrl()`.
	 * See `YandexCloudS3ServiceMock.uploadByUrl` for the full explanation — the mechanics are identical.
	 * @returns The decoded object key (S3 key) that was used to store the file.
	 */
	uploadByUrl(uploadUrl: string, body: Buffer, contentType?: string) {
		const parsed = new URL(uploadUrl)

		if (parsed.protocol !== 'mock-s3:') {
			throw new Error(`Unsupported upload url protocol: ${parsed.protocol}`)
		}

		const key = decodeURIComponent(parsed.hostname + parsed.pathname).replace(/^\//, '')
		const contType = contentType ?? decodeURIComponent(parsed.searchParams.get('contentType') ?? '')

		this.objects.set(key, { body, contentType: contType })

		return key
	}

	hasObject(key: string) {
		return this.objects.has(key)
	}

	getObject(key: string) {
		return this.objects.get(key)
	}
}
