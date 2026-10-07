import type { ImageGenerationJob } from 'prisma/generated/client'
import type { ImageGenerationSnapshot } from './buildImageGenerationPrompt'

/** Worker-side reference preparation and durable image publication. */
export abstract class ImageGenerationAssets {
	/** null means dependencies are not ready. Scene references: user, neutral NPC cells, optional style. */
	abstract prepareReferences(job: ImageGenerationJob, snapshot: ImageGenerationSnapshot): Promise<string[] | null>

	/** Validate bytes, upload to R2, then atomically create AiDialogueImage and mark the existing job ready.
	 * Must recheck the owner and avoid recreating a deleted job. */
	abstract publish(job: ImageGenerationJob, result: { bytes: Buffer; contentType: string | null }): Promise<void>
}
