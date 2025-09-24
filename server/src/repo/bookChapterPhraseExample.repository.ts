import { Injectable } from '@nestjs/common'
import { BookChapterPhraseExample } from '@prisma/client'
import { BookChapterPhraseExampleServiceModel } from 'src/models/bookChapterPhraseExample/bookChapterPhraseExample.service.model'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class BookChapterPhraseExampleRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createPhraseExample(dto: { bookChapterPhraseId: number; sentence: string; translate: string }) {
		const newPhraseExample = await this.prisma.bookChapterPhraseExample.create({
			data: {
				book_chapter_phrase_id: dto.bookChapterPhraseId,
				sentence: dto.sentence,
				translate: dto.translate,
			},
		})

		return this.mapDbPhraseToServicePhrase(newPhraseExample)
	}

	mapDbPhraseToServicePhrase(dbPhraseExample: BookChapterPhraseExample): BookChapterPhraseExampleServiceModel {
		return {
			id: dbPhraseExample.id,
			sentence: dbPhraseExample.sentence,
			translate: dbPhraseExample.translate,
		}
	}
}
