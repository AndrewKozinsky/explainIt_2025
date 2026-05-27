import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookChapterOutModel } from '../models/bookChapter/bookChapter.out.model'
import { GrammarConceptQueryRepository } from './grammarConcept.queryRepository'

type FullBookChapter = Prisma.BookChapterGetPayload<{
	include: {
		book: true
		book_public: true
		Sentence: true
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
				},
			},
		})

		if (!bookChapter) {
			return null
		}

		return this.mapDbBookChapterToOutBookChapter(bookChapter as FullBookChapterPrivate, targetLanguageCode)
	}

	/*@CatchDbError()
	async getBookChapters(bookId: number) {
		const bookChapters = await this.prisma.bookChapter.findMany({
			where: { book_id: bookId },
			orderBy: { created_at: 'asc' },
			include: { book: true, BookChapterPhrase: { include: { BookChapterPhraseExample: true } } },
		})

		return bookChapters.map((ch) => this.mapDbBookChapterToOutBookChapter(ch as FullBookChapterPrivate))
	}*/

	async mapDbBookChapterToOutBookChapter(
		dbChapter: FullBookChapterPrivate,
		targetLanguageCode?: string,
	): Promise<BookChapterOutModel> {
		const book = dbChapter.book_public ? dbChapter.book_public : dbChapter.book
		const sourceLanguageCode = book.source_language_code
		const content = dbChapter.processed_content ?? ''

		const sentences = await Promise.all(
			dbChapter.Sentence.map(async (s) => {
				const sentenceText = content.slice(
					Math.max(0, s.start_offset),
					Math.min(content.length, s.start_offset + Math.max(0, s.length)),
				)
				let grammarConcepts = null
				let missingGrammarConcepts = null

				if (targetLanguageCode) {
					const us = await this.prisma.universalSentence.findUnique({
						where: {
							sentence_text_source_language_code: {
								sentence_text: sentenceText.trim().replace(/\s+/g, ' '),
								source_language_code: sourceLanguageCode,
							},
						},
						include: {
							GrammarConceptToUniversalSentence: {
								include: { grammar_concept: true },
							},
							MissingGrammarConcept: {
								where: { target_language_code: targetLanguageCode as any },
								select: { category: true, lemma: true },
							},
						},
					}) as any

					if (us && us.status === 'SUCCESS') {
						grammarConcepts = us.GrammarConceptToUniversalSentence.filter(
							(j: any) => j.grammar_concept.target_language_code === targetLanguageCode,
						).map((j: any) => this.grammarConceptQueryRepo.mapDbToOutModel(j.grammar_concept))
						missingGrammarConcepts = us.MissingGrammarConcept.map((m: any) => ({
							category: m.category,
							lemma: m.lemma,
						}))
					}
				}

				return {
					id: s.id,
					startOffset: s.start_offset,
					length: s.length,
					grammarConcepts,
					missingGrammarConcepts,
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
}
