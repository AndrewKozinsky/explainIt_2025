import {
	getAiDialogueIllustrationStyleCatalog,
	getAiDialogueIllustrationStyleKey,
	getAiDialogueIllustrationStylePreviewKey,
	getNewAiDialogueIllustrationStyle,
	getAiDialogueImageStyleSnapshot,
} from './aiDialogueIllustrationStyles'
import { aiDialogueIllustrationStyleCatalog } from './catalog'

describe('AI dialogue illustration style catalog', () => {
	it.each(['localdev', 'servermaster'])('captures the selected style and both reference roles for %s', (mode) => {
		for (const style of aiDialogueIllustrationStyleCatalog.styles) {
			expect(getAiDialogueImageStyleSnapshot(style.id, mode)).toEqual({
				illustrationStyleId: style.id,
				stylePrompt: style.stylePrompt,
				styleAvatarReferenceS3Key: `ai-dialogue-images/shared/styles/${mode}/${style.file}`,
				styleSceneReferenceS3Key: `ai-dialogue-images/shared/styles/${mode}/${style.file}`,
			})
		}
	})

	it('rejects an unknown saved style as a server invariant without choosing another style', () => {
		expect(() => getAiDialogueImageStyleSnapshot('missing', 'localdev')).toThrow(
			expect.objectContaining({ statusCode: 500 }),
		)
	})

	it('allows another style and a new default without a database enum or resolver changes', () => {
		const style = { ...aiDialogueIllustrationStyleCatalog.styles[0], id: 'new-style', file: 'new-style.webp' }
		const extended = { defaultStyleId: style.id, styles: [...aiDialogueIllustrationStyleCatalog.styles, style] }
		expect(getAiDialogueIllustrationStyleCatalog(extended)).toBe(extended)
	})

	it.each([undefined, null])('uses the catalog default for %s', (id) => {
		expect(getNewAiDialogueIllustrationStyle(id).id).toBe(aiDialogueIllustrationStyleCatalog.defaultStyleId)
	})

	it.each(['realism', 'drawing', 'watercolor'])('accepts the catalog ID %s', (id) => {
		expect(getNewAiDialogueIllustrationStyle(id).id).toBe(id)
	})

	it.each(['unknown', 'legacy', 'styles/realism.webp', '', 'Realism'])('rejects client selection %j', (id) => {
		expect(() => getNewAiDialogueIllustrationStyle(id)).toThrow(
			expect.objectContaining({
				statusCode: 400,
				errorMessage: { code: 'AI_DIALOGUE_ILLUSTRATION_STYLE_NOT_FOUND' },
			}),
		)
	})

	it.each(['localtest', 'localdev', 'localcheckserver', 'serverdevelop', 'servermaster'])(
		'uses the exact MODE %s',
		(mode) => {
			expect(getAiDialogueIllustrationStyleKey(mode, 'realism.webp')).toBe(
				`ai-dialogue-images/shared/styles/${mode}/realism.webp`,
			)
		},
	)

	it.each([
		{ file: 'realism.webp', previewKey: 'ai-dialogue-images/shared/styles/localdev/realism.preview.webp' },
		{ file: 'new-style.png', previewKey: 'ai-dialogue-images/shared/styles/localdev/new-style.preview.png' },
	])('places the light preview of $file next to the reference with the .preview postfix', ({ file, previewKey }) => {
		expect(getAiDialogueIllustrationStylePreviewKey('localdev', file)).toBe(previewKey)
	})

	it('validates MODE and file name for the preview key like for the reference', () => {
		expect(() => getAiDialogueIllustrationStylePreviewKey('localdev', '../realism.webp')).toThrow(
			expect.objectContaining({ statusCode: 500 }),
		)
	})

	it.each([
		{ mode: undefined, file: 'realism.webp' },
		{ mode: 'productionserver', file: 'realism.webp' },
		{ mode: '../localdev', file: 'realism.webp' },
		{ mode: 'localdev', file: '../realism.webp' },
		{ mode: 'localdev', file: 'https://example.com/realism.webp' },
	])('rejects invalid storage configuration %j', ({ mode, file }) => {
		expect(() => getAiDialogueIllustrationStyleKey(mode, file)).toThrow(
			expect.objectContaining({ statusCode: 500 }),
		)
	})

	it.each([
		{ defaultStyleId: 'missing', styles: aiDialogueIllustrationStyleCatalog.styles },
		{ defaultStyleId: 'realism', styles: [] },
		{
			defaultStyleId: 'realism',
			styles: [...aiDialogueIllustrationStyleCatalog.styles, aiDialogueIllustrationStyleCatalog.styles[0]],
		},
		{
			defaultStyleId: 'invalid style',
			styles: [{ ...aiDialogueIllustrationStyleCatalog.styles[0], id: 'invalid style' }],
		},
		{
			defaultStyleId: 'realism',
			styles: [{ ...aiDialogueIllustrationStyleCatalog.styles[0], file: '../photo.webp' }],
		},
		{ defaultStyleId: 'realism', styles: [{ ...aiDialogueIllustrationStyleCatalog.styles[0], stylePrompt: ' ' }] },
		{
			defaultStyleId: 'realism',
			styles: [{ ...aiDialogueIllustrationStyleCatalog.styles[0], titleKey: ' ' }],
		},
	])('rejects an invalid catalog', (catalog) => {
		expect(() => getAiDialogueIllustrationStyleCatalog(catalog)).toThrow(
			expect.objectContaining({ statusCode: 500 }),
		)
	})
})
