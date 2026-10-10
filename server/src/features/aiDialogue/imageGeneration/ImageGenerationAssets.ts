import type { ImageGenerationJob } from 'prisma/generated/client'
import type { ImageGenerationSnapshot } from './buildImageGenerationPrompt'

/** Worker-side reference preparation and durable image publication. */
export abstract class ImageGenerationAssets {
	/** Create a unique consumer-owned output key before the paid call; no upload occurs here. */
	abstract createResultKey(job: ImageGenerationJob, snapshot: ImageGenerationSnapshot): string

	/** Recover an uploaded original and finish DB publication, without calling the image provider.
	 * false means an authoritative missing object, not a permission to regenerate. */
	abstract publishStoredResult(job: ImageGenerationJob): Promise<boolean>
	/** null means dependencies are not ready. Scene references: user, neutral NPC cells, optional style. */
	abstract prepareReferences(job: ImageGenerationJob, snapshot: ImageGenerationSnapshot): Promise<string[] | null>

	/** Validate bytes, upload to R2, then atomically create AiDialogueImage and mark the existing job ready.
	 * Must recheck the owner and avoid recreating a deleted job. */
	abstract publish(job: ImageGenerationJob, result: { bytes: Buffer; contentType: string | null }): Promise<void>
}
