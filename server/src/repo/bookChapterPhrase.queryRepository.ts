import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import CatchDbError from 'src/infrastructure/exceptions/CatchDBErrors'
import { BookChapterPhraseOutModel } from 'src/models/bookChapterPhrase/bookChapterPhrase.out.model'
import { PrismaService } from '../db/prisma.service'

type PhraseWithPhraseExamples = Prisma.BookChapterPhraseGetPayload<{ include: { BookChapterPhraseExample: true } }>

@Injectable()
export class BookChapterPhraseQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getPhraseById(phraseId: number) {
		const phrase = await this.prisma.bookChapterPhrase.findUnique({
			where: { id: phraseId },
			include: {
				BookChapterPhraseExample: {
					orderBy: {
						created_at: 'asc',
					},
				},
			},
		})

		if (!phrase) {
			return null
		}

		return this.mapDbPhraseToOutPhrase(phrase)
	}

	mapDbPhraseToOutPhrase(dbPhraseChapter: PhraseWithPhraseExamples): BookChapterPhraseOutModel {
		return {
			id: dbPhraseChapter.id,
			sentenceId: dbPhraseChapter.sentenceId,
			sentence: dbPhraseChapter.sentence,
			phrase: dbPhraseChapter.phrase,
			phraseWordsIdx: dbPhraseChapter.phraseWordsIdx,
			translation: dbPhraseChapter.phraseTranslation,
			analysis: dbPhraseChapter.phraseAnalysis,
			examples: dbPhraseChapter.BookChapterPhraseExample.map((example) => ({
				id: example.id,
				sentence: example.sentence,
				translation: example.translation,
			})),
		}
	}
}
