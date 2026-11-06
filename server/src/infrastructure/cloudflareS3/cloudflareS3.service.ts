import { Readable } from 'node:stream'
import {
	DeleteObjectCommand,
	GetObjectCommand,
	ListObjectsV2Command,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'

/** Окно, внутри которого getFileUrl возвращает одну и ту же ссылку на файл. */
export const signedFileUrlWindowSeconds = 6 * 60 * 60

/**
 * Окно подписи, в которое попадает момент now: подпись ставится на начало окна и действует два окна.
 * @param windowSeconds Длина окна в секундах.
 * @param now Момент запроса в миллисекундах.
 */
export function getSignedFileUrlWindow(windowSeconds = signedFileUrlWindowSeconds, now = Date.now()) {
	const windowMs = windowSeconds * 1000
	const signingDate = new Date(Math.floor(now / windowMs) * windowMs)
	const expiresInSeconds = windowSeconds * 2

	return { signingDate, expiresInSeconds, expiresAt: new Date(signingDate.getTime() + expiresInSeconds * 1000) }
}

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

	/**
	 * Подписывает GET-ссылку на файл. Внутри окна signedFileUrlWindowSeconds ссылка одинаковая,
	 * поэтому повторный ответ API не заставляет браузер скачивать тот же файл заново.
	 * От любого момента ссылка действует не меньше одного окна (6 часов).
	 */
	async getFileUrl(key: string) {
		const { url } = await this.getCacheableFileUrl(key, signedFileUrlWindowSeconds)
		return url
	}

	/**
	 * Подписывает GET-ссылку, одинаковую для всех запросов внутри окна windowSeconds, чтобы браузер
	 * мог переиспользовать скачанный файл. Время подписи округляется вниз до начала окна, ссылка живёт
	 * два окна (не меньше одного окна от любого момента), а ответ R2 получает Cache-Control на тот же срок.
	 * Замена файла становится видна не позже, чем начнётся следующее окно.
	 * @param key Ключ объекта в R2.
	 * @param windowSeconds Длина окна, в течение которого ссылка не меняется.
	 * @returns Подписанная ссылка и момент окончания её действия.
	 */
	async getCacheableFileUrl(key: string, windowSeconds: number): Promise<{ url: string; expiresAt: Date }> {
		const { signingDate, expiresInSeconds, expiresAt } = getSignedFileUrlWindow(windowSeconds)

		const url = await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
				Key: key,
				ResponseCacheControl: `private, max-age=${expiresInSeconds}`,
			}),
			{ signingDate, expiresIn: expiresInSeconds },
		)

		return { url, expiresAt }
	}

	async uploadFile(fileKey: string, body: Buffer, contentType: string, timeoutMs?: number): Promise<void> {
		const command = new PutObjectCommand({
			Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
			Key: fileKey,
			Body: body,
			ContentType: contentType,
		})

		await this.s3.send(command, timeoutMs ? { abortSignal: AbortSignal.timeout(timeoutMs) } : {})
	}

	/** Reads a bounded original object for image validation and in-memory reference preparation. */
	async readFile(fileKey: string): Promise<Buffer> {
		const response = await this.s3.send(
			new GetObjectCommand({
				Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
				Key: fileKey,
			}),
			{ abortSignal: AbortSignal.timeout(60_000) },
		)

		const limit = 32 * 1024 * 1024
		if (!response.Body || (response.ContentLength ?? 0) > limit) {
			if (response.Body instanceof Readable) response.Body.destroy()
			throw new Error('R2 image missing or too large')
		}
		const chunks: Buffer[] = []
		let size = 0

		for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
			size += chunk.length
			if (size > limit) throw new Error('R2 image is too large')
			chunks.push(Buffer.from(chunk))
		}

		return Buffer.concat(chunks)
	}

	/** Читает ограниченную страницу ключей и времени изменения; не загружает содержимое объектов. */
	async listFilesByPrefix(prefix: string, continuationToken?: string, maxKeys = 25) {
		return this.s3.send(
			new ListObjectsV2Command({
				Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
				Prefix: prefix,
				ContinuationToken: continuationToken,
				MaxKeys: maxKeys,
			}),
			{ abortSignal: AbortSignal.timeout(10_000) },
		)
	}

	/** Удаляет объект по ключу; необязательный timeoutMs ограничивает ожидание фоновой очистки. */
	async deleteFile(fileKey: string, timeoutMs?: number): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.mainConfig.get().cloudflareR2.s3.bucketName,
			Key: fileKey,
		})

		await this.s3.send(command, timeoutMs ? { abortSignal: AbortSignal.timeout(timeoutMs) } : {})
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
