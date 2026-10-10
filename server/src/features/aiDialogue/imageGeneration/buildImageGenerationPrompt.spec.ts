import { AI_DIALOGUE_EMOTION_LAYOUT_VERSION } from '../aiDialogueVisualConfig'
import { buildImageGenerationInput, parseImageGenerationSnapshot } from './buildImageGenerationPrompt'

const common = {
	model: 'flux-3-image',
	stylePrompt: 'Saved style',
	resolution: '768sq',
	grounding: false,
	styleAvatarReferenceS3Key: null,
	styleSceneReferenceS3Key: null,
}

describe('image generation prompts', () => {
	it('puts all twelve emotions in row-major boxes using top/left/bottom/right coordinates', () => {
		const snapshot = parseImageGenerationSnapshot(
			'emotionSheet',
			JSON.stringify({
				...common,
				appearance: 'Adult wearing a green coat',
				aspectRatio: '4:3',
				layoutVersion: AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
			}),
		)
		const { prompt } = buildImageGenerationInput(snapshot, [])
		const boxes = JSON.parse(prompt.split('\n').at(-1)!)
		expect(boxes).toHaveLength(12)
		expect(boxes[0]).toMatchObject({ id: 'portrait_neutral', bbox: [0, 0, 333, 250] })
		expect(boxes[4]).toMatchObject({ id: 'portrait_surprised', bbox: [333, 0, 667, 250] })
		expect(boxes[11]).toMatchObject({ id: 'portrait_encouraging', bbox: [667, 750, 1000, 1000] })
		expect(prompt).toContain('Saved style')
		expect(prompt).toContain('Adult wearing a green coat')
	})

	it('describes the saved scene and maps reference positions to the saved participants', () => {
		const snapshot = parseImageGenerationSnapshot(
			'scene',
			JSON.stringify({
				...common,
				visualDescription: 'Dentist greets learner',
				aspectRatio: '2:1',
				dialogueId: 1,
				participantNpcIds: ['dentist'],
				participantCharacterIds: [2],
				userAvatarS3Key: 'user.jpg',
				styleSceneReferenceS3Key: 'style.png',
			}),
		)
		const images = ['user', 'npc', 'style'].map(
			(value) => `data:image/png;base64,${Buffer.from(value).toString('base64')}`,
		)
		const input = buildImageGenerationInput(snapshot, images)
		expect(input.references?.map((ref) => ref.bytes.toString())).toEqual(['user', 'npc', 'style'])
		expect(input.references?.map((ref) => ref.mimeType)).toEqual(['image/png', 'image/png', 'image/png'])
		expect(input.references?.[1].purpose).toContain('dentist')
		expect(input.model).toBe('flux-3-image')
		expect(input.size).toEqual({ aspectRatio: '2:1', resolution: '768sq' })
		expect(input.prompt).toContain('Image 2 is NPC dentist')
		expect(input.prompt).toContain('Image 3 supplies visual style only')
		expect(input.prompt).toContain('Dentist greets learner')
	})

	it.each(['angleSheet', 'unknown'])('rejects unsupported type %s', (type) => {
		expect(() => parseImageGenerationSnapshot(type, '{}')).toThrow('Unsupported')
	})

	it('rejects a mismatched sprite layout instead of applying current coordinates', () => {
		expect(() =>
			parseImageGenerationSnapshot(
				'emotionSheet',
				JSON.stringify({ ...common, appearance: 'Adult', aspectRatio: '4:3', layoutVersion: 'other-layout' }),
			),
		).toThrow()
	})

	it('requires the configured style reference instead of silently generating from text alone', () => {
		const snapshot = parseImageGenerationSnapshot(
			'emotionSheet',
			JSON.stringify({
				...common,
				appearance: 'Adult',
				aspectRatio: '4:3',
				layoutVersion: AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
				styleAvatarReferenceS3Key: 'style.png',
			}),
		)
		expect(() => buildImageGenerationInput(snapshot, [])).toThrow('Missing or extra')
	})
})
