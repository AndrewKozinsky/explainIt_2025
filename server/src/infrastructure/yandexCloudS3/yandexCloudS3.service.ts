import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'

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

	async deleteFile(fileUrl: string): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.mainConfig.get().yandexCloud.s3.bucketName,
			Key: fileUrl,
		})

		await this.s3.send(command)
	}
}

export interface YandexCloudS3ServiceI {
	createUploadUrl(fileName: string, mimeType: string): Promise<string>
	deleteFile(fileUrl: string): Promise<void>
}

@Injectable()
export class YandexCloudS3ServiceMock implements YandexCloudS3ServiceI {
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
	 *
	 * In production, the frontend uploads directly to S3 using a presigned HTTPS URL.
	 * In e2e tests, we don't want real S3, so we "upload" by saving the bytes into this in-memory map.
	 *
	 * The mock URL encodes the target object key:
	 * `mock-s3://<urlencoded-key>?contentType=<urlencoded-mime>`
	 *
	 * Example:
	 * `mock-s3://videoDev%2F1234-video.mp4?contentType=video%2Fmp4`
	 *
	 * @param uploadUrl URL returned from `createUploadUrl()`.
	 * @param body File bytes to store.
	 * @param contentType Optional override for content type. If omitted, it is taken from the URL query.
	 * @returns The decoded object key (S3 key) that was used to store the file.
	 */
	uploadByUrl(uploadUrl: string, body: Buffer, contentType?: string) {
		// The e2e tests receive `uploadUrl` from `createUploadUrl()` above.
		// In production it would be a presigned HTTPS URL, but in tests we use a special
		// `mock-s3://` URL that encodes the object key and (optionally) content type.
		const parsed = new URL(uploadUrl)

		// Safety check: this helper only supports our mock protocol.
		// If some code accidentally passes a real presigned URL, we fail fast.
		if (parsed.protocol !== 'mock-s3:') {
			throw new Error(`Unsupported upload url protocol: ${parsed.protocol}`)
		}

		// Build the storage key (S3 object key) back from the URL.
		// For a URL like `mock-s3://videoDev%2Fabc.mp4?contentType=video%2Fmp4`:
		// - `parsed.hostname + parsed.pathname` yields `videoDev%2Fabc.mp4`
		// - decodeURIComponent(...) turns it into `videoDev/abc.mp4`
		// - we strip a leading `/` (in case pathname includes it) to keep the key normalized.
		const key = decodeURIComponent(parsed.hostname + parsed.pathname).replace(/^\//, '')

		// Determine the content type for stored object:
		// - prefer explicit `contentType` arg (when the test wants to override it)
		// - otherwise read it from the URL query param (set by `createUploadUrl()`)
		// - decode it because it was URL-encoded when generated.
		const contType = contentType ?? decodeURIComponent(parsed.searchParams.get('contentType') ?? '')

		// Save bytes into the in-memory "bucket".
		// This simulates successful upload to S3 so tests can assert the file was saved.
		this.objects.set(key, { body, contentType: contType })

		// Return the storage key so tests can easily reference the stored object.
		return key
	}

	hasObject(key: string) {
		return this.objects.has(key)
	}

	getObject(key: string) {
		return this.objects.get(key)
	}
}
