import { getGeneratedDialogueImageJobId, getGeneratedDialogueImagesPrefix } from './generatedDialogueImageKey'

describe('generated dialogue image keys', () => {
	it('uses independent region/mode namespaces and accepts legacy keys only as identified originals', () => {
		const prefix = getGeneratedDialogueImagesPrefix({ region: 'ru', mode: 'servermaster' })
		expect(prefix).toBe('ai-dialogue-images/generated/ru/servermaster/')
		const filename = '00000000-0000-4000-8000-000000000001.jpg'
		expect(getGeneratedDialogueImageJobId(`${prefix}job-10/${filename}`)).toBe(10)
		expect(getGeneratedDialogueImageJobId(`ai-dialogue-images/generated/job-10/${filename}`)).toBe(10)
	})

	it.each([
		'ai-dialogue-images/shared/user-avatar.jpg',
		'ai-dialogue-images/generated/job-0/file.png',
		'ai-dialogue-images/generated/job-9007199254740992/00000000-0000-4000-8000-000000000001.png',
	])('rejects unsafe key %s', (key) => {
		expect(getGeneratedDialogueImageJobId(key)).toBeNull()
	})
	it('rejects missing or path-like namespace settings', () => {
		expect(() => getGeneratedDialogueImagesPrefix({})).toThrow()
		expect(() => getGeneratedDialogueImagesPrefix({ region: '../', mode: 'servermaster' })).toThrow()
	})
})
