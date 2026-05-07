import { createWriteStream } from 'fs'
import { Readable } from 'stream'
import { pipeline } from 'stream/promises'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

/**
 * Stream an object from S3 directly to a local file path.
 * Uses the S3 GetObject command body (a Node Readable) to avoid loading the whole
 * file into memory — important for multi-hundred-megabyte video assets.
 */
export async function downloadS3ObjectToFile(
	cloudRuS3Service: CloudRuS3Service,
	mainConfig: MainConfigService,
	key: string,
	destPath: string,
): Promise<void> {
	const response = await cloudRuS3Service.s3.send(
		new GetObjectCommand({
			Bucket: mainConfig.get().cloudRu.s3.bucketName,
			Key: key,
		}),
	)

	const body = response.Body
	if (!body) {
		throw new Error(`Empty body for S3 object ${key}`)
	}

	const readable = body as Readable
	await pipeline(readable, createWriteStream(destPath))
}
