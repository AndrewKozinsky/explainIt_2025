import { z } from 'zod'
import { aiDialogueEmotions } from 'types/aiDialogueMessage'
import {
	ImageGenerationInput,
	ImageGenerationReference,
} from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import { OPENAI_IMAGE_MODELS } from 'infrastructure/imageGenerationProviderAdapter/OpenAIImageGenerationProvider'
import { AI_DIALOGUE_EMOTION_LAYOUT_VERSION } from '../aiDialogueVisualConfig'

const common = {
	model: z.enum(OPENAI_IMAGE_MODELS),
	stylePrompt: z.string().min(1),
	size: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }).strict(),
	quality: z.enum(['low', 'medium', 'high']),
	format: z.enum(['png', 'jpeg', 'webp']),
	// Consumer checkpoint metadata added atomically during claim, never changes generation parameters.
	resultS3Key: z.string().min(1).optional(),
	styleAvatarReferenceS3Key: z.string().nullable(),
	styleSceneReferenceS3Key: z.string().nullable(),
}
const emotionSchema = z.object({
	...common,
	appearance: z.string().min(1),
	layoutVersion: z.literal(AI_DIALOGUE_EMOTION_LAYOUT_VERSION),
	aspectRatio: z.literal('4:3'),
})
const sceneSchema = z.object({
	...common,
	visualDescription: z.string().min(1),
	aspectRatio: z.literal('2:1'),
	dialogueId: z.number().int().positive(),
	participantNpcIds: z.array(z.string()),
	participantCharacterIds: z.array(z.number().int().positive()),
	userAvatarS3Key: z.string().min(1),
})

export type ImageGenerationSnapshot = z.infer<typeof emotionSchema> | z.infer<typeof sceneSchema>

export function parseImageGenerationSnapshot(type: string, input: string): ImageGenerationSnapshot {
	const data: unknown = JSON.parse(input)

	if (type === 'emotionSheet') {
		const parsed = emotionSchema.parse(data)
		if (parsed.size.width * 3 !== parsed.size.height * 4 || parsed.size.width % 4 || parsed.size.height % 3)
			throw new Error('Emotion sheet requires an exact 4x3 grid of square cells')
		return parsed
	}

	if (type === 'scene') {
		const parsed = sceneSchema.parse(data)
		if (parsed.size.width !== parsed.size.height * 2) throw new Error('Scene requires a 2:1 pixel size')
		if (parsed.participantNpcIds.length !== parsed.participantCharacterIds.length) {
			throw new Error('Scene participant IDs do not match')
		}
		return parsed
	}
	throw new Error(`Unsupported image generation type: ${type}`)
}

/** References must be ordered as style for a sprite; user, NPCs, then style for a scene. */
export function buildImageGenerationInput(snapshot: ImageGenerationSnapshot, images: string[]): ImageGenerationInput {
	const expectedReferences =
		'appearance' in snapshot
			? Number(Boolean(snapshot.styleAvatarReferenceS3Key))
			: 1 + snapshot.participantNpcIds.length + Number(Boolean(snapshot.styleSceneReferenceS3Key))
	if (images.length !== expectedReferences) throw new Error('Missing or extra image references')

	const prompt = 'appearance' in snapshot ? buildEmotionPrompt(snapshot) : buildScenePrompt(snapshot)
	const references = images.map((image, index) => referenceFromDataUri(image, referencePurpose(snapshot, index)))

	return {
		model: snapshot.model,
		prompt,
		size: snapshot.size,
		quality: snapshot.quality,
		format: snapshot.format,
		...(references.length ? { references } : {}),
	}
}

/** Adapt the existing validated R2 data URIs to the neutral byte contract without transcoding. */
function referenceFromDataUri(image: string, purpose: string): ImageGenerationReference {
	const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(image)
	if (!match) throw new Error('Invalid prepared image reference')

	return { bytes: Buffer.from(match[2], 'base64'), mimeType: match[1], purpose }
}

function referencePurpose(snapshot: ImageGenerationSnapshot, index: number): string {
	if ('appearance' in snapshot) return 'Visual style only; do not copy the character'
	if (index === 0) return 'Learner identity and clothing'
	if (index <= snapshot.participantNpcIds.length)
		return `NPC ${snapshot.participantNpcIds[index - 1]} identity and clothing`

	return 'Visual style only; do not copy composition or characters'
}

function buildEmotionPrompt(input: z.infer<typeof emotionSchema>): string {
	const boxes = aiDialogueEmotions.map((emotion, index) => {
		const row = Math.floor(index / 4)
		const column = index % 4
		const rows = [0, 333, 667, 1000]
		return {
			id: `portrait_${emotion}`,
			bbox: [rows[row], column * 250, rows[row + 1], (column + 1) * 250],
			desc: `Head and shoulders of the same adult NPC, expression: ${emotion}. ${input.appearance}`,
		}
	})

	return [
		input.stylePrompt,
		input.styleAvatarReferenceS3Key
			? 'Use Image 1 only as the visual style reference; do not copy its character.'
			: '',
		`Create one emotion sprite sheet: 4 columns and 3 rows of square cells. Character: ${input.appearance}.`,
		'Same person, clothing, camera angle, lighting and plain background in every cell. Only facial expression changes.',
		'No text, labels, frames, gutters, margins or separators. Fill each cell with its portrait.',
		JSON.stringify(boxes),
	]
		.filter(Boolean)
		.join('\n')
}

function buildScenePrompt(input: z.infer<typeof sceneSchema>): string {
	const participants = input.participantNpcIds.map((npcId, index) => `Image ${index + 2} is NPC ${npcId}.`)
	const styleIndex = input.participantNpcIds.length + 2
	return [
		input.stylePrompt,
		`Illustrate this exact scene: ${input.visualDescription}`,
		'Image 1 is the learner. Include the learner in the scene and preserve the identity and clothing of all participants.',
		...participants,
		input.styleSceneReferenceS3Key
			? `Image ${styleIndex} supplies visual style only; do not copy its composition or characters.`
			: '',
		'Compose one wide scene, with no text, UI or watermarks.',
	]
		.filter(Boolean)
		.join('\n')
}
