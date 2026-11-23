jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/swagger', () => ({ ApiProperty: () => () => undefined }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))

import { UniversalPhraseTranslationQueryRepository } from './universalPhraseTranslation.queryRepository'

describe('UniversalPhraseTranslationQueryRepository', () => {
	it.each([
		{ text: 'best', language: 'en', lemmas: null, forms: ['good/well', 'better', 'best'] },
		{ text: 'best', language: 'en', lemmas: '[]', forms: ['good/well', 'better', 'best'] },
		{ text: 'best', language: 'en', lemmas: '["best"]', forms: ['good/well', 'better', 'best'] },
		{ text: 'schöner', language: 'de', lemmas: '["schön"]', forms: ['schön', 'schöner', 'am schönsten'] },
		{ text: 'schöner', language: 'de', lemmas: null, forms: ['schön', 'schöner', 'am schönsten'] },
	])(
		'returns the comparison for a saved $text article with lemmas $lemmas',
		async ({ text, language, lemmas, forms }) => {
			const article = [{ type: 'text', text: 'Описание слова' }]
			const findUnique = jest.fn().mockResolvedValue({
				id: 23,
				universal_phrase_id: 14,
				universal_phrase: { source_language_code: language, text, UniversalTranscription: null },
				target_language_code: 'ru',
				translation: JSON.stringify(article),
				deep_sections: null,
				lemmas,
				status: 'ready',
				error_code: null,
				non_existent_word: false,
				created_at: new Date('2026-01-01T00:00:00Z'),
			})
			const repository = new UniversalPhraseTranslationQueryRepository(
				{ universalPhraseTranslation: { findUnique } } as never,
				{} as never,
			)

			await expect(repository.getById(23)).resolves.toMatchObject({
				translation: article,
				wordForms: [{ kind: 'comparison', forms }],
			})
		},
	)
})
