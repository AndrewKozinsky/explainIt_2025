import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { BookChapterOutModel } from 'models/bookChapter/bookChapter.out.model'
import { UniversalPhraseOutModel } from 'models/universalPhrase/universalPhrase.out.model'
import { LanguageCode, Prisma } from 'prisma/generated/client'
import { GrammarConceptQueryRepository } from '../grammarConcept.queryRepository'
import { UniversalPhraseQueryRepository } from '../universalPhrase.queryRepository'
import { mapSentencePhraseTranslations, mapSentenceTranslation } from './fn'

type FullBookChapter = Prisma.BookChapterGetPayload<{
	include: {
		book: true
		book_public: true
		Sentence: {
			include: {
				SentenceTranslation: true
				SentencePhraseTranslation: true
			}
		}
	}
}>

// Helper type for UniversalPhrase with transcription and audio pronunciation
type UniversalPhraseWithRelations = Prisma.UniversalPhraseGetPayload<{
	include: {
		UniversalTranscription: true
		UniversalAudioPronunciation: true
	}
}>
// Helper type: same as FullBookChapter but with non-nullable 'book' relation
type FullBookChapterPrivate = Omit<FullBookChapter, 'book'> & {
	book: NonNullable<FullBookChapter['book']>
	book_public: NonNullable<FullBookChapter['book_public']>
}

@Injectable()
export class BookChapterQueryRepository {
	constructor(
		private prisma: PrismaService,
		private grammarConceptQueryRepo: GrammarConceptQueryRepository,
		private universalPhraseQueryRepo: UniversalPhraseQueryRepository,
	) {}

	@CatchDbError()
	async getBookChapterById(id: number, targetLanguageCode?: string) {
		const bookChapter = await this.prisma.bookChapter.findUnique({
			where: { id },
			include: {
				book: true,
				book_public: true,
				Sentence: {
					orderBy: { order_index: 'asc' },
					include: {
						SentenceTranslation: true,
						SentencePhraseTranslation: true,
					},
				},
			},
		})

		if (!bookChapter) {
			return null
		}

		return this.mapDbBookChapterToOutBookChapter(bookChapter as FullBookChapterPrivate, targetLanguageCode)
	}

	async mapDbBookChapterToOutBookChapter(
		dbChapter: FullBookChapterPrivate,
		targetLanguageCode?: string,
	): Promise<BookChapterOutModel> {
		const book = dbChapter.book_public ? dbChapter.book_public : dbChapter.book
		const sourceLanguageCode = book.source_language_code
		const content = dbChapter.processed_content ?? ''

		// Collect all unique phrase texts from SentencePhraseTranslations and
		// resolve their UniversalPhrase records in a single batch query.
		const universalPhraseByText = await this.buildUniversalPhraseMap(dbChapter, sourceLanguageCode)

		const sentences = await Promise.all(
			dbChapter.Sentence.map(async (s) => {
				const sentenceText = content.slice(
					Math.max(0, s.start_offset),
					Math.min(content.length, s.start_offset + Math.max(0, s.length)),
				)
				let grammarConcepts = null
				let missingGrammarConcepts = null

				if (targetLanguageCode) {
					const universalPhrase = await this.prisma.universalPhrase.findUnique({
						where: {
							source_language_code_text: {
								text: sentenceText.trim().replace(/\s+/g, ' '),
								source_language_code: sourceLanguageCode,
							},
						},
						include: {
							GrammarConceptToUniversalPhrase: {
								include: { grammar_concept: true },
							},
							MissingGrammarConcept: {
								where: { target_language_code: targetLanguageCode as any },
								select: { category: true, alias: true },
							},
						},
					})

					if (universalPhrase && universalPhrase.grammarExtractionStatus === 'SUCCESS') {
						grammarConcepts = universalPhrase.GrammarConceptToUniversalPhrase.filter(
							(j: any) => j.grammar_concept.target_language_code === targetLanguageCode,
						).map((j: any) => this.grammarConceptQueryRepo.mapDbToOutModel(j.grammar_concept))
						missingGrammarConcepts = universalPhrase.MissingGrammarConcept.map((m: any) => ({
							category: m.category,
							alias: m.alias,
						}))
					}
				}

				return {
					id: s.id,
					startOffset: s.start_offset,
					length: s.length,
					grammarConcepts,
					missingGrammarConcepts,
					sentenceTranslation: mapSentenceTranslation(s.SentenceTranslation, targetLanguageCode),
					sentencePhraseTranslations: mapSentencePhraseTranslations(
						s.SentencePhraseTranslation,
						targetLanguageCode,
						universalPhraseByText,
					),
				}
			}),
		)

		return {
			id: dbChapter.id,
			name: dbChapter.name,
			header: dbChapter.header,
			originalContent: dbChapter.original_content,
			processedContent: dbChapter.processed_content,
			sentences,
			note: dbChapter.note,
			book: {
				id: book.id,
				name: book.name,
				languageCode: sourceLanguageCode,
				author: book.author,
				note: book.note,
				userId: dbChapter.book_public ? null : dbChapter.book.user_id,
			},
		}
	}

	private async buildUniversalPhraseMap(
		dbChapter: FullBookChapterPrivate,
		sourceLanguageCode: LanguageCode,
	): Promise<Map<string, UniversalPhraseOutModel>> {
		const phraseTexts = new Set<string>()
		for (const s of dbChapter.Sentence) {
			for (const pt of s.SentencePhraseTranslation) {
				if (pt.phrase) {
					phraseTexts.add(pt.phrase)
				}
			}
		}

		if (phraseTexts.size === 0) {
			return new Map()
		}

		const dbPhrases: UniversalPhraseWithRelations[] = await this.prisma.universalPhrase.findMany({
			where: {
				text: { in: [...phraseTexts] },
				source_language_code: sourceLanguageCode,
			},
			include: {
				UniversalTranscription: true,
				UniversalAudioPronunciation: true,
			},
		})

		const map = new Map<string, UniversalPhraseOutModel>()
		await Promise.all(
			dbPhrases.map(async (p) => {
				const out = await this.universalPhraseQueryRepo.mapDbUniversalPhraseToOutModel(p)
				map.set(p.text, out)
			}),
		)

		return map
	}
}
