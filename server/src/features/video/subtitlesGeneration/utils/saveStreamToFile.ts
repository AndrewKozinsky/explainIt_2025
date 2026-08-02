import { createWriteStream } from 'fs'
import { Readable } from 'stream'
import { pipeline } from 'stream/promises'

/**
 * Save a readable stream to a file path.
 */
export async function saveStreamToFile(stream: Readable, destPath: string): Promise<void> {
	await pipeline(stream, createWriteStream(destPath))
}
