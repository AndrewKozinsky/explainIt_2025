import { Injectable } from '@nestjs/common'
import { BookChapterPhraseServiceModel } from 'models/bookChapterPhrase/bookChapterPhrase.service.model'
import { Prisma } from 'prisma/generated/client'
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
		transcription: string
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
				phraseTranscription: dto.transcription,
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

	mapDbPhraseToServicePhrase(dbPhrase: PhraseWithPhraseExamples): BookChapterPhraseServiceModel {
		return {
			id: dbPhrase.id,
			sentenceId: dbPhrase.sentenceId,
			sentence: dbPhrase.sentence,
			phrase: dbPhrase.phrase,
			transcription: dbPhrase.phraseTranscription,
			phraseWordsIdx: dbPhrase.phraseWordsIdx,
			phraseTranslation: dbPhrase.phraseTranslation,
			phraseAnalysis: dbPhrase.phraseAnalysis,
			examples: dbPhrase.BookChapterPhraseExample.map((example) => ({
				id: example.id,
				sentence: example.sentence,
				translation: example.translation,
			})),
		}
	}
}
