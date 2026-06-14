import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { BookChapterOutModel } from 'models/bookChapter/bookChapter.out.model'
import { UniversalPhraseOutModel } from 'models/universalPhrase/universalPhrase.out.model'
import { LanguageCode, Prisma } from 'prisma/generated/client'
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

		// Collect all unique phrase texts from SentencePhraseTranslations and
		// resolve their UniversalPhrase records in a single batch query.
		const universalPhraseByText = await this.buildUniversalPhraseMap(dbChapter, sourceLanguageCode)

		const sentences = dbChapter.Sentence.map((s) => ({
			id: s.id,
			startOffset: s.start_offset,
			length: s.length,
			sentenceTranslation: mapSentenceTranslation(s.SentenceTranslation, targetLanguageCode),
			sentencePhraseTranslations: mapSentencePhraseTranslations(
				s.SentencePhraseTranslation,
				targetLanguageCode,
				universalPhraseByText,
			),
		}))

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
