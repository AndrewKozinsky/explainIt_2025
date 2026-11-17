import { getGeneratedDialogueImageJobId, getGeneratedDialogueImagesPrefix } from './generatedDialogueImageKey'

const filename = '00000000-0000-4000-8000-000000000001.jpg'

describe('generated dialogue image keys', () => {
	it.each(['servermaster', 'preview-2'])('round-trips image keys for %s', (mode) => {
		const prefix = getGeneratedDialogueImagesPrefix(mode)
		expect(prefix).toBe(`ai-dialogue-images-generated/${mode}/`)
		expect(getGeneratedDialogueImageJobId(`${prefix}job-10/${filename}`, prefix)).toBe(10)
	})

	it.each([
		'ai-dialogue-images/shared/user-avatar.jpg',
		`ai-dialogue-images/generated/intl/servermaster/job-10/${filename}`,
		`ai-dialogue-images/generated/job-10/${filename}`,
		`ai-dialogue-images-generated/servermaster/job-0/${filename}`,
		`ai-dialogue-images-generated/servermaster/job-9007199254740992/${filename}`,
	])('rejects unsafe key %s', (key) => {
		expect(getGeneratedDialogueImageJobId(key, getGeneratedDialogueImagesPrefix('servermaster'))).toBeNull()
	})
	it('rejects missing or path-like namespace settings', () => {
		expect(() => getGeneratedDialogueImagesPrefix(undefined)).toThrow()
		expect(() => getGeneratedDialogueImagesPrefix('../servermaster')).toThrow()
	})
})
