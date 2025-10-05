import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { BookChapterPhraseServiceModel } from 'src/models/bookChapterPhrase/bookChapterPhrase.service.model'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

type PhraseWithPhraseExamples = Prisma.BookChapterPhraseGetPayload<{ include: { BookChapterPhraseExample: true } }>

@Injectable()
export class BookChapterPhraseRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBookChapterPhrase(dto: {
		bookChapterId: number
		sentenceId: number
		sentence: string
		phrase: string
		phraseWordsIdx: number[]
		phraseTranslation: string
		phraseAnalysis: string
	}) {
		const newBookChapterPhrase = await this.prisma.bookChapterPhrase.create({
			data: {
				book_chapter_id: dto.bookChapterId,
				sentenceId: dto.sentenceId,
				sentence: dto.sentence,
				phrase: dto.phrase,
				phraseWordsIdx: dto.phraseWordsIdx,
				phraseTranslation: dto.phraseTranslation,
				phraseAnalysis: dto.phraseAnalysis,
			},
			include: {
				BookChapterPhraseExample: {
					orderBy: {
						created_at: 'asc',
					},
				},
			},
		})

		return this.mapDbPhraseToServicePhrase(newBookChapterPhrase)
	}

	@CatchDbError()
	async deleteBookChapterPhrases(bookChapterId: number) {
		await this.prisma.bookChapterPhrase.deleteMany({
			where: {
				book_chapter_id: bookChapterId,
			},
		})
	}

	mapDbPhraseToServicePhrase(dbBookChapter: PhraseWithPhraseExamples): BookChapterPhraseServiceModel {
		return {
			id: dbBookChapter.id,
			sentenceId: dbBookChapter.sentenceId,
			sentence: dbBookChapter.sentence,
			phrase: dbBookChapter.phrase,
			phraseWordsIdx: dbBookChapter.phraseWordsIdx,
			phraseTranslation: dbBookChapter.phraseTranslation,
			phraseAnalysis: dbBookChapter.phraseAnalysis,
			examples: dbBookChapter.BookChapterPhraseExample.map((example) => ({
				id: example.id,
				sentence: example.sentence,
				translation: example.translation,
			})),
		}
	}
}
