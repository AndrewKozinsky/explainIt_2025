import { AI_DIALOGUE_EMOTION_LAYOUT_VERSION } from '../aiDialogueVisualConfig'
import { buildImageGenerationInput, parseImageGenerationSnapshot } from './buildImageGenerationPrompt'

const common = {
	model: 'gpt-image-2',
	stylePrompt: 'Saved style',
	size: { width: 960, height: 720 },
	quality: 'low',
	format: 'png',
	styleAvatarReferenceS3Key: null,
	styleSceneReferenceS3Key: null,
}

describe('image generation prompts', () => {
	it('rejects inconsistent saved geometry before submitting a paid request', () => {
		expect(() =>
			parseImageGenerationSnapshot(
				'emotionSheet',
				JSON.stringify({
					...common,
					appearance: 'NPC',
					aspectRatio: '4:3',
					layoutVersion: AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
					size: { width: 1152, height: 576 },
				}),
			),
		).toThrow('4x3')
	})

	it('requires all twelve emotions in their row-major positions and prioritizes readable close-ups', () => {
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
		expect(prompt).toContain('4 columns and 3 rows of equal square cells.')
		expect(prompt).toContain('Top row: neutral | happy | sad | angry')
		expect(prompt).toContain('Middle row: surprised | confused | worried | embarrassed')
		expect(prompt).toContain('Bottom row: thoughtful | skeptical | relieved | encouraging')
		expect(prompt).toContain('Show each expression exactly once in its assigned cell.')
		expect(prompt).toContain('Close-up, front-facing facial portraits.')
		expect(prompt).toContain('Leave at least 5% of the cell width as free background')
		expect(prompt).toContain('Do not crop the head, face, hair, or ears.')
		expect(prompt).toContain('Make each expression distinct and immediately readable at small avatar sizes.')
		expect(prompt).toContain('Saved style')
		expect(prompt).toContain('Adult wearing a green coat')
	})

	it('describes the saved scene and maps reference positions to the saved participants', () => {
		const snapshot = parseImageGenerationSnapshot(
			'scene',
			JSON.stringify({
				...common,
				visualDescription: 'Dentist greets learner',
				size: { width: 1152, height: 576 },
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
		expect(input.model).toBe(common.model)
		expect(input.size).toEqual({ width: 1152, height: 576 })
		expect(input.quality).toBe('low')
		expect(input.format).toBe('png')
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
