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
		sentence: string
		phrase: string
		phraseTranslation: string
		phraseAnalysis: string
	}) {
		const newBookChapterPhrase = await this.prisma.bookChapterPhrase.create({
			data: {
				book_chapter_id: dto.bookChapterId,
				sentence: dto.sentence,
				phrase: dto.phrase,
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

	mapDbPhraseToServicePhrase(dbBookChapter: PhraseWithPhraseExamples): BookChapterPhraseServiceModel {
		return {
			id: dbBookChapter.id,
			sentence: dbBookChapter.sentence,
			phrase: dbBookChapter.phrase,
			phraseTranslation: dbBookChapter.phraseTranslation,
			phraseAnalysis: dbBookChapter.phraseAnalysis,
			examples: dbBookChapter.BookChapterPhraseExample.map((example) => ({
				id: example.id,
				sentence: example.sentence,
				translate: example.translate,
			})),
		}
	}
}
