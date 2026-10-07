import { z } from 'zod'
import { aiDialogueEmotions } from 'types/aiDialogueMessage'
import { Flux3ImageInput } from 'infrastructure/fluxImageGeneration/flux3Image.adapter'
import { AI_DIALOGUE_EMOTION_LAYOUT_VERSION } from '../aiDialogueVisualConfig'

const common = {
	model: z.literal('flux-3-image'),
	stylePrompt: z.string().min(1),
	resolution: z.literal('768sq'),
	grounding: z.literal(false),
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
	if (type === 'emotionSheet') return emotionSchema.parse(data)
	if (type === 'scene') {
		const parsed = sceneSchema.parse(data)
		if (parsed.participantNpcIds.length !== parsed.participantCharacterIds.length) {
			throw new Error('Scene participant IDs do not match')
		}
		return parsed
	}
	throw new Error(`Unsupported image generation type: ${type}`)
}

/** References must be ordered as style for a sprite; user, NPCs, then style for a scene. */
export function buildImageGenerationInput(snapshot: ImageGenerationSnapshot, images: string[]): Flux3ImageInput {
	const expectedReferences =
		'appearance' in snapshot
			? Number(Boolean(snapshot.styleAvatarReferenceS3Key))
			: 1 + snapshot.participantNpcIds.length + Number(Boolean(snapshot.styleSceneReferenceS3Key))
	if (images.length !== expectedReferences) throw new Error('Missing or extra image references')
	const prompt = 'appearance' in snapshot ? buildEmotionPrompt(snapshot) : buildScenePrompt(snapshot)

	return {
		prompt,
		aspectRatio: snapshot.aspectRatio,
		resolution: snapshot.resolution,
		grounding: snapshot.grounding,
		...(images.length ? { images } : {}),
	}
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
